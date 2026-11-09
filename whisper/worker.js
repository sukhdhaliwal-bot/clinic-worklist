// Runs the Whisper speech model in the background so the page stays responsive.
// Everything is loaded from this app's own files: remote models are switched off.
import { pipeline, env } from "./lib/transformers.js";

env.allowRemoteModels = false;          // never contact Hugging Face or anywhere else
env.allowLocalModels = true;
env.localModelPath = "./models/"; // a path, not a full URL: transformers.js only checks local files for paths
env.useBrowserCache = false;            // the app's service worker keeps the files for offline use
env.backends.onnx.wasm.wasmPaths = new URL("./lib/", import.meta.url).href;
env.backends.onnx.wasm.numThreads = 1;  // GitHub Pages can't enable multi-threading
env.backends.onnx.wasm.proxy = false;

let asr = null, loadedId = null;

async function load(id) {
  if (asr && loadedId === id) return;
  asr = null;
  const t0 = performance.now();
  asr = await pipeline("automatic-speech-recognition", "onnx-community/" + id, {
    device: "wasm",
    dtype: "q8",
    progress_callback: (p) => {
      if (p.status === "progress" && p.total) postMessage({ type: "progress", file: p.file, pct: Math.round((p.loaded / p.total) * 100) });
    },
  });
  loadedId = id;
  postMessage({ type: "ready", id, ms: Math.round(performance.now() - t0) });
}

onmessage = async (e) => {
  const m = e.data;
  try {
    if (m.type === "load") await load(m.id);
    if (m.type === "transcribe") {
      const t0 = performance.now();
      const out = await asr(m.audio);
      postMessage({ type: "text", text: (out.text || "").trim(), ms: Math.round(performance.now() - t0) });
    }
  } catch (err) {
    postMessage({ type: "error", message: String((err && err.message) || err) });
  }
};
