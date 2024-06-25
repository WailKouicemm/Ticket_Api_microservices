
import { Router } from "express";
import CurrentUserController from "../controllers/currentuser";

const router = Router();


router.get("/api/users/currentuser", CurrentUserController.getCurrentUser);


export = router; 
