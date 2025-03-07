type ButtonProps = {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    return <button className="px-4 py-2 bg-blue-600 text-white rounded">{text}</button>
}