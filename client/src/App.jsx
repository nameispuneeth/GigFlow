import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Register from "./auth/register"
import Login from "./auth/login"
import Gig from "./pages/gig"
import Bid from "./pages/bid"
export default function App(){
  return(
   <BrowserRouter>
   <Routes>
    <Route path="/bid" element={<Bid />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/gig" element={<Gig />} />
   </Routes>
   <ToastContainer position="top-right"/>
   </BrowserRouter>
  )
}