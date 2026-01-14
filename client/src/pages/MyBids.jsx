import { useNavigate } from "react-router-dom"
export default function MyBids() {
    const navigate = useNavigate();
    const dummyData = [
        {
            "id": 1,
            "title": "Build a Responsive Landing Page",
            "description": "Need a responsive landing page built using React and Tailwind CSS for a startup website.",
            "status": "open",
            "budget": 8000,
            "postedBy": "alex.dev@gmail.com"
        },
        {
            "id": 2,
            "title": "Fix Backend API Bugs",
            "description": "Several REST API endpoints are throwing 500 errors and need debugging and fixes.",
            "status": "assigned",
            "budget": 6000,
            "postedBy": "backend.team@gmail.com"
        },
        {
            "id": 3,
            "title": "Create Mobile App UI",
            "description": "Design clean and minimal UI screens for a cross-platform mobile application.",
            "status": "hired",
            "budget": 12000,
            "postedBy": "ui.designer@gmail.com"
        },
        {
            "id": 4,
            "title": "Optimize Website Performance",
            "description": "Improve page load time and Lighthouse score for an existing React website.",
            "status": "open",
            "budget": 5000,
            "postedBy": "performance.lead@gmail.com"
        },
        {
            "id": 5,
            "title": "Develop Authentication System",
            "description": "Implement login, signup, and JWT-based authentication with role management.",
            "status": "assigned",
            "budget": 10000,
            "postedBy": "auth.manager@gmail.com"
        },
        {
            "id": 6,
            "title": "Set Up Database Schema",
            "description": "Design and implement MongoDB schemas for users, gigs, and bids.",
            "status": "hired",
            "budget": 9000,
            "postedBy": "db.admin@gmail.com"
        },
        {
            "id": 7,
            "title": "Create Admin Dashboard",
            "description": "Build a dashboard with charts and tables to manage users and gigs.",
            "status": "open",
            "budget": 15000,
            "postedBy": "admin.panel@gmail.com"
        },
        {
            "id": 8,
            "title": "Integrate Payment Gateway",
            "description": "Integrate Stripe payment gateway with secure checkout flow.",
            "status": "assigned",
            "budget": 11000,
            "postedBy": "finance.team@gmail.com"
        },
        {
            "id": 9,
            "title": "Write API Documentation",
            "description": "Prepare detailed API documentation using Swagger for backend services.",
            "status": "hired",
            "budget": 4000,
            "postedBy": "tech.writer@gmail.com"
        },
        {
            "id": 10,
            "title": "Deploy Application to Cloud",
            "description": "Deploy MERN stack application to AWS with CI/CD pipeline.",
            "status": "open",
            "budget": 20000,
            "postedBy": "cloud.ops@gmail.com"
        }
    ]

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
            <p className="text-center text-4xl m-5">My Bids : </p>
            <button className="absolute right-2 top-2 bg-black text-white px-5 py-2" onClick={() => navigate("/bid")}>All Bids</button>
            <div className="w-full max-w-sm bg-white p-6 rounded-md border space-y-5">
                {dummyData.map((data, idx) => (
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
                                <div className="flex">
                                    <p className="text-sm font-semibold">Your Price : ₹</p>
                                    <p className="text-sm font-semibold"> {data.userbudget || 20000}</p>
                                </div>
                            </div>
                        </div>



                    )
                ))}
            </div>
        </div>
    )
}