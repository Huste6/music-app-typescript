import { Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/admin/role.controller"

router.get("/",controller.index);

router.get("/create",controller.create);

router.post("/create",controller.createPost);

router.get("/edit/:id",controller.edit);

router.patch("/edit/:id",controller.editPatch);

router.get("/permissions",controller.permissions);

router.patch("/permissions",controller.permissionsPatch);

export const RoleRoutes:Router = router;