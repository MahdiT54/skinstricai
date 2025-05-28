'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function Page() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState(''); // tracking validation errors
    const [isValid, setIsValid] = useState(false); // tracking form validity
    // const router = useRouter();

    const validateInput = (input: string) => /^[a-zA-Z\s]{2,}$/.test(input.trim());

    useEffect(() => {
        const inputToValidate = currentStep === 1 ? name : city;
        setIsValid(validateInput(inputToValidate));
    }, [name, city, currentStep]);

    const handleProceed = () => {
        if (currentStep === 1) {
            setCurrentStep(2);
            setTimeout(() => {
                router.push("/testing?step=2");
            }, 0);
        }
    }

    const handleBack = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
            router.push('/testing?step=1');
        } else {
            router.push('/');
        }
    }

    return (
        <div className='relative h-full flex flex-col flex-1 pt-16'>
            <div className="font-semibold text-base leading-6 tracking-tight uppercase">
                To start analysis
            </div>
            <Image className='m-auto' src="/rombuses.svg" alt="rombus" width={500} height={500} />

            <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
                {currentStep === 1 && (
                    <>
                        <label htmlFor="name" className="font-normal text-sm leading-6 uppercase text-gray-500">What is your name?</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Introduce Yourself"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="outline-none w-full border-b border-black text-5xl leading-tight tracking-tighter text-center"
                        />
                    </>
                )}
                {currentStep === 2 && (
                    <>
                        <label htmlFor="city" className="font-normal text-sm leading-6 uppercase text-gray-500">What is your city?</label>
                        <input
                            type="text"
                            id="city"
                            placeholder="Where are you from?"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="outline-none w-full border-b border-black text-5xl leading-tight tracking-tighter text-center"
                        />
                    </>
                )}
            </div>
            <div className='flex justify-between px-4 mt-auto mb-6'>
                <button onClick={handleBack} className='flex items-center gap-4 uppercase font-semibold text-sm'>
                    <Image src="/buttin-icon-shrunk.svg" alt="back btn" width={44} height={44} />
                    Back
                </button>

                {isValid && (
                    <button onClick={handleProceed} className='flex items-center gap-4 uppercase font-semibold text-sm'>
                        Proceed
                        <Image src="/buttin-icon-proceed.svg" alt="proceed btn" width={44} height={44} />
                    </button>
                )}
            </div>
        </div>
    );
}

