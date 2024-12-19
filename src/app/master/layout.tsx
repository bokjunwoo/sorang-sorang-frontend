'use client'

import Image from 'next/image';
import {usePathname} from "next/navigation";

interface LayoutProps {
    children: React.ReactNode;
}

export default function MasterLayout({children}: LayoutProps) {
    const pathname = usePathname();

    const getBackgroundImage = () => {
        if (pathname === '/master/info') return '/bg/info_bg.svg';
        if (pathname === '/master/speech') return '/bg/speech_bg.svg';
        return '/bg/master_bg.svg';
    };

    return (
        <div className="relative min-h-screen">
            <Image
                src={getBackgroundImage()}
                alt="Background"
                fill
                className="object-cover fixed inset-0 -z-10"
                priority
            />
            <div className="px-5 py-6 md:py-8">
                {children}
            </div>
        </div>
    )
}