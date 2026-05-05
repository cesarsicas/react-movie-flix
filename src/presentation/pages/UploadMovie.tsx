import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdminAuthLoader } from "../../utils/adminAuth";
import { uploadMovieUseCase } from "../../domain/usecases/uploadMovieUseCase";
import PageContainer from "../components/PageContainer";

export function uploadMovieLoader() {
  return checkAdminAuthLoader();
}

export default function UploadMovie() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  function handleFileSelect(selected: File) {
    setFile(selected);
    setTitle(selected.name.replace(/\.[^/.]+$/, ""));
    setError(null);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title.trim()) {
      setError("Please select a file and enter a title.");
      return;
    }
    setIsUploading(true);
    setProgress(0);
    setError(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) { clearInterval(interval); return prev; }
        return prev + 5;
      });
    }, 80);

    try {
      await uploadMovieUseCase(file, title.trim());
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => navigate("/admin/watch-party"), 400);
    } catch {
      clearInterval(interval);
      setIsUploading(false);
      setProgress(0);
      setError("Upload failed. Please try again.");
    }
  }

  return (
    <PageContainer>
      <div style={{ marginBottom: 24 }}>
        <div className="section-title">
          <span className="num">CH 77</span>
          Upload Movie
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Drop zone */}
        <div
          className="dashed-box"
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
            background: isDragOver ? "var(--bg-3)" : "transparent",
            borderColor: isDragOver ? "var(--amber)" : undefined,
            transition: "background 0.15s, border-color 0.15s",
            textAlign: "center",
          }}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp4,.mkv"
            style={{ display: "none" }}
            onChange={(e) => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0]); }}
          />
          {file ? (
            <p className="font-mono" style={{ fontSize: 13, color: "var(--amber)" }}>{file.name}</p>
          ) : (
            <>
              <div className="font-crt" style={{ fontSize: 32, color: "var(--label-dim)", marginBottom: 8 }}>⬆</div>
              <p className="muted" style={{ fontSize: 13 }}>Drag & drop a file here, or click to browse</p>
              <p className="muted" style={{ fontSize: 11, marginTop: 4 }}>Accepted: .mp4, .mkv</p>
            </>
          )}
        </div>

        {/* Title input */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label className="muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Movie title"
            className="input"
          />
        </div>

        {/* Progress bar */}
        {isUploading && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--label-dim)", marginBottom: 6 }}>
              <span>Uploading…</span>
              <span className="font-crt">{progress}%</span>
            </div>
            <div style={{ height: 4, background: "var(--bg-3)", overflow: "hidden" }}>
              <div
                className="bar-amber"
                style={{ height: "100%", width: `${progress}%`, transition: "width 0.1s" }}
              />
            </div>
          </div>
        )}

        {error && (
          <p style={{ color: "var(--red)", fontSize: 12 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={isUploading}
          className="btn btn-primary"
          style={{ opacity: isUploading ? 0.5 : 1 }}
        >
          {isUploading ? "Uploading…" : "⬆ Upload"}
        </button>
      </form>
    </PageContainer>
  );
}
