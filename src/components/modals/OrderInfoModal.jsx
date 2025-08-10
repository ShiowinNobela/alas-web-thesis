import { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

export default function OrderInfoModal({
  tooltipContent = 'Learn more',
  modalTitle = 'Information',
  children,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip content={tooltipContent}>
        <button
          onClick={() => setOpen(true)}
          className="group rounded-full border border-gray-300 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label={tooltipContent}
        >
          <HiInformationCircle className="h-5 w-5" />
        </button>
      </Tooltip>

      <Modal show={open} onClose={() => setOpen(false)} size="xl" popup>
        <ModalHeader className="p-4">{modalTitle}</ModalHeader>

        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
