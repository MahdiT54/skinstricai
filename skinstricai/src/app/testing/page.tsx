'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Page() {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [showProceed, setShowProceed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isValid = validateInput(step === 1 ? name : location);
        setShowProceed(isValid);
    }, [name, location, step]);

    const validateInput = (input: string) => {
        return /^[a-zA-Z\s]{2,}$/.test(input.trim()); // only letters and spaces, at least 2 characters
    };

    const handleProceed = async () => {
        if (step === 1) {
            setStep(2);
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

    return (
        <div className='relative h-full flex flex-col flex-1 pt-16'>
            <div className="font-semibold text-base leading-6 tracking-tight uppercase">
                To start analysis
            </div>

            <Image className='m-auto' src="/rombuses.svg" alt="rombus" width={500} height={500} />

            <div className="max-w-[360px] flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
                <label htmlFor="input" className='font-normal text-sm leading-6 uppercase text-gray-500'>
                    {step === 1 ? 'Click to type' : 'Where are you from?'}
                </label>
                <input
                    type="text"
                    id="input"
                    placeholder={step === 1 ? "Introduce Yourself" : "Your Location"}
                    value={step === 1 ? name : location}
                    onChange={(e) => step === 1 ? setName(e.target.value) : setLocation(e.target.value)}
                    className=" outline-none w-full border-b border-black text-5xl leading-tight tracking-tighter text-center"
                />
            </div>
            <div className='flex justify-between'>

                {/* Proceed button */}


                {/* Back button */}
                {step === 1 ? (
                    <Link href='/' className='flex items-center gap-4 font-semibold text-sm leading-4 tracking-tight uppercase ml-4 mt-4'>
                        <Image src="/buttin-icon-shrunk.svg" alt="back btn" width={44} height={44} />
                        Back
                    </Link>
                ) : (
                    <button
                        onClick={() => setStep(1)}
                        className='flex items-center gap-4 font-semibold text-sm leading-4 tracking-tight uppercase ml-4 mt-4'
                    >
                        <Image src="/buttin-icon-shrunk.svg" alt="back btn" width={44} height={44} />
                        Back
                    </button>
                )}
                {showProceed && (
                    <button
                        onClick={handleProceed}
                        className="flex items-center gap-4 font-semibold text-sm leading-4 tracking-tight uppercase ml-4 mt-4"
                    >
                        Proceed
                        <Image src="/buttin-icon-proceed.svg" alt="back btn" width={44} height={44} />
                    </button>
                )}
            </div>

        </div>
        // <div className='relative h-full flex flex-col flex-1 pt-16'>
        //     <div className="font-semibold text-base leading-6 tracking-tight uppercase">To start analysis</div>
        //     <Image className='m-auto' src="/rombuses.svg" alt="rombus" width={500} height={500} />
        //     <div className="max-w-[360px] flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
        //         <label htmlFor="name" className='font-normal text-sm leading-6 uppercase text-gray-500'>Click to type</label>
        //         <input
        //             type="text"
        //             id="name"
        //             placeholder="Introduce Yourself"
        //             className="w-full border-b border-black text-5xl leading-tight tracking-tighter text-center"
        //         />
        //     </div>
        //     <Link href={'/'} className='flex items-center gap-4 font-semibold text-sm leading-4 tracking-tight uppercase'>
        //         <Image src="/buttin-icon-shrunk.svg" alt="back btn" width={44} height={44} />
        //         Back
        //     </Link>

        // </div>
    );
}

