const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
dotenv.config();

const User = require("./models/user.model");
const Gig = require("./models/gigs.model");
const Bid = require("./models/bids.modal")
const secretCode = process.env.secretCode;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
mongoose.connect(process.env.mongodbURI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

function authMiddleWare(req, res, next) {
    try {
        const encryptedEmail = req.cookies.email;
        const decoded = jwt.verify(encryptedEmail, secretCode);
        req.user = decoded;
        next();
    } catch (e) {
        res.send({ status: 'error', error: 'Session Expired' });
    }
}

app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) return res.send({ status: 'error', error: 'Email Exists' });
        const hashedpassword = await bcrypt.hash(password, 10);
        const isMatch = await User.create({ email: email, name: name, password: hashedpassword });
        if (!isMatch) return res.send({ status: 'error', error: 'Network Issues' });
        return res.send({ status: 'ok' });
    } catch (e) {
        res.send({ status: 'error', error: 'Network Issues' });
    }
})

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) return res.send({ status: 'error', error: 'User Doesnt Exist' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.send({ status: 'error', error: 'Invalid Credintials' });
        const encryptedEmail = jwt.sign({ email }, secretCode);
        res.cookie("email", encryptedEmail, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.send({ status: 'ok' });
    } catch (e) {
        res.send({ status: 'error', error: 'Network Issues' });
    }
})

app.get("/api/getuserdet", authMiddleWare, async (req, res) => {
    const email = req.user.email;
    try {
        const user = await User.findOne({ email: email });
        console.log(user)
        res.send({ status: "ok", name: user.name });
    } catch (e) {
        res.send({ status: 'error' });
    }
})

app.get("/api/logout", (req, res) => {
    res.clearCookie('email');
    res.send('Cookie has been deleted successfully')
})

app.post("/api/gigs", authMiddleWare, async (req, res) => {
    const { title, desc, budget } = req.body;
    const email = req.user.email;
    try {
        const user = await User.findOne({ email: email });
        const gig = await Gig.create({
            title: title,
            description: desc,
            budget: budget,
            postedBy: user.email
        })
        user.gigs.push(gig._id);
        await user.save();
        res.send({ status: "ok" });
    } catch (e) {
        res.send({ status: "error" });
    }
})
app.get("/api/gigs", authMiddleWare, async (req, res) => {
    const email = req.user.email;
    try {
        const user = await User.findOne({ email }).populate("bids");
        const biddedGigIds = user.bids.map(bid => bid.gig);
        const gigs = await Gig.find({ postedBy: { $ne: email }, status: { $eq: "open" }, _id: { $nin: biddedGigIds } });
        res.send({ status: "ok", gigs: gigs });
    } catch (e) {
        res.send({ status: 'error' });
    }
})

app.get("/api/getusergigs", authMiddleWare, async (req, res) => {
    const email = req.user.email;
    try {
        const user = await User.findOne({ email: email });
        const usergigs = await Gig.find({ _id: { $in: user.gigs } });
        res.send({ status: 'ok', gigs: usergigs });
    } catch (e) {
        res.send({ status: 'error', error: 'Network Issues' });
    }
})

app.post("/api/bids", authMiddleWare, async (req, res) => {
    const email = req.user.email;
    const { id, message, price } = req.body;
    try {
        const gig = await Gig.findById(id);
        const user = await User.findOne({ email: email });
        if (gig.status == "assigned") return res.send({ status: 'error', error: 'The Gig is Assigned' });
        const bid = await Bid.create({
            message: message,
            price: price,
            gig: gig._id,
            email: email
        });
        gig.bids.push(bid._id);
        user.bids.push(bid._id);
        await gig.save();
        await user.save();
        return res.send({ status: 'ok' });
    } catch (e) {
        res.send({ status: 'error', error: "Network Issues" })
    }
})
app.get("/api/getuserbids", authMiddleWare, async (req, res) => {
    const email = req.user.email;
    try {
        const user = await User.findOne({ email: email });
        const userbids = await Bid.find({ _id: { $in: user.bids } }).populate("gig");
        res.send({ status: 'ok', bids: userbids });
    } catch (e) {
        res.send({ status: 'error', error: 'Network Issues' });
    }
})

app.get("/api/bids/:id", authMiddleWare, async (req, res) => {
    const email = req.user.email;
    const id = req.params.id;
    try {
        const data = await Gig.findById(id).populate("bids");
        const bids = data.bids;
        res.send({ status: "ok", bids: bids });
    } catch (e) {
        res.send({ status: "error", error: "Network Issues" });
    }
})

app.patch("/api/:id/hire", authMiddleWare, async (req, res) => {
    const email = req.user.email;
    const id = req.params.id;
    console.log(email, id);
    try {
        const bid = await Bid.findById(id);
        const gig = await Gig.findById(bid.gig);
        gig.assignedto = bid.email;
        gig.status = "assigned";
        bid.assigned = true;
        console.log(gig, bid);
        await gig.save();
        await bid.save();
        res.send({ status: 'ok' })
    } catch (e) {
        res.send({ status: 'error', error: 'Network Issues' })
    }
})
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 