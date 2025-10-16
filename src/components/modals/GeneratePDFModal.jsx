import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Label, Button, Card } from 'flowbite-react';
import { X } from 'lucide-react';
import PDFDownloadButton from '../bigComponents/PDFDownloadButton';

export default function GeneratePDFModal({ isOpen, onClose, activePeriod }) {
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [isCustomValid, setIsCustomValid] = useState(false);

  // Validate custom date range
  useEffect(() => {
    const isValid = dateRange.startDate && dateRange.endDate && dateRange.startDate <= dateRange.endDate;
    setIsCustomValid(isValid);
  }, [dateRange.startDate, dateRange.endDate]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setDateRange({ startDate: '', endDate: '' });
    }
  }, [isOpen]);

  const getPeriodDisplayName = () => activePeriod.charAt(0).toUpperCase() + activePeriod.slice(1);

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <ModalHeader>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Generate Sales Report</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Export your sales data as PDF</p>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className="flex flex-col space-y-5">
          {/* Current Period Report */}
          <Card className="ring-1">
            <h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-gray-100">
              Current {getPeriodDisplayName()} Report
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Generates a PDF report for the currently selected period ({getPeriodDisplayName()}).
            </p>
            <PDFDownloadButton
              activePeriod={activePeriod}
              onComplete={onClose}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            />
          </Card>

          {/* Custom Range */}
          <Card className="ring-1">
            <h2 className="mb-3 flex items-center space-x-2 text-base font-semibold text-gray-900 dark:text-gray-100">
              <p>Custom Date Range</p>
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Choose specific Start and End dates to generate a custom sales report.
            </p>

            <div className="mb-4 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="start-date" value="Start Date" />
                  <input
                    id="start-date"
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="end-date" value="End Date" />
                  <input
                    id="end-date"
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                    min={dateRange.startDate}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {dateRange.startDate && dateRange.endDate && dateRange.startDate > dateRange.endDate && (
                <p className="flex items-center space-x-1 text-sm text-red-600 dark:text-red-400">
                  <X className="h-4 w-4" />
                  <span>End date must be after start date</span>
                </p>
              )}
            </div>

            <PDFDownloadButton
              activePeriod="custom"
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onComplete={onClose}
              disabled={!isCustomValid}
            />
          </Card>

          {/* Cancel Button */}
          <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
            <Button
              color="gray"
              onClick={onClose}
              className="w-full bg-gray-900 hover:bg-gray-700 sm:w-auto dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
