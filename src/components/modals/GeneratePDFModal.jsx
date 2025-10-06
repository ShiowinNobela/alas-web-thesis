import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import PDFDownloadButton from "../bigComponents/PDFDownloadButton";
import { X } from "lucide-react";

export default function GeneratePDFModal({ isOpen, onClose, activePeriod }) {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [isCustomValid, setIsCustomValid] = useState(false);

  // Validate custom date range
  useEffect(() => {
    const isValid = dateRange.startDate && 
        dateRange.endDate && 
        dateRange.startDate <= dateRange.endDate;
    setIsCustomValid(isValid);
  }, [dateRange.startDate, dateRange.endDate]);

  // Form Reset
  useEffect(() => {
    if (!isOpen) {
      setDateRange({ startDate: "", endDate: "" });
    }
  }, [isOpen]);

  const getPeriodDisplayName = () => {
    return activePeriod.charAt(0).toUpperCase() + activePeriod.slice(1);
  };

return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-lg sm:max-w-md">
      <DialogHeader className="flex flex-row items-center justify-center pb-4 border-b">
        <div className="flex items-center space-x-3">
          <div>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Generate Sales Report
            </DialogTitle>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Export your sales data as PDF
              </p>
          </div>
        </div>
      </DialogHeader>

      <div className="flex flex-col mt-4 space-y-5">
        {/* Full Report */}
        <div className="p-5 border border-blue-100 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800">
					<h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-gray-100">
						Current {getPeriodDisplayName()} Report
					</h2>
					<p className="mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
						Generates a PDF report for the currently selected period ({getPeriodDisplayName()}).
					</p>
					<PDFDownloadButton 
						activePeriod={activePeriod}
						onComplete={onClose}
						className="w-full text-white bg-blue-600 hover:bg-blue-700"
					/>
      	</div>

        {/* Custom Range */}
        <div className="p-5 border border-blue-100 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800">
          <h2 className="flex items-center mb-3 space-x-2 text-base font-semibold text-gray-900 dark:text-gray-100">
            <p>Custom Date Range</p>
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Choose specific Start and End dates to generate a custom sales report.
          </p>
          {/* Date inputs */}
          <div className="mb-4 space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                  className="block w-full px-3 py-2 transition-colors border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    End Date
                </label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  min={dateRange.startDate}
                  className="block w-full px-3 py-2 transition-colors border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            {/* Validation message */}
            {dateRange.startDate && dateRange.endDate && dateRange.startDate > dateRange.endDate && (
              <p className="flex items-center space-x-1 text-sm text-red-600 dark:text-red-400">
                <X className="w-4 h-4" />
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
        </div>

        <DialogFooter className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full text-white bg-gray-900 border-gray-600 hover:text-white sm:w-auto dark:border-gray-600 hover:bg-gray-600 disabled:bg-gray-400"
          >
            Cancel
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
);
}