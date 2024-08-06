import { Request,Response, Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/client/user.controller"

router.get("/register",controller.register);

router.post("/register",controller.registerPost);

router.get("/login",controller.login);

router.post("/login",controller.loginPost);

export const userRoutes:Router = router;