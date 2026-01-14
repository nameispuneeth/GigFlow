import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyGigs from "./MyGigs";
import { House } from "lucide-react";

export default function AssignGig({ gig }) {
    const [bids, setbids] = useState([]);
    const navigate = useNavigate();
    const findBids = async () => {
        const response = await fetch(`http://localhost:8000/api/bids/${gig._id}`, {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json();
        if (data.status == "ok") setbids(data.bids);
        else {
            toast.error(data.error);
            if (data.error == "Session Expired") navigate("/login")
        }
    }
    useEffect(() => {
        findBids();
    }, [])
    const handleSubmit=async(val)=>{
        const response=await fetch(`http://localhost:8000/api/${val._id}/hire`,{
            method:"PATCH",
            credentials:"include"
        })
        const temp=await response.json();
        console.log(temp);
        if(temp.status=="ok"){
            toast.success("Gig Assigned Succesfully");
            <MyGigs/>
        }else{
            toast.error(temp.error);
            if(temp.error=="Session Expired") navigate("/login");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="absolute left-2 top-2 m-2 p-2 border-2 border-black rounded-full cursor-pointer">
                <House size={20} onClick={()=>navigate("/")}/>
            </div>
            <div className="bg-white px-10 py-5 space-y-5 text-center">
                <p className="text-2xl">Bids For {gig.title}</p>
                <div className="space-y-5 text-left mr-4">
                    {bids.length==0 ? <p className="text-center text-3xl p-10">No Bids Found</p> : <>
                        {bids.map((val, idx) => (
                        <div
                        key={idx}
                        className="border border-gray-700 space-y-3 px-5 py-3  overflow-hidden"
                      >
                        <div className="space-y-2">
                          <div className="flex gap-2 flex-wrap">
                            <p className="font-semibold shrink-0">Email :</p>
                            <p className="font-normal break-all whitespace-normal">
                              {val.email || "anonymous"}
                            </p>
                          </div>
                      
                          <div className="flex gap-2 flex-wrap">
                            <p className="font-semibold shrink-0">Message :</p>
                            <p className="font-normal break-words whitespace-normal">
                              {val.message}
                            </p>
                          </div>
                      
                          <div className="flex gap-2 flex-wrap">
                            <p className="font-semibold shrink-0">Price :</p>
                            <p className="font-normal break-all whitespace-normal">
                              ₹{val.price}
                            </p>
                          </div>
                        </div>
                      
                       <button className="bg-black text-white px-7 py-1" onClick={()=>handleSubmit(val)}> Assign Bid </button>
                      </div>
                    ))}
                    </>}
                </div>
            </div>
        </div>
    )
}