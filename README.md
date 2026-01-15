# GigFlow

GigFlow is a full-stack MERN freelancing platform where users can post gigs, bid on gigs, and manage assignments.
The application supports the complete flow from gig posting to bidding, hiring, and completion using a single user role.

---

## Features

### User Features
- Register and login with authentication
- Post new gigs with title, description, and budget
- View gigs posted by other users
- Bid on available gigs with a message and price
- Track bid status: Pending, Hired, Rejected
- View and manage gigs posted by the user

### Gig Management
- View all bids for a gig
- Assign a gig to one bidder
- Automatically reject remaining bids
- Gig lifecycle:
  - open → rejected

### UI and UX
- Responsive user interface
- Toast notifications
- Loading indicators
- Protected routes using authentication context

---

## Tech Stack

### Frontend
- React.js
- React Router
- Context API
- Tailwind CSS
- React Toastify
- Lucide React
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Tools
- Git and GitHub
- Postman
- VS Code

---

## Project Structure

GigFlow/
client/
  src/
    components/
    pages/
    authContext/
    App.jsx
    main.jsx
  package.json

server/
  models/
    User.js
    Gigs.js
    Bids.js
  routes/
  controllers/
  middleware/
  config/
  index.js

README.md

---

## Installation and Setup

### Step 1: Clone the Repository
git clone https://github.com/nameispuneeth/gigflow.git  
cd gigflow

### Step 2: Backend Setup
cd server  
npm install

### Step 3: Frontend Setup
cd client  
npm install  
npm run dev

---

## Environment Variables

### Backend
- PORT
- MONGO_URI
- JWT_SECRET

### Frontend
- VITE_APP_API_BACKEND_URL

---

## API Endpoints

### Authentication
- POST /api/register
- POST /api/login

### Gigs
- POST /api/creategig
- GET /api/getgigs
- GET /api/getusergigs
- PUT /api/assigngig/:gigId

### Bids
- POST /api/bid
- GET /api/getbids/:gigId

---

## Application Workflow

1. User registers and logs in
2. User posts a gig
3. Other users place bids
4. Gig owner views all bids
5. One bid is hired
6. Remaining bids are rejected
7. Gig status becomes in-progress
8. Gig is closed after completion

---

## Future Enhancements

- Separate client and freelancer roles
- Chat system
- Rating and review system
- Payment integration
- Search and filters
- Admin dashboard

---

## Author

Puneeth Kumar  
GitHub: https://github.com/nameispuneeth  
LinkedIn: https://www.linkedin.com/in/puneeth0121/

---
