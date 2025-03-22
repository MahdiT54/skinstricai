// import Link from 'next/link';
// import Button from './components/Button';

export default function Home() {
  return (
    <div className='relative h-full flex flex-1 flex-col'>
      <div className='contents'> {/* page wrapper */}
        <h1 className='m-auto text-center'> {/* title coontainer */}
          <span>Sophisticated</span>
          <span>skincare</span>
        </h1>
        <p>Skinstric developed an A.I. that creates a highly-personalised routine tailored to what your skin needs</p> {/* subtitle container */}
      </div>
      <div className='absolute top-1/2 left-0'>Discover A.I.</div> {/* left-surv */}
      <div className='absolute top-1/2 right-0'>Take Test</div> {/* right-surv */}
    </div>
  );
}
