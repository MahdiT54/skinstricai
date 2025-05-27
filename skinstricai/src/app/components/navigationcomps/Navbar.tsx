import Link from 'next/link';
import React from 'react';

interface NavbarProps {
    onClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onClose }) => {
    return (
        <nav className='h-16 flex justify-center fixed w-full px-8 z-50'>
            <div className='flex justify-between items-center w-full'>
                <div className="text-sm top-4 left-4 flex items-center space-x-2 font-medium">
                    {/* <span className="font-bold">SKINSTRIC</span> */}
                    <Link onClick={onClose} href='/' className='font-bold'>SKINSTRIC</Link>
                    <span className="ml-6 text-gray-500">[ INTRO ]</span>
                </div>
                <button className="text-sm w-23 h-8 bg-black text-white text-xs">
                    ENTER CODE
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
