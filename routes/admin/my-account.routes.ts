import { Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/admin/my-account.controller"

router.get("/",controller.index);

router.get("/edit",controller.edit);

router.patch("/edit",controller.editPatch);

export const MyaccountRoutes:Router = router;