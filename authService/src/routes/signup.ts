import { Router } from "express";
import { body } from "express-validator";
import SignUpController from "../controllers/signup";
import requestValidator from "../middlewares/requestValidator";

const router = Router();


router.post("/api/users/signup",[
    body("email").isEmail().withMessage('invalid email'),
    body("password").trim().isLength({min:4 , max:20}).withMessage("invalid password")
],requestValidator ,SignUpController.signup); 
        

export = router; 
