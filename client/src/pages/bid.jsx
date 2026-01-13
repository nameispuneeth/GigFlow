export default function Bid() {
    const dummyData=[
        {
            "id": 1,
            "title": "Build a Responsive Landing Page",
            "description": "Need a responsive landing page built using React and Tailwind CSS for a startup website.",
            "status": "pending",
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
            "status": "pending",
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
            "status": "pending",
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
            "title":  "Deploy Application to Cloud",
            "description": "Deploy MERN stack application to AWS with CI/CD pipeline.",
            "status": "pending",
            "budget": 20000,
            "postedBy": "cloud.ops@gmail.com"
        }
    ]

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {dummyData.map((data,idx)=>(
                (
                    <div className="w-full flex flex-col bg-gray-200 mt-10" key={data.id}>
                        <div className="flex justify-evenly">
                            <p>{data.title}</p>
                            <p>{data.status}</p>
                        </div>
                        <p>{data.description}</p>
                    </div>
                )
            ))}
        </div>
    )
}