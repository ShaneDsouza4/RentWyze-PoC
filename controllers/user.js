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
        console.log(error)
        return res.status(500).json({msg:"User Login Error", error});
    }  
}

async function handleUserLogout(req, res){
    res.clearCookie("token")
    res.status(200).json({msg:"Logout Success"});
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
}
