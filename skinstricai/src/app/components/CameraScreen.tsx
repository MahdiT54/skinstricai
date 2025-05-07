// components/CameraScreen.tsx
import React, { RefObject } from 'react';

interface CameraScreenProps {
    videoRef: RefObject<HTMLVideoElement>;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ videoRef }) => {
    return (
        <div className="z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <video
                ref={videoRef}
                className="w-full h-full object-cover z-10"
                autoPlay
                playsInline
            />
        </div>
    );
};

export default CameraScreen;