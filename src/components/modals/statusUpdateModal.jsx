import PropTypes from 'prop-types';
import Upload from '../bigComponents/Upload.jsx';

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
  onImageUpload,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white shadow-lg">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">{title}</h2>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">Admin Notes:</label>
            <textarea
              value={textareaValue}
              onChange={onTextareaChange}
              className="w-full rounded-2xl border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter notes for this status update..."
            />
          </div>

          {showImageUpload && (
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Upload Supporting Document (Optional):
              </label>
              <div className="rounded-2xl border border-gray-300 p-4">
                <Upload onUploadSuccess={(url) => onImageUpload(url)} currentImage={uploadedImage} />
                {uploadedImage && (
                  <div className="mt-3">
                    <p className="text-sm text-green-600">✓ Image uploaded successfully</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="rounded-2xl border border-gray-300 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="rounded-2xl bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              {confirmButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
StatusUpdateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  textareaValue: PropTypes.string.isRequired,
  onTextareaChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmButtonLabel: PropTypes.string.isRequired,
  showImageUpload: PropTypes.bool,
  uploadedImage: PropTypes.string,
  onImageUpload: PropTypes.func,
};

export default StatusUpdateModal;
