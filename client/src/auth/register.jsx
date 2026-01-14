import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [name,setName]=useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const handleSubmit = async(e) => {
    if(password!=repassword){
      toast.error("Passwords Doesn't Match");
      return;
    } 
    if(password.length<6){
      toast.error("Passwords is To Small");
      return;
    }
    e.preventDefault();
    const response=await fetch("http://localhost:8000/api/auth/register",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:email,
        password:password,
        name:name
      })
    });
    const data=await response.json();
    if(data.status=="ok"){
      toast.success("Registered Successful");
      navigate("/login");
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
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          required={true}
          className="w-full mb-4 px-3 py-2 border  border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          required={true}
          className="w-full mb-3 px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required={true}
          className="w-full mb-4 px-3 py-2 border  border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Re Enter Password"
          value={repassword}
          required={true}
          className="w-full mb-4 px-3 py-2 border  border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          onChange={(e) => setRePassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
