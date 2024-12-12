import React from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    register?: any;
    className?: string;
}

export const Input = ({
  error,
  register,
  className,
  ...props
}: InputProps) => {
    const baseStyles = cn(
        "w-[320px] h-[97px]",
        "rounded-2xl",
        "bg-brand-white/90",
        "px-[30px] py-[30px]",
        "border border-transparent",
        "text-brand-black text-center",
        "placeholder:text-brand-gray",
        "font-pretendard text-pretendard-l",
        "focus:outline-none focus:ring-2 focus:ring-brand-primary2",
        "transition-all duration-200"
    );

    return (
        <div className="relative">
            <input
                className={cn(baseStyles, className)}
                {...register}
                {...props}
            />
            {error && (
                <p className="absolute -bottom-6 left-0 text-red-500 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;