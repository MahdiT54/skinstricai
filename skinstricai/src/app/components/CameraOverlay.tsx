import Image from 'next/image';
import React from 'react';

interface CameraOverlayProps {
    cameraAllowed: boolean;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    onClose: () => void; // callback close overlay
}

const CameraOverlay: React.FC<CameraOverlayProps> = ({ cameraAllowed, videoRef, onClose }) => {
    const handleCapture = () => {
        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const base64Image = canvas.toDataURL("image/jpeg").split(',')[1]; // strip the "data:image/jpeg;base64," prefix

            // now send base64Image to the level 2 API
            fetch('https://us-centrall-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Image: base64Image }),
            })
                .then(res => res.json())
                .then(data => {
                    console.log("API Response:", data);
                    // Navigate or update UI based on response
                })
                .catch(err => console.error("API Error:", err));
        }
    }

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
                className='z-100 left-10 bottom-10 absolute flex items-center gap-4 font-semibold text-sm leading-4 tracking-tight uppercase ml-4 mt-4'
            >
                <Image src="/buttin-icon-shrunk.svg" alt="back btn" width={44} height={44} />
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
                <div className="bg-gray-700 text-white rounded-full px-4 py-2 flex space-x-2">
                    <button className="text-sm">OFF</button>
                    <button className="text-sm">3S</button>
                    <button className="text-sm">10S</button>
                </div>
            </div>

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