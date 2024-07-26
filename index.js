const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./connection");
const { checkForAuthenticationCookie } = require("./middleware/authentication")

const app = express();
const PORT = process.env.PORT || 8000;

const path = require("path");
const cookieParser = require("cookie-parser");

//Routes
const userRoute = require("./routes/user");
const propertyRoute = require("./routes/property");
const reviewRoute = require("./routes/review");


app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

connectToMongoDB("mongodb://127.0.0.1:27017/RentWyze")
.then(()=>console.log("MongoDB connected."));

const corsOpts = {
  origin: "*",

  methods: ["*"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

//Routes
app.get("/hello", (req, res)=>{
    res.send("Task")
})

app.use("/api/user", userRoute)
app.use("/api/property", propertyRoute)
app.use("/api/review", reviewRoute)

app.listen(PORT, ()=>{
    console.log(`Server start at PORT:${PORT}`)
})
