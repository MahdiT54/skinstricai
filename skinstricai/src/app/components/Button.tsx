type ButtonProps = {
    text: string;
} 
// remember since we're using typescript we need to define the type of the props that the component will receive

export default function Button({ text }: ButtonProps) {
    return <button className="px-4 py-2 bg-blue-600 text-white rounded">{text}</button>
}
