const { Schema, model } = require("mongoose");
const { createHmac, randomBytes, hash }  = require("crypto");
const { createTokenForUser }  = require("../services/authentication")

const userSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    contactNo:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    gender:{
        type:String
    },
    profleImageURL:{
        type:String,
        defaults: "/images/default.png"
    },
    role:{
        type: String,
        enum: ["RENTER", "LANDLORD", "SUPERADMIN"],
        default: "RENTER"
    },
    verified: {
        type: Boolean,
        default: false
    },
    salt:{
        type:String
    }
}, {timestamps: true});


//Hashing the users password before saving
userSchema.pre("save", function (next) {
    const user = this;
  
    if (!user.isModified("password")) return;
  
    const salt = randomBytes(16).toString(); 

    const hashedPassword = createHmac("sha256", salt) 
      .update(user.password) 
      .digest("hex"); 
  
    this.salt = salt;
    this.password = hashedPassword;
  
    next();
});


userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
    try{
        const user = await this.findOne({email});

        if(!user){
            throw new Error("User not Found.");
            //return "User not found."
        }

        const salt = user.salt;
        const hashedPassword = user.password;

        const userProvidedHash = createHmac("sha256", salt) 
        .update(password)
        .digest("hex"); 

        if(hashedPassword !== userProvidedHash){ //
            throw new Error("Incorrect Password");
            //return "Incorrect Password";
        }

        const token = createTokenForUser(user);
        return token;
    }catch(err){
        return 
    }
    
})

const User = model('user', userSchema);

module.exports = User;