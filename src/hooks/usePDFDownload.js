import { useState } from 'react';

export const usePDFDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const downloadPDF = async (startDate, endDate, reportType = 'custom') => {
    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch(`/api/sales/pdf-report?startDate=${startDate}&endDate=${endDate}&reportType=${reportType}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(startDate, endDate, reportType);

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

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

