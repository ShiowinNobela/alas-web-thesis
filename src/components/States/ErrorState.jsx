import React from 'react';
import { Alert, Button } from 'flowbite-react';

const ErrorState = ({
  error,
  onRetry,
  title = "Error loading data",
  retryText = "Try Again",
  alertColor = "failure",
  buttonColor = "failure",
  className = "",
  showRetry = true,
  children
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <Alert color={alertColor} className="w-full max-w-md mb-4">
        <span className="font-medium">{title}:</span> {error?.message || String(error)}
        {children}
      </Alert>
      
      {showRetry && onRetry && (
        <Button onClick={onRetry} color={buttonColor}>
          {retryText}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;