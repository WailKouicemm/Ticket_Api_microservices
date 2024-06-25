import { Router } from "express";
import { body } from "express-validator";
import SignoutController from "../controllers/signout";
import requestValidator from "../middlewares/requestValidator";

const router = Router();


router.post("/api/users/signout" ,SignoutController.signout); 
        

export = router; 