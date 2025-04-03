export default function StepOne({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    return (
        <>
            <label htmlFor="name" className="font-normal text-sm leading-6 uppercase text-gray-500">Click to type</label>
            <input
                type="text"
                id="name"
                placeholder="Introduce Yourself"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="outline-none w-full border-b border-black text-5xl leading-tight tracking-tighter text-center"
            />
        </>
    );
}