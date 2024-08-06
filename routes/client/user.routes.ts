import { Request,Response, Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/client/user.controller"

router.get("/register",controller.register);

router.post("/register",controller.registerPost);

router.get("/login",controller.login);

router.post("/login",controller.loginPost);

router.get('/logout',controller.logout);

router.get('/password/forgot',controller.forgotPassword);

router.post('/password/forgot',controller.forgotPasswordPost);

router.get('/password/otp',controller.otpPassword);

router.post('/password/otp',controller.otpPasswordPost);

router.get('/password/reset',controller.reset);

router.post('/password/reset',controller.resetPost);

export const userRoutes:Router = router;