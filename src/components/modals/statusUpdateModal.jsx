import PropTypes from 'prop-types';

const StatusUpdateModal = ({
  show,
  title,
  textareaValue,
  onTextareaChange,
  onCancel,
  onConfirm,
  confirmButtonLabel,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md mx-4 bg-white shadow-lg rounded-2xl">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold dark:text-black">{title}</h2>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Admin Notes:</label>
            <textarea
              value={textareaValue}
              onChange={onTextareaChange}
              className="w-full p-3 border border-gray-300 dark:text-black rounded-2xl focus:border-transparent focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter notes for this status update..."
            />
          </div>


          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 transition-colors border border-gray-300 rounded-2xl hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-2xl hover:bg-blue-700"
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
};

export default StatusUpdateModal;
