import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { House } from "lucide-react";

export default function MyBids() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const getUserBids = async () => {
        const response = await fetch(`${import.meta.env.VITE_APP_API_BACKEND_URL}/api/getuserbids`, {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json();
        console.log(data);
        if (data.status == "ok") setData(data.bids);
        else {
            toast.error(data.error);
            if (data.error == "Session Expired") navigate("/login");
        }
    }
    useEffect(() => {
        getUserBids();
    }, [])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
            <p className="text-center text-4xl m-5">My Bids : </p>
            <div className="absolute left-2 top-2 m-2 p-2 border-2 border-black rounded-full cursor-pointer">
                <House size={20} onClick={()=>navigate("/")}/>
            </div>
            <button className="absolute right-2 top-2 bg-black text-white px-5 py-2" onClick={() => navigate("/bid")}>All Bids</button>
            <div className="w-full max-w-sm bg-white p-6 rounded-md border space-y-5 mb-10">
                {data.length == 0 ? <p className="text-center text-3xl px-6 py-10">No bids placed so far</p> : <>
                    {data.map((data, idx) => (
                        (
                            <div key={idx}>
                                <div className="border border-black py-4 px-3 space-y-2">
                                    <div className="flex justify-between">
                                        <p className="font-bold text-lg">{data.gig.title}</p>
                                        {data.gig.status == "open" && <span className="inline-flex items-center rounded-md bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-red-500/20">Pending</span>}
                                        {data.gig.status == "assigned" && data.assigned && <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 inset-ring inset-ring-green-500/20">Hired</span>}
                                        {data.gig.status == "assigned" && !data.assigned && <span className="inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500 inset-ring inset-ring-red-500/20">Rejected</span>}

                                    </div>
                                    <div className="flex gap-1">
                                        <p className="text-sm font-thin">From : </p>
                                        <p className="text-sm font-thin">{data.gig.postedBy}</p>
                                    </div>
                                    <p className="text-base font-light">{data.gig.description}</p>
                                    <div>

                                    </div>
                                    <div className="flex">
                                        <p className="text-sm font-semibold">Budget : ₹</p>
                                        <p className="text-sm font-semibold"> {data.gig.budget}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-sm font-semibold">Your Price : ₹</p>
                                        <p className="text-sm font-semibold"> {data.price}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="text-sm font-medium">Your Message : </p>
                                        <p className="text-sm font-normal"> {data.message}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}

                </>}
            </div>
        </div>
    )
}