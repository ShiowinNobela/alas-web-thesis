import PropTypes from 'prop-types';

export default function OrderHistoryModal({ data, error, onClose }) {
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white shadow rounded-2xl">
          {/* Header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-300">
            <h2 className="text-lg font-semibold text-gray-900">Order Status History</h2>
            <button
              onClick={onClose}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-400 bg-transparent rounded-2xl hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
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
          <div className="max-h-[60vh] space-y-4 overflow-y-auto p-6">
            {error && <p className="text-red-500">{error}</p>}
            {data && (
              <ul className="space-y-2">
                {data.map((statusUpdate) => (
                  <li key={statusUpdate.history_id} className="mb-2">
                    <strong className="dark:text-black ">{statusUpdate.status}  — </strong>{' '}
                    <span className="text-gray-600 ">{new Date(statusUpdate.status_date).toLocaleString()}</span>
                    {statusUpdate.notes && <span className="ml-1 italic text-black">: {statusUpdate.notes}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end p-4 border-t border-gray-200 rounded-b dark:border-gray-300">
            <button
              onClick={onClose}
              type="button"
              className="rounded-2xl bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderHistoryModal.propTypes = {
  data: PropTypes.array,
  error: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
