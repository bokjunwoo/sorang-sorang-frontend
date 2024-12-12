import {ButtonProps} from "@/types/common";
import {cn} from "@/lib/utils/cn";

export const Button = ({
    variant = 'default',
    children,
    className,
    disabled,
    ...props
}: ButtonProps) => {
    const baseStyles = cn(
        "w-[320px] h-[58px]",
        "rounded-2xl",
        // "mt-[20px] ml-[20px]",
        "overflow-hidden"
    );

    const variants = {
        default: cn(
            "relative",
            "border-2 border-brand-primary3",
            "font-hakgyo text-hakgyo-l text-white",
            "[&>div:first-child]:absolute [&>div:first-child]:inset-0 [&>div:first-child]:bg-gradient-to-b",
            "[&>div:first-child]:from-brand-primary1 [&>div:first-child]:from-50% ",
            "[&>div:first-child]:to-brand-primary2 [&>div:first-child]:to-50%"
        ),
        disabled: cn(
            "relative",
            "font-hakgyo text-hakgyo-l text-[#848484]",
            "[&>div:first-child]:absolute [&>div:first-child]:inset-0 [&>div:first-child]:bg-gradient-to-b",
            "[&>div:first-child]:from-brand-gray [&>div:first-child]:from-50% ",
            "[&>div:first-child]:to-[#505050] [&>div:first-child]:to-50%"
        ),
        master: cn(
            "relative",
            "text-white font-pretendard text-pretendard-l",
            "bg-brand-primary2"
        )
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                className
            )}
            disabled={variant === 'disabled' || disabled}
            {...props}
        >
            <div className="relative z-10 flex items-center justify-center w-full h-full">
                {children}
            </div>
        </button>
    );
};