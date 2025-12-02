import React from 'react';
import { CheckCircle, X } from 'lucide-react';

/**
 * Reusable success message component
 */
const SuccessMessage = ({ message, onClose, className = '' }) => {
    if (!message) return null;

    return (
        <div className={`bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 ${className}`}>
            <div className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                    <p className="text-emerald-400 text-sm">{message}</p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors flex-shrink-0"
                        aria-label="Close success message"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SuccessMessage;
