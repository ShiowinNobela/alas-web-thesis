import { useState } from 'react';
import axios from 'axios';
export const usePDFDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const downloadPDF = async (startDate, endDate, reportType = 'custom') => {
    setIsDownloading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('/api/sales/pdf-report', {
        params: {
          startDate,
          endDate,
          reportType,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob'
      });

      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'sales-report.pdf'; // fallback name edit this if a suggestion is given

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) filename = match[1];
      }

      // Creates  blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      setError(err.message || 'Failed to download PDF');
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

