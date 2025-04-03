'use client'
import Image from 'next/image';
import React, { useState } from 'react';

export default function Page() {
    const [step, setStep] = useState(2);

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }


    return (
        <div className='relative h-full flex flex-col flex-1 pt-16'>
            <div className="font-semibold text-base leading-6 tracking-tight uppercase">
                To start analysis
            </div>
            <div className='w-full flex m-auto justify-around'>
                <Image className='relative' src="/aiscan-left.svg" alt="screencast" width={400} height={400} />
                <Image src="/aiscan-right.svg" alt="gallerycast" width={400} height={400} />
            </div>
            <div className='gap-3 flex flex-col items-center absolute top-2/3 left-1/2 -translate-x-1/2'>
                <Image src={"/picform-middleicon.svg"} alt="middle icon" width={100} height={100} />
                <span className='text-neutral-900 uppercase font-normal text-[12px] leading-[16px] tracking-[0%] text-center'>select preferred way</span>
            </div>
            <button
                onClick={handleBack}
                className='flex items-center gap-4 font-semibold text-sm leading-4 tracking-tight uppercase ml-4 mt-4'
            >
                <Image src="/buttin-icon-shrunk.svg" alt="back btn" width={44} height={44} />
                Back
            </button>
        </div>
    )
}