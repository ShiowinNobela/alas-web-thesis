import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { toast } from "sonner";

function Upload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (selected) => {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      setProgress(0);

      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) =>
          setProgress(Math.round((evt.loaded / evt.total) * 100)),
      });

      const url = res.data.data.url;
      if (url) onUploadSuccess(url);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div
      className="flex items-center justify-center w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden"
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <HiOutlineCloudUpload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800×400 px)
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <div className="mt-4 flex gap-2 justify-end">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => {
                setFile(null);
                setPreview("");
              }}
              className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            >
              Remove
            </button>
            <button
              type="button"
              disabled={isUploading}
              onClick={handleUpload}
              className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isUploading ? `Uploading ${progress}%` : "Upload"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

Upload.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
};

export default Upload;
