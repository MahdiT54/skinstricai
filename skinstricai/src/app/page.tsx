import Link from 'next/link';
// import Button from './components/Button';

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      
      {/* Centered Text */}
      <div className="text-center">
        <h1 className="text-5xl font-semibold leading-[.945]">
          <span className="text-[86px] font-normal tracking-[-.07em]">Sophisticated</span> <br />
          <span className="text-[86px] font-normal tracking-[-.07em]">skincare</span>
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
