import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
export default function MyGigs() {
    const navigate = useNavigate();
    const [gigs,setgigs]=useState([]);
    const getUserGigs=async()=>{
        const response=await fetch("http://localhost:8000/api/getusergigs",{
            method:"GET",
            credentials:"include"
        });
        const data=await response.json();
        console.log(data);
        if(data.status=="ok") setgigs(data.gigs);
        else{
            toast.error(data.error);
            if(data.error=='Session Expired') navigate("/login")
        }
    }
    useEffect(()=>{
        getUserGigs();
    },[])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
            <p className="text-center text-4xl m-5">My Gigs : </p>
            <button className="absolute right-2 top-2 bg-black text-white px-5 py-2" onClick={() => navigate("/gig")}>New Gig</button>
            <div className="w-full max-w-sm bg-white p-6 rounded-md border space-y-5">
                {gigs.map((data, idx) => (
                    (
                        <div key={idx}>
                            <div className="border border-black py-4 px-3 space-y-2">
                                <div className="flex justify-between">
                                    <p className="font-bold text-lg">{data.title}</p>
                                    {data.status == "open" && <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 inset-ring inset-ring-red-500/20">{data.status}</span>}
                                    {data.status == "assigned" && <span className="inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500 inset-ring inset-ring-red-500/20">{data.status}</span>}
                                    {data.status == "hired" && <span className="inline-flex items-center rounded-md bg-blue-800/10 px-2 py-1 text-xs font-medium text-blue-800 inset-ring inset-ring-red-500/20">{data.status}</span>}

                                </div>
                                <div className="flex gap-1">
                                    <p className="text-sm font-thin">From : </p>
                                    <p className="text-sm font-thin">{data.postedBy}</p>
                                </div>
                                <p className="text-base font-light">{data.description}</p>
                                <div>

                                </div>
                                <div className="flex">
                                    <p className="text-sm font-semibold">Budget : ₹</p>
                                    <p className="text-sm font-semibold"> {data.budget}</p>
                                </div>
                            </div>
                        </div>



                    )
                ))}
            </div>
        </div>
    )
}