'use client'

import * as z from 'zod';
import {useRouter} from "next/navigation";
import {useState} from "react";
import {masterStore} from "@/store/master";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {REGION_KEYWORDS} from "@/config/keywords";
import {RegionType} from "@/types/master";

const nameSchema = z.object({
    name: z.string().min(1, '이름을 입력해주세요')
});

const regionSchema = z.object({
    region: z.string().min(1, '지역을 선택해주세요')
});

const keywordSchema = z.object({
    keyword: z.string().min(1, '키워드를 선택해주세요')
});

export default function MasterInfoForm() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const setMasterInfo = masterStore(state => state.setMasterInfo);
    const masterInfo = masterStore(state => state.masterInfo);

    const nameForm = useForm({
        resolver: zodResolver(nameSchema),
        defaultValues: {
            name: masterInfo.name
        }
    });

    const regionForm = useForm({
        resolver: zodResolver(regionSchema),
        defaultValues: {
            region: masterInfo.region
        }
    });

    const keywordForm = useForm({
        resolver: zodResolver(keywordSchema),
        defaultValues: {
            keyword: masterInfo.keyword
        }
    })

    const onNameSubmit = nameForm.handleSubmit((data) => {
        setMasterInfo({ ...masterInfo, name: data.name });
        setStep(2);
    });

    const onRegionSubmit = regionForm.handleSubmit((data) => {
        setMasterInfo({ ...masterInfo, region: data.region });
        setStep(3);
    });

    const onKeywordSubmit = keywordForm.handleSubmit((data) => {
        setMasterInfo({ ...masterInfo, keyword: data.keyword });
        router.push('/master/speech');
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
                <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{width: `${(step / 3) * 100}%`}}
                />
            </div>

            <div className="flex-1 p-6 flex flex-col justify-center text-gray-700">
                <div className="max-w-md mx-auto w-full bg-white rounded-xl shadow-lg p-6">
                    {step === 1 && (
                        <form onSubmit={onNameSubmit} className="space-y-4">
                            <h1 className="text-2xl font-bold text-center mb-8">
                                이름을 입력해주세요
                            </h1>
                            <input
                                {...nameForm.register('name')}
                                className="w-full p-4 text-lg border rounded-lg border-gray-300
                                focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="이름"
                                autoFocus
                            />
                            {nameForm.formState.errors.name && (
                                <p className="text-red-500 text-sm">
                                    {nameForm.formState.errors.name.message}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="w-full p-4 rounded-lg bg-blue-500 text-white
                                hover:bg-blue-600 text-lg"
                            >
                                확인
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={onRegionSubmit} className="space-y-4">
                            <h1 className="text-2xl font-bold text-center mb-8">
                                지역을 선택해주세요
                            </h1>
                            <select
                                {...regionForm.register('region')}
                                className="w-full p-4 text-lg border rounded-lg border-gray-300
                                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                                autoFocus
                            >
                                <option value="">지역을 선택해주세요</option>
                                {Object.keys(REGION_KEYWORDS).map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            {regionForm.formState.errors.region && (
                                <p className="text-red-500 text-sm">
                                    {regionForm.formState.errors.region.message}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="w-full p-4 rounded-lg bg-blue-500 text-white
                                hover:bg-blue-600 text-lg"
                            >
                                확인
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={onKeywordSubmit} className="space-y-4">
                            <h1 className="text-2xl font-bold text-center mb-8">
                                키워드를 선택해주세요
                            </h1>
                            <select
                                {...keywordForm.register('keyword')}
                                className="w-full p-4 text-lg border rounded-lg border-gray-300
                                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                                autoFocus
                            >
                                <option value="">키워드를 선택해주세요</option>
                                {REGION_KEYWORDS[masterInfo.region as RegionType]?.map((keyword) => (
                                    <option key={keyword} value={keyword}>{keyword}</option>
                                ))}
                            </select>
                            {keywordForm.formState.errors.keyword && (
                                <p className="text-red-500 text-sm">
                                    {keywordForm.formState.errors.keyword.message}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="w-full p-4 rounded-lg bg-blue-500 text-white
                                hover:bg-blue-600 text-lg"
                            >
                                시작하기
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}