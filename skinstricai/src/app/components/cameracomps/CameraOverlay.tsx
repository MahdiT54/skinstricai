import Image from 'next/image';
import React, { useState } from 'react';

interface CameraOverlayProps {
    cameraAllowed: boolean;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    onClose: () => void; // callback close overlay
}

const CameraOverlay: React.FC<CameraOverlayProps> = ({ cameraAllowed, videoRef, onClose }) => {
    const [timer, setTimer] = useState<number | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);

    const handleTimerSelect = (value: number | null) => {
        setTimer(value);
        setCountdown(null);
    }

    const handleCapture = async () => {
        if (timer && timer > 0) {
            setCountdown(timer);
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === null || prev <= 1) {
                        clearInterval(interval);
                        captureImage();
                        return null;
                    }
                    return prev - 1;
                })
            }, 1000); // countdown every second
        } else {
            captureImage();
        }
    }

    const captureImage = async () => {
        const video = videoRef.current;
        if (!video) {
            alert("No video stream available.");
            return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            alert("Canvas context unavailable.");
            return;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const fullBase64Image = canvas.toDataURL("image/jpeg"); // keep the prefix
        const base64Payload = fullBase64Image.replace(/^data:image\/jpeg;base64,/, ""); // Remove prefix

        if (!base64Payload) {
            alert("Failed to capture valid image.");
            return;
        }

        try {
            const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Payload // send with prefix
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`API Error: ${errorData.message || "Unknown error occurred."}`);
                return;
            }

            const result = await response.json();
            console.log("API Response:", result);

        } catch (error) {
            console.error("Network error:", error);
            alert("Failed to send image to the server.");
        }
    };




    if (!cameraAllowed) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <video
                ref={videoRef}
                className="w-full h-full object-cover z-10"
                autoPlay
                playsInline
            />

            <button
                onClick={onClose}
                className='text-white z-100 left-10 bottom-10 absolute flex items-center gap-4 font-semibold text-sm leading-4 tracking-tight uppercase ml-4 mt-4'
            >
                <Image src="/buttin-icon-shrunk-white.svg" alt="back btn" width={44} height={44} />
                Back
            </button>

            {/* Ellipse Overlay */}
            <div className="absolute z-20 w-[499px] h-[616px] border-2 border-white rounded-full" />

            {/* Instruction Text */}
            <p className="absolute top-[25%] text-sm text-white z-20">
                PLACE YOUR HEAD IN AN ELLIPSE
            </p>

            {/* Bottom Guidelines */}
            <div className="absolute bottom-10 text-xs text-white z-20 flex flex-col items-center space-y-1">
                <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
                <div className="flex space-x-4">
                    <span>◇ NEUTRAL EXPRESSION</span>
                    <span>◇ FRONTAL POSE</span>
                    <span>◇ ADEQUATE LIGHTING</span>
                </div>
            </div>

            {/* Timer Selector (static UI for now) */}
            <div className="absolute left-10 z-20">
                <div className="bg-gray-700 text-white rounded-full px-3 py-2 flex space-x-2">
                    <button
                        className={`text-sm ${timer === null ? 'bg-white text-black rounded-full p-1' : ''}`}
                        onClick={() => handleTimerSelect(null)}
                    >
                        OFF
                    </button>
                    <button
                        className={`text-sm ${timer === 3 ? 'bg-white text-black rounded-full p-1' : ''}`}
                        onClick={() => handleTimerSelect(3)}
                    >
                        3S
                    </button>
                    <button
                        className={`text-sm ${timer === 10 ? 'bg-white text-black rounded-full p-1' : ''}`}
                        onClick={() => handleTimerSelect(10)}
                    >
                        10S
                    </button>
                </div>
            </div>

            {countdown !== null && (
                <div className="absolute top-10 text-white text-2xl z-50">
                    {countdown}s
                </div>
            )}

            {/* Take Picture Button */}
            <div className='absolute flex items-center right-10 z-20'>
                <span className='mr-5 uppercase text-white text-sm'>Take picture</span>

                <button className="text-white border border-white rounded-full w-12 h-12 flex items-center justify-center" onClick={handleCapture}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h4l2-3h6l2 3h4v13H3V8z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CameraOverlay;