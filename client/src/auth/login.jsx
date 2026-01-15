import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";

export default function Login() {
  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext);
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response=await fetch(`${import.meta.env.VITE_APP_API_BACKEND_URL}/api/auth/login`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      credentials:"include",
      body:JSON.stringify({
        email:email,
        password:password
      })
    });
    const data=await response.json();
    if(data.status=="ok"){
      setIsLoggedIn(true);
      toast.success("Login Successful");
      navigate("/bid");
    }
    else toast.error(data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-md border space-y-5"
      >
        <h1 className="text-4xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          required={true}
          className="w-full mb-3 px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required={true}
          className="w-full mb-4 px-3 py-2 border  border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
