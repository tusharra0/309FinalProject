import React from 'react';
import { AlertCircle, X } from 'lucide-react';

/**
 * Reusable error message component
 */
const ErrorMessage = ({ message, onClose, className = '' }) => {
    if (!message) return null;

    return (
        <div className={`bg-red-500/10 border border-red-500/20 rounded-lg p-4 ${className}`}>
            <div className="flex items-start gap-3">
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                    <p className="text-red-400 text-sm">{message}</p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                        aria-label="Close error"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;
