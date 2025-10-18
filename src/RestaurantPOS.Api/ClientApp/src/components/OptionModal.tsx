import React from 'react';

interface OptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Placeholder modal component for product options.  In a real implementation this
// would display choices such as extra toppings, cooking preferences, etc.
export const OptionModal: React.FC<OptionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80">
        <h3 className="text-lg font-semibold mb-4">Product Options</h3>
        <p className="text-sm text-slate-600 mb-4">Option selection goes here.</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};