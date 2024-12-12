import {ChipProps} from "@/types/common";
import Image from 'next/image';

export const Chip = ({
  children,
  size = 'small',
  className = ''
}: ChipProps) => {
    const sizeClasses = {
        small: {
            container: 'w-[70px] h-6',

            icon: 'w-4 h-4',
            font: 'text-hakgyo-s'
        },
        large: {
            container: 'w-[83px] h-7',
            icon: 'w-5 h-5',
            font: 'text-hakgyo-m'
        }
    };

    return (
        <div
            className={`
              inline-flex items-center justify-center
              bg-brand-bg2 text-brand-black font-hakgyo
              px-3 py-[1px] gap-[10px]
              rounded-lg
              ${sizeClasses[size].container}
              ${className}
            `}
        >
            <div className='inline-flex items-center gap-1'>
                <span className={sizeClasses[size].font}>
                    {children}
                </span>
                <Image
                    src="/volume.svg"
                    alt="Volume"
                    width={size === 'small' ? 16 : 20}
                    height={size === 'small' ? 16 : 20}
                    className={`
                  ${sizeClasses[size].icon}
                  ${size === 'small' ? 'p-[1.33px_1.33px_0.85px_2px]' : 'p-[1.67px_1.67px_1.06px_2.5px]'}
                `}
                />
            </div>
        </div>
    );
};