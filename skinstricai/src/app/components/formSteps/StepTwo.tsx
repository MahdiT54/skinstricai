export default function StepTwo({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    return (
        <>
            <label htmlFor="location" className='font-normal text-sm leading-6 uppercase text-gray-500'>Where are you from?</label>
            <input
                type="text"
                id="location"
                placeholder="Your Location"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="outline-none w-full border-b border-black text-5xl leading-tight tracking-tighter text-center"
            />
        </>
    )
}