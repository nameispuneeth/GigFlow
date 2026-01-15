import { useState,useContext, useEffect } from "react";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import { House } from "lucide-react";
import { AuthContext } from "../authContext/AuthProvider";

export default function Gig() {
    
    const {isLoggedIn,setIsLoggedIn,authLoading}=useContext(AuthContext);
    const [budget,setBudget]=useState(0);  
    const [title,settitle]=useState("");
    const [desc,setdesc]=useState("");
    const [loading,setloading]=useState(false);
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        if(title==""){
            toast.error("Title Is Required");
            return;
        }else if(desc==""){
            toast.error("Description Is Required");
            return;
        }
        const response=await fetch(`${import.meta.env.VITE_APP_API_BACKEND_URL}/api/gigs`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                title,desc,budget
            })
        })
        const data=await response.json();
        setloading(false);
        if(data.status=="error"){
            toast.error(data.error);
            navigate("/login");
            if(data.error=="Session Expired") setIsLoggedIn(false);
        }else{
            toast.success("Gig Sent Succesfully");
            settitle("");
            setdesc("");
            setBudget(0);
        }
    }

    useEffect(()=>{
        if(!authLoading && !isLoggedIn){
            toast.error("Login Required");
            navigate("/login");
        }
    },[])
    const spinner = () => {
        return (
          <span className="w-4 h-4 border-2 border-white border-t-transparent p-2.5 rounded-full animate-spin"></span>
        )
      }
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="absolute left-2 top-2 m-2 p-2 border-2 border-black rounded-full cursor-pointer">
                <House size={20} onClick={()=>navigate("/")}/>
            </div>
            <button className="absolute right-2 top-2 bg-black text-white px-5 py-2" onClick={() => navigate("/mygigs")}>My Gigs</button>

            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-md border space-y-5">
                <p className="text-4xl font-bold text-center mb-6">Post Job</p>
                <input
                    type="text"
                    placeholder="Title"
                    required={true}
                    value={title}
                    className="w-full mb-3 px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
                    onChange={(e) => settitle(e.target.value)}
                />
                <textarea cols={3} rows={3} value={desc} required={true} onChange={(e)=>setdesc(e.target.value)} placeholder="Description" className="w-full mb-3 px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"></textarea>
                <div className="w-full mb-3 px-3 py-2 flex gap-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
                >
                    <p className="text-bold text-lg">₹</p>
                    <input
                        type="number"
                        placeholder="Budget"
                        required={true}
                        value={budget}
                        className="w-full focus:outline-none"
                        onChange={(e) =>{
                            if(e.target.value>=0) setBudget(e.target.value)
                        }}
                    />
                </div>
                <button className="bg-black text-white px-7 w-full py-2 rounded hover:bg-gray-800 transition flex items-center justify-center">
                    {loading ? spinner() : "Post Job"}
                </button>
            </form>
        </div>
    )
}