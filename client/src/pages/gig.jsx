export default function Gig() {
    const handleSubmit = () => {
        return;
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <form onSubmit={handleSubmit()} className="w-full max-w-sm bg-white p-6 rounded-md border space-y-5">
                <p className="text-4xl font-bold text-center mb-6">Post Job</p>
                <input
                    type="text"
                    placeholder="Title"
                    required={true}
                    className="w-full mb-3 px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
                    onChange={(e) => setText(e.target.value)}
                />
                <textarea cols={3} rows={3} placeholder="Description" className="w-full mb-3 px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"></textarea>
                <div className="w-full mb-3 px-3 py-2 flex gap-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
                >
                    <p className="text-bold text-lg">₹</p>
                    <input
                        type="number"
                        placeholder="Budget"
                        required={true}
                        className="w-full focus:outline-none"
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </div>
                <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                    Post Job
                </button>
            </form>
        </div>
    )
}