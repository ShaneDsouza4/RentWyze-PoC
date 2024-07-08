const express = require("express");
const { 
    handleUserSignup, 
    handleUserLogin, 
    handleUserLogout, 
    handlegetUserByID,
    handleupdateUserByID ,
    handleDeleteUserByID,
    handleVerifyUserByID,
    handleGetAllUsers
} = require("../controllers/user")
const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout); 


router.get('/', handleGetAllUsers);

router.route("/:id")
    .get(handlegetUserByID)
    .patch(handleupdateUserByID)
    .delete(handleDeleteUserByID)

router.patch("/verify/:id", handleVerifyUserByID);

module.exports = router;
