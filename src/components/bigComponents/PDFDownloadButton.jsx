import { Button } from 'flowbite-react';
import { Download, Loader2 } from 'lucide-react';
import dayjs from 'dayjs';
import { usePDFDownload } from '@/hooks/usePDFDownload';

const PDFDownloadButton = ({ activePeriod, startDate, endDate, onComplete, disabled = false, allowCustom = true }) => {
  const { downloadPDF, isDownloading, error, reset } = usePDFDownload();

  const handleDownload = async () => {
    if (disabled) return;

    reset();

    let start, end;
    const today = dayjs();

    // If custom it will require dates
    if (activePeriod === 'custom') {
      if (!allowCustom) {
        alert('Custom date range is not allowed for this report');
        return;
      }

      if (startDate && endDate) {
        start = startDate;
        end = endDate;
      } else {
        alert('Please select a valid custom date range');
        return;
      }
    }

    // Toggle Report settings
    else {
      switch (activePeriod) {
        case 'daily':
          start = today.format('YYYY-MM-DD');
          end = today.format('YYYY-MM-DD');
          break;

        case 'weekly':
          start = today.startOf('week').add(1, 'day').format('YYYY-MM-DD');
          end = today.endOf('week').add(1, 'day').format('YYYY-MM-DD'); //getsuyoubi
          break;

        case 'monthly':
          start = today.startOf('month').format('YYYY-MM-DD');
          end = today.endOf('month').format('YYYY-MM-DD');
          break;

        case 'yearly':
          start = today.startOf('year').format('YYYY-MM-DD');
          end = today.endOf('year').format('YYYY-MM-DD');
          break;

        default:
          start = startDate;
          end = endDate;
      }
    }

    if (!start || !end) {
      alert('Please select a date range');
      return;
    }

    if (dayjs(end).isBefore(dayjs(start))) {
      alert('End date cannot be before start date');
      return;
    }

    await downloadPDF(start, end, activePeriod);
    if (onComplete) onComplete(); // Modal Remover after Download
  };

  return (
    <div>
      <Button
        onClick={handleDownload}
        disabled={isDownloading || disabled}
        className="bg:gray flex items-center space-x-2 hover:bg-gray-600 disabled:bg-gray-400"
      >
        {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        <span>{isDownloading ? 'Generating PDF...' : 'Download PDF Report'}</span>
      </Button>

      {error && (
        <div className="text-error mt-2 rounded-lg bg-red-100 p-3 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default PDFDownloadButton;
