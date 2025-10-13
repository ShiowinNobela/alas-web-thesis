import { useState } from 'react';
import axios from 'axios';

export const usePDFDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const downloadPDF = async (startDate, endDate, reportType = 'custom') => {
    setIsDownloading(true);
    setError(null);

    try {
      const response = await axios.get('/api/sales/pdf-report', {
        params: {
          startDate,
          endDate,
          reportType,
        },
        responseType: 'blob',
      });

      let filename;

      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      // Generate  filename
      const generateFilename = () => {
        const date = new Date().toISOString().split('T')[0];

        if (reportType === 'custom' && startDate && endDate) {
          const start = startDate.split('T')[0];
          const end = endDate.split('T')[0];
          return `sales-report-${start}-to-${end}.pdf`;
        }

        return `sales-report-${date}.pdf`;
      };

      if (!filename) {
        filename = generateFilename(startDate, endDate, reportType);
      }
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 1000);
    } catch (err) {
      setError(err.message || 'Failed to download PDF');
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const reset = () => {
    setError(null);
  };

  return {
    downloadPDF,
    isDownloading,
    error,
    reset,
  };
};
