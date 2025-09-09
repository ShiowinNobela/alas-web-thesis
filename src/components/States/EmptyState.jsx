import React from 'react';
import { Bug } from 'lucide-react';

const EmptyState = ({
  title = "No data available",
  description = "There's nothing to display here yet.",
  icon = <Bug className="w-6 h-6" />,
  actionText = "Refresh",
  onAction,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="mb-4 text-6xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-700">{title}</h3>
      <p className="max-w-md mb-6 text-gray-500">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;