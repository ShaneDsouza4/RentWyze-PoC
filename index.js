const express = require("express");
const { connectToMongoDB } = require("./connection");
const { checkForAuthenticationCookie } = require("./middleware/authentication")

const app = express();
const PORT = process.env.PORT || 8000;

const path = require("path");
const cookieParser = require("cookie-parser");

//Routes
const userRoute = require("./routes/user");
const propertyRoute = require("./routes/property");


app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))


connectToMongoDB("mongodb://127.0.0.1:27017/RentWyze")
.then(()=>console.log("MongoDB connected."));

//Routes
app.get("/hello", (req, res)=>{
    res.send("Task")
})

app.use("/api/user", userRoute)
app.use("/api/property", propertyRoute)

app.listen(PORT, ()=>{
    console.log(`Server start at PORT:${PORT}`)
})
