import React from 'react';

export const Input = ({
    label,
    error,
    icon: Icon,
    rightIcon: RightIcon,
    onRightIconClick,
    className = '',
    ...props
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-orange-400 group-focus-within:text-orange-600 transition-colors">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    className={`
            w-full bg-white text-slate-800 placeholder-slate-400 
            border border-orange-200/50 rounded-xl 
            ${Icon ? 'pl-11' : 'pl-4'} ${RightIcon ? 'pr-11' : 'pr-4'} py-3
            focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500
            transition-all duration-300
            shadow-sm
            hover:border-orange-300
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          `}
                    {...props}
                />
                {RightIcon && (
                    <div
                        className={`absolute inset-y-0 right-0 pr-4 flex items-center text-orange-400 group-focus-within:text-orange-600 transition-colors ${onRightIconClick ? 'cursor-pointer hover:text-orange-700' : 'pointer-events-none'}`}
                        onClick={onRightIconClick}
                    >
                        <RightIcon size={20} />
                    </div>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-500 ml-1 animate-slideIn">
                    {error}
                </p>
            )}
        </div>
    );
};
