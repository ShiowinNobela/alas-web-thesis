import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'sonner';
import { CloudUpload } from 'lucide-react';

function Upload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
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
    formData.append('image', file);

    try {
      setIsUploading(true);
      setProgress(0);

      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (evt) => setProgress(Math.round((evt.loaded / evt.total) * 100)),
      });

      const url = res.data.data.url;
      if (url) onUploadSuccess(url);
    } catch {
      toast.error('Image upload failed.');
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="flex w-full items-center justify-center" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="w-full">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {preview ? (
            <img src={preview} alt="preview" className="h-full w-full rounded-2xl object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudUpload className="mb-2 h-12 w-12 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800×400 px)</p>
            </div>
          )}
          <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>

        {file && (
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => {
                setFile(null);
                setPreview('');
              }}
              className="bg-brand hover:bg-brand/75 rounded px-3 py-1 text-xs text-white disabled:opacity-50"
            >
              Remove
            </button>
            <button
              type="button"
              disabled={isUploading}
              onClick={handleUpload}
              className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isUploading ? `Uploading ${progress}%` : 'Upload'}
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
