import Link from 'next/link';
import Button from './components/Button';

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white text-black">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 text-sm font-medium">
        <span className="font-bold">SKINSTRIC</span>
        <span className="text-gray-500">[ INTRO ]</span>
      </div>
      <button className="absolute top-4 right-4 px-4 py-2 text-sm font-semibold bg-black text-white rounded hover:opacity-80">
        ENTER CODE
      </button>
      
      {/* Centered Text */}
      <div className="text-center">
        <h1 className="text-5xl font-semibold leading-tight">
          <span className="border-b-2 border-blue-500">Sophisticated</span> <br />
          <span className="border-b-2 border-blue-500">skincare</span>
        </h1>
      </div>
      
      {/* Side Navigation */}
      <div className="absolute left-4 bottom-4 flex flex-col items-start">
        <Link href="#" className="flex items-center space-x-2 text-sm font-medium hover:underline">
          <span className="border border-black rounded-full p-1">⬦</span>
          <span>DISCOVER A.I.</span>
        </Link>
      </div>
      
      <div className="absolute right-4 bottom-4 flex flex-col items-end">
        <Link href="#" className="flex items-center space-x-2 text-sm font-medium hover:underline">
          <span>TAKE TEST</span>
          <span className="border border-black rounded-full p-1">➡</span>
        </Link>
      </div>
      
      {/* Footer Text */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-500 max-w-xs">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
      </div>
    </div>
  );
}
