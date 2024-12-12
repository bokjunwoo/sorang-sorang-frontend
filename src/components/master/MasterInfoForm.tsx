'use client'

import * as z from 'zod';
import {useRouter} from "next/navigation";
import {useState} from "react";
import {masterStore} from "@/store/master";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {REGION_KEYWORDS} from "@/config/keywords";
import {RegionType} from "@/types/master";
import ProgressBar from "@/components/master/ProgressBar";
import {Button} from "@/components/common/Button";
import Input from "@/components/common/Input";
import {cn} from "@/lib/utils/cn";

const nameSchema = z.object({
    name: z.string().min(1, '이름을 입력해주세요')
});

const genderSchema = z.object({
    gender: z.enum(['할머니', '할아버지'], { required_error: '성별을 선택해주세요' }),
});

const numberSchema = z.object({
    number: z
        .string()
        .min(1, '전화번호를 입력해주세요')
        .regex(
            /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
            '올바른 전화번호 형식이 아닙니다'
        )
        .transform((val) => {
            const cleaned = val.replace(/-/g, '');
            return cleaned.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
        })
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

    const genderForm = useForm({
        resolver: zodResolver(genderSchema),
        defaultValues: {
            gender: masterInfo.gender
        }
    })

    const numberForm = useForm({
        resolver: zodResolver(numberSchema),
        defaultValues: {
            number: masterInfo.number
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

    const onGenderSubmit = genderForm.handleSubmit((data) => {
        setMasterInfo({ ...masterInfo, gender: data.gender });
        setStep(3);
    })

    const onNumberSubmit = numberForm.handleSubmit((data) => {
        setMasterInfo({ ...masterInfo, number: data.number });
        setStep(4);
    })

    const onRegionSubmit = regionForm.handleSubmit((data) => {
        setMasterInfo({ ...masterInfo, region: data.region });
        setStep(5);
    });

    const onKeywordSubmit = keywordForm.handleSubmit((data) => {
        setMasterInfo({ ...masterInfo, keyword: data.keyword });
        router.push('/master/speech');
    });

    const formatPhoneNumber = (value: string) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        if (phoneNumber.length < 4) return phoneNumber;
        if (phoneNumber.length < 7) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        }
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedNumber = formatPhoneNumber(e.target.value);
        if (formattedNumber.length <= 13) {
            numberForm.setValue('number', formattedNumber);
        }
    };

    return (
        <div className="min-h-screen h-screen flex flex-col">
            <div className="pt-[14px]">
                <ProgressBar currentStep={step} totalSteps={5} />
            </div>

            <div className="flex-1 flex flex-col pt-[72px] relative h-full">
                {step === 1 && (
                    <div className="flex flex-col items-center h-full">
                        <form onSubmit={onNameSubmit} className="flex flex-col items-center w-full h-full max-w-[360px] gap-4">
                            <h1 className="text-2xl font-bold text-center text-brand-black text-mb-8 font-pretendard text-pretendard-xl">
                                안녕하세요!<br/>
                                성함이 어떻게 되시나요?
                            </h1>
                            <div className="text-brand-black pt-[74px]">
                                <Input
                                    register={nameForm.register('name')}
                                    error={nameForm.formState.errors.name?.message}
                                    placeholder="이름"
                                    autoFocus
                                />
                            </div>
                            <div className="mt-auto mb-[56px]">
                                <Button variant="master">
                                    다음
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col items-center h-full">
                        <form onSubmit={onGenderSubmit}
                              className="flex flex-col items-center w-full h-full max-w-[360px] gap-4">
                            <h1 className="text-2xl font-bold text-center text-brand-black text-mb-8 font-pretendard text-pretendard-xl">
                                {masterInfo.name} 어르신,<br/>
                                성별은 어떻게 되시나요?
                            </h1>
                            <div className="font-pretendard text-pretendard-l pt-[74px] flex gap-[16px]">
                            <button
                                    type="button"
                                    onClick={() => genderForm.setValue('gender', '할아버지')}
                                    className={cn(
                                        "w-[152px] h-[152px] rounded-2xl",
                                        "font-pretendard text-pretendard-l",
                                        "transition-all duration-200",
                                        genderForm.watch('gender') === '할아버지'
                                            ? "bg-brand-primary2 text-white"
                                            : "bg-white/90 text-brand-black"
                                    )}
                                >
                                    남성
                                </button>
                                <button
                                    type="button"
                                    onClick={() => genderForm.setValue('gender', '할머니')}
                                    className={cn(
                                        "w-[152px] h-[152px] rounded-2xl",
                                        "font-pretendard text-pretendard-l",
                                        "transition-all duration-200",
                                        genderForm.watch('gender') === '할머니'
                                            ? "bg-brand-primary2 border-brand-primary3 border-2 text-white font-bold"
                                            : "bg-white/90 text-brand-black"
                                    )}
                                >
                                    여성
                                </button>
                            </div>
                            <div className="mt-auto mb-[56px]">
                                <Button variant="master">
                                    다음
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col items-center h-full">
                        <form onSubmit={onNumberSubmit} className="flex flex-col items-center w-full h-full max-w-[360px] gap-4">
                            <h1 className="text-2xl font-bold text-center text-brand-black text-mb-8 font-pretendard text-pretendard-xl">
                                시작하기 전에,<br/>
                                전화번호를 입력해주세요
                            </h1>
                            <div className="text-brand-black pt-[74px]">
                                <Input
                                    register={numberForm.register('number')}
                                    type="tel"
                                    inputMode="numeric"
                                    onChange={(e) => {
                                        numberForm.register('number').onChange(e);
                                        handlePhoneChange(e);
                                    }}
                                    error={numberForm.formState.errors.number?.message}
                                    placeholder="010-1234-5678"
                                    autoFocus
                                />
                            </div>
                            <div className="mt-auto mb-[56px]">
                                <Button variant="master">
                                    다음
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 4 && (
                    <div className="flex flex-col items-center h-full">
                        <form onSubmit={onRegionSubmit}
                              className="flex flex-col items-center w-full h-full max-w-[360px] gap-4">
                            <h1 className="text-2xl font-bold text-center text-brand-black text-mb-8 font-pretendard text-pretendard-xl">
                                어디 지역에<br/>
                                거주하고 계신가요?
                            </h1>
                            <div className="font-pretendard text-pretendard-m pt-[40px] grid grid-cols-3 gap-y-[20px] gap-x-[12px]">
                                {Object.keys(REGION_KEYWORDS).map((region) => (
                                    <button
                                        key={region}
                                        type="button"
                                        onClick={() => regionForm.setValue('region', region as RegionType)}
                                        className={cn(
                                            "w-[96px] h-[56px] rounded-2xl",
                                            "font-pretendard text-pretendard-m",
                                            "transition-all duration-200",
                                            regionForm.watch('region') === region
                                                ? "bg-brand-primary2 border-brand-primary3 border-2 text-white font-bold"
                                                : "bg-white/90 text-brand-black"
                                        )}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-auto mb-[56px]">
                                <Button variant="master">
                                    다음
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 5 && (
                    <div className="flex flex-col items-center h-full">
                        <form onSubmit={onKeywordSubmit}
                              className="flex flex-col items-center w-full h-full max-w-[360px] gap-4">
                            <h1 className="text-2xl font-bold text-center text-brand-black text-mb-8 font-pretendard text-pretendard-xl">
                                어떤 이야기를<br/>
                                들려주고 싶으신가요?
                            </h1>
                            <div
                                className="font-pretendard text-pretendard-m pt-[40px] grid grid-cols-1 gap-y-[20px] gap-x-[12px]">
                                {REGION_KEYWORDS[masterInfo.region as RegionType]?.map((keyword) => (
                                    <button
                                        key={keyword}
                                        type="button"
                                        onClick={() => keywordForm.setValue('keyword', keyword)}
                                        className={cn(
                                            "w-[320px] h-[56px] rounded-2xl",
                                            "font-pretendard text-pretendard-m",
                                            "transition-all duration-200",
                                            keywordForm.watch('keyword') === keyword
                                                ? "bg-brand-primary2 border-brand-primary3 border-2 text-white font-bold"
                                                : "bg-white/90 text-brand-black"
                                        )}
                                    >
                                        {keyword}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-auto mb-[56px]">
                                <Button variant="master">
                                    다음
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}