'use client'

import { useState } from 'react';
import Image from 'next/image';
import {Button} from "@/components/common/Button";
import Input from "@/components/common/Input";
import * as z from 'zod';
import { userStore } from '@/store/user';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';

const schema = z.object({
    name: z.string().min(1, '이름을 입력해주세요')
});

export default function HomePage() {
    const router = useRouter();
    const [showLayer, setShowLayer] = useState(false);
    const setUserName = userStore(state => state.setName);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: ''
        }
    });

    const handleClick = () => {
        setShowLayer(true);
    };

    const handleSubmit = form.handleSubmit((data) => {
        if (data.name.trim()) {
            setUserName(data.name.trim());
            router.push('/mypage'); // 또는 다음 페이지 경로
        }
    });

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Image
                src="/home_bg.svg"
                alt="Home"
                fill
                priority
                className="object-cover"
            />
            {!showLayer && (
                <div className="absolute bottom-20 left-0 right-0 px-4 text-hakgyo-l">
                    <Button
                        onClick={handleClick}
                        variant='default'
                        className="w-full mt-[610px]"
                    >
                        시작하기
                    </Button>
                </div>
            )}

            {showLayer && (
                <div className="fixed inset-0 transition-opacity duration-300 ease-in-out animate-fadeIn">
                    <div className="absolute inset-0">
                        <Image
                            src="/overlay_bg.svg"
                            alt="Overlay Background"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                        <div className="w-full max-w-md space-y-8 animate-slideUp">
                            <div className="text-center space-y-4">
                                <h2 className="text-pretendard-xl font-pretendard text-brand-black">
                                    안녕하세요!<br/>
                                    이름이 무엇인가요?
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-60 justify-center">
                                <div className="text-brand-black pt-[80px] flex justify-center">
                                    <Input
                                        register={form.register('name')}
                                        error={form.formState.errors.name?.message}
                                        placeholder="이름을 알려주세요"
                                        autoFocus
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="default"
                                    className="w-full text-hakgyo-l"
                                    disabled={!form.watch('name').trim()}
                                >
                                    확인
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}