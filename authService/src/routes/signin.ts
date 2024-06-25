import { Router } from "express";
import SignInController from "../controllers/signin";
import requestValidator from "../middlewares/requestValidator";
import { body } from "express-validator";

const router = Router();


router.post("/api/users/signin", [
    body("email").isEmail().withMessage('invalid email'),
    body("password").trim().isLength({min:4 , max:20}).withMessage("invalid password")
],requestValidator ,SignInController.signin);


export = router; 
