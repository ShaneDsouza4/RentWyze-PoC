const User = require('../models/user');

async function handleUserSignup(req, res){
    try{
        const body = req.body;

        if(!body || !body.email) return res.status(400).json({msg:"Email is required"});

        const result = await User.create({
            firstName: body.firstName,
            lastName:body.lastName,
            contactNo:body.contactNo,
            email:body.email,
            password: body.password
        })

        return res.status(201).json({msg:"success", id: result._id});
    }catch(error){
        return res.status(500).json({msg:"User Signup Error", error});
    }  
}

async function handleUserLogin(req, res){
    try{
        
        const body = req.body;
        if(!body || !body.email) return res.status(400).json({msg:"Email is required"});
        const { email, password  } = body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({msg:"User not found."});

        const token = await User.matchPasswordAndGenerateToken(email, password);
        //console.log(token)
        if(token == undefined) return res.status(400).json({msg:"Incorrect Password."})
        

        const oneDay = 1000 * 60 * 60 * 60;
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDay)
        });

        res.status(200).json({msg:"success"});
    }catch(error){
        //console.log(error)
        return res.status(500).json({msg:"User Login Error", error});
    }  
}

async function handleUserLogout(req, res){
    res.clearCookie("token")
    res.status(200).json({msg:"Logout Success"});
}

async function handlegetUserByID(req, res){
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({msg:"No user found!"});
        }
        return res.status(200).res.json({msg:"success", user});
    }catch(error){
        return res.status(500).json({msg:"error getting user", error});
    }
}

async function handleupdateUserByID(req, res) {
    try{
        const result = await User.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({msg:"success"});
    }catch(error){
        return res.status(500).json({msg:"error updating user", error});
    }
    
}

async function handleDeleteUserByID(req, res) {
    try{
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg:"Delete Success!"});
    }catch(error){
        return res.status(500).json({msg:"error deleting user", error});
    }
}

async function handleVerifyUserByID(req, res) {
    try{
        const { id } = req.params;
        const { verified } = req.body;

        await User.findByIdAndDelete(
            { _id: id },
            { verified },
        );
        return res.status(200).json({msg:"Verification Success!"});
    }catch(error){
        return res.status(500).json({msg:"error verifying user", error});
    }
}

async function handleGetAllUsers(req, res) {
    try{
        const allDBUsers = await User.find({});
        return res.status(200).json(allDBUsers);
    }catch(error){
        return res.status(500).json({msg:"error geting all users", error});
    }
    
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
    handlegetUserByID,
    handleupdateUserByID,
    handleDeleteUserByID,
    handleVerifyUserByID,
    handleGetAllUsers
}
