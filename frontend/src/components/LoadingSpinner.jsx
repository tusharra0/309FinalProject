import React from 'react';

/**
 * Reusable loading spinner component
 */
const LoadingSpinner = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
        xl: 'w-16 h-16 border-4',
    };

    const spinnerSize = sizeClasses[size] || sizeClasses.md;

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`${spinnerSize} border-indigo-600 border-t-transparent rounded-full animate-spin`}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
