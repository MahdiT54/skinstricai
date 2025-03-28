'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// import { useRouter } from 'next/navigation';


export default function Page() {

    return (
        <div className='relative h-full flex flex-col flex-1 pt-16'>
            <div className="font-semibold text-base leading-6 tracking-tight uppercase">To start analysis</div>
            <Image className='m-auto' src="/rombuses.svg" alt="rombus" width={500} height={500} />
            <div className="max-w-[360px] flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
                <label htmlFor="name" className='font-normal text-sm leading-6 uppercase text-gray-500'>Click to type</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Introduce Yourself"
                    className="w-full border-b border-black text-5xl leading-tight tracking-tighter text-center"
                />
            </div>
            <Link href={'/'} className='flex items-center gap-4 font-semibold text-sm leading-4 tracking-tight uppercase'>
                <Image src="/buttin-icon-shrunk.svg" alt="back btn" width={44} height={44}/>
                Back
            </Link>
            
        </div>
    );
}

