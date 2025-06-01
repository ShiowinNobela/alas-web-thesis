import PropTypes from "prop-types";

export default function StatusModal({
  show,
  title,
  textareaValue,
  onTextareaChange,
  onCancel,
  onConfirm,
  confirmButtonLabel,
  cancelButtonLabel = "Cancel",
}) {
  if (!show) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full bg-black/50"
      aria-hidden="true"
      tabIndex={-1}
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              onClick={onCancel}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <textarea
              value={textareaValue}
              onChange={onTextareaChange}
              placeholder="Enter your reason..."
              className="w-full h-40 p-3 border border-gray-300 text-sm rounded-lg resize-none bg-gray-50 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 focus:ring-red-600 focus:border-red-600"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={onCancel}
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              {cancelButtonLabel}
            </button>
            <button
              onClick={onConfirm}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
            >
              {confirmButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

StatusModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  textareaValue: PropTypes.string.isRequired,
  onTextareaChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmButtonLabel: PropTypes.string.isRequired,
  cancelButtonLabel: PropTypes.string,
};
