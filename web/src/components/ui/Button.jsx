import React from 'react';

export const Button = ({
    children,
    variant = 'primary',
    className = '',
    isLoading = false,
    ...props
}) => {
    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all duration-300 rounded-xl group focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white shadow-lg shadow-orange-500/30 focus:ring-orange-500",
        secondary: "bg-white hover:bg-orange-50 text-orange-700 border border-orange-200 focus:ring-orange-200",
        ghost: "text-slate-600 hover:text-orange-600 hover:bg-orange-50 focus:ring-transparent"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                </span>
            ) : children}

            {/* Glow effect on hover for primary button */}
            {variant === 'primary' && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />
            )}
        </button>
    );
};
