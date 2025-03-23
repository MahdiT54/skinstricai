'use client'
import Image from 'next/image';
import React from 'react';
// import { useState } from 'react';

export default function Page() {
    return (
        <div className='relative h-full flex flex-col flex-1 pt-16'>
            <div className="font-semibold text-base leading-6 tracking-tight uppercase">To start analysis</div>
            <Image className='m-auto' src="/rombuses.svg" alt="rombus" width={500} height={500} />
            <div className="absolute top-1/2 left-1/4">
                <label htmlFor="name">Click to type</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Introduce Yourself"
                    className="text-4xl font-light text-center border-b-2 border-black outline-none focus:border-blue-500 transition-all"
                />
            </div>
        </div>
    );
}

