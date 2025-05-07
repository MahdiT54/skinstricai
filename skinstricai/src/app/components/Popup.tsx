// components/Popup.tsx
import React from 'react';

interface PopupProps {
    onAllow: () => void;
    onDeny: () => void;
}

// const Popup: React.FC<PopupProps> = ({ onAllow, onDeny }) => {
    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-80 h-32 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-black text-white rounded-sm shadow-lg flex flex-col">
                <div className="px-6 py-6 text-sm font-semibold text-center border-b border-gray-700">
                    ALLOW A.I. TO ACCESS YOUR CAMERA
                </div>
                <div className="flex border-t border-gray-700">
                    <button
                        onClick={onDeny}
                        className="w-1/2 px-4 py-3 text-xs tracking-wide uppercase text-white hover:cursor-pointer hover:bg-neutral-800 border-r border-gray-700"
                    >
                        Deny
                    </button>
                    <button
                        onClick={onAllow}
                        className="w-1/2 px-4 py-3 text-xs tracking-wide uppercase text-white hover:cursor-pointer hover:bg-neutral-800"
                    >
                        Allow
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;