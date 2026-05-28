import { FFmpeg } from "@ffmpeg/ffmpeg";

// FFmpegのコアファイルをCDNから動的にロード（バンドルサイズ削減のため）
const FFMPEG_CORE_CDN_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd/ffmpeg-core.js";
const FFMPEG_WASM_CDN_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd/ffmpeg-core.wasm";

export async function loadFFmpeg(): Promise<FFmpeg> {
  const ffmpeg = new FFmpeg();

  await ffmpeg.load({
    coreURL: FFMPEG_CORE_CDN_URL,
    wasmURL: FFMPEG_WASM_CDN_URL,
  });

  return ffmpeg;
}
