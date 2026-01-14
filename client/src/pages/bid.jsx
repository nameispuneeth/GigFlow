import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
export default function Bid() {
    const navigate = useNavigate();
    const [gigs, setgigs] = useState([]);

    const getAllGigs = async () => {
        const response = await fetch("http://localhost:8000/api/gigs", {
            method: "GET"
        });
        const data = await response.json();
        if (data.status == "ok") setgigs(data.gigs);
        else {
            toast.error(data.error);
            if (data.error == "Session Expired") {
                navigate("/login");
            }
        }
    }
    useEffect(() => {
        getAllGigs();
    }, [])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
            <p className="text-center text-4xl m-5">Open Bids : </p>
            <button className="absolute right-2 top-2 bg-black text-white px-5 py-2" onClick={() => navigate("/mybids")}>My Bids</button>
            <div className="w-full max-w-sm bg-white p-6 rounded-md border space-y-5">
                {gigs.map((data, idx) => (
                    (
                        <div key={idx}>
                            {data.status == "open" &&
                                <div className="border border-black py-4 px-3 space-y-3">
                                    <div className="flex justify-between">
                                        <p className="font-bold text-lg">{data.title}</p>
                                        {data.status == "open" && <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 inset-ring inset-ring-red-500/20">{data.status}</span>}
                                    </div>
                                    <div className="flex gap-1">
                                        <p className="text-sm font-extralight">From : </p>
                                        <p className="text-sm font-extralight">{data.postedBy}</p>
                                    </div>
                                    <p className="text-base font-extralight">{data.description}</p>
                                    <div className="flex">
                                        <p className="">Budget : ₹</p>
                                        <p className="font-medium"> {data.budget}</p>
                                    </div>
                                    <button className="items-center bg-black text-white px-7 py-1">Bid</button>
                                </div>
                            }
                        </div>



                    )
                ))}
            </div>
        </div>
    )
}