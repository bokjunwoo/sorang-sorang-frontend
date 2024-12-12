import Image from 'next/image';

interface LayoutProps {
    children: React.ReactNode;
}

export default function MasterLayout({ children }: LayoutProps) {
    return (
        <div className="fixed inset-0 overflow-hidden">
            <Image
                src="/master_bg.svg"
                alt="Background"
                fill
                className="object-cover -z-10"
                priority
            />
            <div className="px-5 py-6 md:py-8">
                {children}
            </div>
        </div>
    )
}