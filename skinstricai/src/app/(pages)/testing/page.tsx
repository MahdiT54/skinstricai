'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function Page() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    // const [error, setError] = useState(''); // tracking validation errors
    const [isValid, setIsValid] = useState(false); // tracking form validity
    const [showConfirmModal, setShowConfirmModal] = useState(false);
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
        } else {
            localStorage.setItem('name', name);
            localStorage.setItem('city', city);
            console.log('Form submitted:', { name, city });
            alert('form submitted successfully!')
        }
    }

    const handleBack = () => {
        if (currentStep === 1) {
            setShowConfirmModal(true);
        } else {
            setCurrentStep(1);
            router.push('/testing?step=1');
        }
    }
    // confirmquit is for the modal that appears when the user tries to go back from the first step
    const confirmQuit = () => {
        setShowConfirmModal(false);
        router.push('/');
    }

    return (
        <div className='relative h-full flex flex-col flex-1 pt-16'>


            {showConfirmModal ? (
                // <div className="w-80 h-32 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="w-80 h-32 bg-black text-white rounded-sm shadow-lg flex flex-col">
                        <div className="px-6 py-6 text-sm text-left uppercase font-semibold text-center border-b border-gray-700">
                        You are about to leave the analysis. <br />
                        Are you sure?
                        </div>
                        <div className="flex border-t border-gray-700">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="w-1/2 px-4 py-3 text-xs tracking-wide uppercase text-white hover:cursor-pointer hover:bg-neutral-800 border-r border-gray-700"
                            >
                                Stay
                            </button>
                            <button
                                onClick={confirmQuit}
                                className="w-1/2 px-4 py-3 text-xs tracking-wide uppercase text-white hover:cursor-pointer hover:bg-neutral-800"
                            >
                                Leave
                            </button>
                        </div>
                    </div>
                // </div>
            ) : (
                <div className="font-semibold text-base leading-6 tracking-tight uppercase">
                    To start analysis
                </div>
            )}

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

