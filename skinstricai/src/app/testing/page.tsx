'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StepOne from '../components/formSteps/StepOne';
import StepTwo from '../components/formSteps/StepTwo';


export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const step = parseInt(searchParams.get('step') || '1'); // default to step 1 if not provided

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [isValid, setIsValid] = useState(false);

    const validateInput = (input: string) => /^[a-zA-Z\s]{2,}$/.test(input.trim()); // regex to check if input is at least 2 characters long and contains only letters and spaces

    useEffect(() => {
        const inputToValidate = step === 1 ? name : location;
        setIsValid(validateInput(inputToValidate));
    }, [name, location, step]); // in array of dependencies, we put the variables that we want to watch for changes

    const handleProceed = async () => {
        if (step === 1) {
            router.push('/testing?step=2');
        } else {
            const userData = { name, location };
            localStorage.setItem('userData', JSON.stringify(userData)); // save user data to local storage

            try {
                const res = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (!res.ok) throw new Error('API error');

                const data = await res.json();
                console.log('Success:', data);

                router.push('/aiscan');
            } catch (error) {
                console.error('API Error:', error);
            }
        }
    }

    const handleBack = () => {
        if (step === 1) {
            router.push('/');
        } else {
            router.push('/testing?step=1');
        }
    }

    return (
        <div className='relative h-full flex flex-col flex-1 pt-16'>
            <div className="font-semibold text-base leading-6 tracking-tight uppercase">
                To start analysis
            </div>
            <Image className='m-auto' src="/rombuses.svg" alt="rombus" width={500} height={500} />

            <div className="max-w-[360px] flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
                {step === 1 ? (
                    <StepOne value={name} onChange={setName} />
                ) : (
                    <StepTwo value={location} onChange={setLocation} />
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

