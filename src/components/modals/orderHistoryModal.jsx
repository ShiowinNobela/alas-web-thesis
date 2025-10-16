import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineContent,
  TimelineTime,
  TimelineTitle,
  TimelineBody,
} from 'flowbite-react';

export default function OrderHistoryModal({ data, error, onClose }) {
  return (
    <Modal show={!!data || !!error} onClose={onClose} size="md" popup>
      <ModalHeader className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Status History</h2>
      </ModalHeader>

      <ModalBody>
        {error && <p className="text-red-500">{error}</p>}

        {data && data.length > 0 ? (
          <Timeline>
            {data.map((statusUpdate) => (
              <TimelineItem key={statusUpdate.history_id}>
                <TimelinePoint />
                <TimelineContent>
                  <TimelineTime>{new Date(statusUpdate.status_date).toLocaleString()}</TimelineTime>
                  <TimelineTitle className="capitalize">{statusUpdate.status}</TimelineTitle>
                  {statusUpdate.notes && <TimelineBody>{statusUpdate.notes}</TimelineBody>}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <p className="text-lighter">No order history available.</p>
        )}
      </ModalBody>

      <div className="flex justify-end border-t border-gray-200 p-4 dark:border-gray-700">
        <Button color="failure" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}

OrderHistoryModal.propTypes = {
  data: PropTypes.array,
  error: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
