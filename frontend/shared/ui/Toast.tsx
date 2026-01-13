'use client';

import { useState } from 'react';

export const Toast = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showToast = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <div>
      <button
        onClick={showToast}
        className="px-4 py-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200 font-medium"
      >
        Create Task
      </button>

      {isVisible && (
        <div className="fixed bottom-4 right-4 px-6 py-3 rounded-md bg-green-50 text-green-700 shadow-lg border border-green-200 animate-fade-in">
          Task created successfully!
        </div>
      )}
    </div>
  );
};
