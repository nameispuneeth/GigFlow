import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilePlus, HandCoins } from "lucide-react";
import { toast } from "react-toastify";

const HomePage = () => {
  
  const navigate = useNavigate();
  const [name,setname]=useState("Guest");
  const [isloggedIn,setisLoggedIn]=useState(false);
  let findUserDet=async()=>{
    const response=await fetch(`${import.meta.env.VITE_APP_API_BACKEND_URL}/api/getuserdet`,{
      method:"GET",
      credentials:"include"
    });
    const data=await response.json();
    console.log(data)
    if(data.status="ok"){
      setname(data.name);
      setisLoggedIn(true);
    }
    else{
      toast.error(data.error);
      if(data.error=="Session Expired") navigate("/login")
    }
  }
  useEffect(()=>{
    findUserDet();
  },[])

  const handleLogOut=async()=>{
    const response=await fetch(`${import.meta.env.VITE_APP_API_BACKEND_URL}/api/logout`,{
      method:"GET",
      credentials:"include"
    });
   
    setisLoggedIn(false);
    setname("Guest");
  }

  const cards = [
    {
      title: "Create a New Gig",
      description: "Post a new freelance gig with clear requirements, budget, and deadlines to attract the right talent.",
      icon: <FilePlus size={48} />,
      bg: "bg-gradient-to-br from-blue-400 to-blue-700",
      navigateTo: "/gig",
      iconColor: "text-white",
      darkIconColor: "text-white",
    },
    {
      title: "Browse & Bid on Gigs",
      description: "Explore available gigs, place competitive bids, and track the status of your proposals in one place.",
      icon: <HandCoins size={48} />,
      bg: "bg-gradient-to-br from-green-400 to-green-600",
      navigateTo: "/bid",
      iconColor: "text-white",
      darkIconColor: "text-white",
    },
  ];
  

  return (
    <div className={` min-h-screen relative flex flex-col items-center py-8 px-4 sm:px-6`}>
      <div className="max-w-3xl text-center mb-12 mt-[150px]">
        <h1 className={`text-3xl sm:text-5xl font-bold mb-4 font-sora text-gray-900`}>
          Welcome Back, {name}!
        </h1>
      </div>
      {!isloggedIn ? <button className="absolute top-2 left-2 bg-black p-2 text-white rounded-lg font-bold px-4 py-1 " onClick={()=>navigate("/login")}>Login</button> : <button className="absolute rounded-lg font-bold px-4 py-1 top-2 left-2 bg-red-600 p-2 text-white" onClick={()=>handleLogOut()}>LogOut</button>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={()=>navigate(card.navigateTo)}
            className={`flex flex-col items-center justify-center p-8 cursor-pointer rounded-2xl shadow-xl transform transition-transform hover:-translate-y-2 hover:shadow-2xl border border-gray-200 ${card.bg}`}
          >
            <div className="mb-4 text-white">{card.icon}</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white font-sora">{card.title}</h2>
            <p className="text-center text-sm sm:text-base text-white font-inter">{card.description}</p>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default HomePage;
