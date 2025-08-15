import React from 'react';
import Upload from '../Chinges/Upload.jsx';

const StatusUpdateModal = ({
  show,
  title,
  textareaValue,
  onTextareaChange,
  onCancel,
  onConfirm,
  confirmButtonLabel,
  showImageUpload = false,
  uploadedImage,
  onImageUpload
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Notes:
            </label>
            <textarea
              value={textareaValue}
              onChange={onTextareaChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              placeholder="Enter notes for this status update..."
            />
          </div>

          {showImageUpload && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Supporting Document (Optional):
              </label>
              <div className="border border-gray-300 rounded-lg p-4">
                <Upload
                  onUploadSuccess={(url) => onImageUpload(url)}
                  currentImage={uploadedImage}
                />
                {uploadedImage && (
                  <div className="mt-3">
                    <p className="text-sm text-green-600">✓ Image uploaded successfully</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {confirmButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;