'use client'

import {useRouter} from "next/navigation";
import {Button} from "@/components/common/Button";

export default function MasterPage() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/master/info');
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Button
                onClick={handleClick}
                variant='master'
                className="w-full mt-[610px]"
            >
                시작하기
            </Button>
        </div>
    )
}