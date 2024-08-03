import { Request,Response, Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/client/topic.controller"

router.get("/",controller.index)

export const topicRoutes:Router = router;