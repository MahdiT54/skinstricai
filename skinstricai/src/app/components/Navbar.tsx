import React from 'react';

const Navbar = () => {
    return (

        <nav className='h-16 flex justify-center fixed w-full px-8'>
            <div className='flex justify-between items-center max-w-[1600px] w-full'>
                <div className="text-[10px] top-4 left-4 flex items-center space-x-2 font-medium">
                    <span className="font-bold">SKINSTRIC</span>
                    <span className="ml-6 text-gray-500">[ INTRO ]</span>
                </div>
                <button className="text-[10px] w-23 h-8 bg-black text-white text-xs">
                    ENTER CODE
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
