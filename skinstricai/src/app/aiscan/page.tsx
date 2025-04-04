'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export default function Page() {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [cameraAllowed, setCameraAllowed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleBack = () => {
        router.push('/testing?step=2');
    }

    const handleLeftImageClick = () => {
        setShowPopup(true);
    };

    const handleAllow = () => {
        setShowPopup(false);
        setCameraAllowed(true);
    };

    const handleDeny = () => {
        setShowPopup(false);
        console.log('Camera access denied');
    };

    useEffect(() => {
        const setupCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    console.log('Camera stream set to video element');
                }
            } catch (error) {
                console.error('Failed to access camera:', error);
            }
        };

        if (cameraAllowed) {
            setupCamera();
        }
    }, [cameraAllowed]);

    return (
        <div className='relative h-full flex flex-col flex-1 pt-16'>
            <div className="font-semibold text-base leading-6 tracking-tight uppercase">
                To start analysis
            </div>
            <div className='w-full flex m-auto justify-around'>
                <Image className='transition-transform duration-300 ease-in-out transform hover:scale-90' src="/aiscan-left.svg" alt="screencast" width={400} height={400} onClick={handleLeftImageClick} />
                <Image src="/aiscan-right.svg" alt="gallerycast" width={400} height={400} />
            </div>
            <div className='gap-3 flex flex-col items-center absolute top-2/3 left-1/2 -translate-x-1/2'>
                <Image src="/picform-middleicon.svg" alt="middle icon" width={100} height={100} />
                <span className='text-neutral-900 uppercase font-normal text-[12px] leading-[16px] tracking-[0%] text-center'>select preferred way</span>
            </div>

            <button
                onClick={handleBack}
                className='flex items-center gap-4 font-semibold text-sm leading-4 tracking-tight uppercase ml-4 mt-4'
            >
                <Image src="/buttin-icon-shrunk.svg" alt="back btn" width={44} height={44} />
                Back
            </button>

            {showPopup && (
                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-80 h-32 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-black text-white rounded-sm shadow-lg flex flex-col">
                        <div className="px-6 py-6 text-sm font-semibold text-center border-b border-gray-700">
                            ALLOW A.I. TO ACCESS YOUR CAMERA
                        </div>
                        <div className="flex border-t border-gray-700">
                            <button
                                onClick={handleDeny}
                                className="w-1/2 px-4 py-3 text-xs tracking-wide uppercase text-white hover:bg-neutral-800 border-r border-gray-700"
                            >
                                Deny
                            </button>
                            <button
                                onClick={handleAllow}
                                className="w-1/2 px-4 py-3 text-xs tracking-wide uppercase text-white hover:bg-neutral-800"
                            >
                                Allow
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {cameraAllowed && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover z-10 bg-red-500"
                        autoPlay
                        playsInline
                    />
                </div>
            )}
        </div>
    )
}
