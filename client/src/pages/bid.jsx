import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import Swal from "sweetalert2"
import { House } from "lucide-react";
import { AuthContext } from "../authContext/AuthContext";
export default function Bid() {

    const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext);
    const navigate = useNavigate();
    const [gigs, setgigs] = useState([]);

    const getAllGigs = async () => {
        const response = await fetch(`${import.meta.env.VITE_APP_API_BACKEND_URL}/api/gigs`, {
            method: "GET",
            credentials: "include"
        });
        const data = await response.json();
        if (data.status == "ok") setgigs(data.gigs);
        else {
            toast.error(data.error);
            if (data.error == "Session Expired") {
                setIsLoggedIn(false);                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                navigate("/login");
            }
        }
    }
    useEffect(() => {
        if(!isLoggedIn){
            toast.error("Login Required");
            navigate("/login");
        }
        getAllGigs();
    }, [])

    const handleBid = async (data) => {
        let res = await Swal.fire({
            title: `Bidding ${data.title}`,
            html: `
                <p class="text-lg font-semibold">Your Message : </p>
                <textarea id="swal-textarea" class="swal2-textarea" placeholder="Enter description"></textarea>
                <p class="text-lg font-semibold">Your Price : </p>
                <input id="swal-number" type="number" class="swal2-input" placeholder="Enter budget">
            `,
            showCancelButton: true,
            confirmButtonText: "Submit Bid",
            confirmButtonColor: "black",
            text: "white",
            preConfirm: () => {
                const message = document.getElementById("swal-textarea").value;
                const price = document.getElementById("swal-number").value;

                if (!message || !price) {
                    Swal.showValidationMessage("All fields are required");
                    return false;
                }
                else if (price < 0) {
                    Swal.showValidationMessage("Price Can't Be Negative");
                    return false;
                }

                return { message, price };
            },
        });

        const { message, price } = res.value;
        const response = await fetch(`${import.meta.env.VITE_APP_API_BACKEND_URL}/api/bids`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: data._id,
                message: message,
                price: price
            })
        });
        const bdata = await response.json();
        if (bdata.status == "ok") {
            toast.success("Your bid sent successfully")
        } else {
            toast.error(bdata.error);
            if (bdata.error == "Session Expired"){
                setIsLoggedIn(false);
                navigate("/login");
            }
        }

    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
            <div className="absolute left-2 top-2 m-2 p-2 border-2 border-black rounded-full cursor-pointer">
                <House size={20} onClick={()=>navigate("/")}/>
            </div>
            <p className="text-center text-4xl m-5">Open Bids : </p>
            <button className="absolute right-2 top-2 bg-black text-white px-5 py-2" onClick={() => navigate("/mybids")}>My Bids</button>
            <div className="w-full max-w-sm bg-white p-6 rounded-md border space-y-5">
                {gigs.length == 0 ? <p className="text-center text-3xl p-10">No Gigs Found</p> : <>
                    {gigs.map((data, idx) => (
                        (
                            <div key={idx}>
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
                                    <button className="items-center bg-black text-white px-7 py-1" onClick={() => handleBid(data)}>Bid</button>
                                </div>
                            </div>
                        )
                    ))}
                </>
                }
            </div>
        </div>
    )
}