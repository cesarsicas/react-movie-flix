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
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
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
      <h1 className="mb-6 text-3xl font-bold">Upload Movie</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
        <div
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
            isDragOver ? "border-slate-500 bg-slate-50" : "border-gray-300 hover:border-slate-400"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp4,.mkv"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0]); }}
          />
          {file ? (
            <p className="text-sm font-medium text-slate-700">{file.name}</p>
          ) : (
            <>
              <p className="text-gray-500">Drag & drop a file here, or click to browse</p>
              <p className="mt-1 text-xs text-gray-400">Accepted: .mp4, .mkv</p>
            </>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Movie title"
            className="w-full rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        {isUploading && (
          <div>
            <div className="mb-1 flex justify-between text-xs text-gray-500">
              <span>Uploading…</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-slate-700 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isUploading}
          className="rounded bg-slate-800 px-6 py-2 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? "Uploading…" : "Upload"}
        </button>
      </form>
    </PageContainer>
  );
}
