// components/LoadingScreen.tsx
import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="z-100 fixed inset-0 flex items-center justify-center bg-red bg-opacity-75">
            <p className="text-white text-lg font-semibold">Setting up camera...</p>
        </div>
    );
};

export default LoadingScreen;