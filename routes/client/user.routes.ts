import { Request,Response, Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/client/user.controller"

router.get("/register",controller.register);

router.post("/register",controller.registerPost);

export const userRoutes:Router = router;