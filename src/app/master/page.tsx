'use client'

import {useRouter} from "next/navigation";

export default function MasterPage() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/master/info');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <button
                onClick={handleClick}
                className="w-full mx-8 p-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-lg"
            >
                시작하기
            </button>
        </div>
    )
}