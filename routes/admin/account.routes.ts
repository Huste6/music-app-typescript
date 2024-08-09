import { Router } from "express";
import multer from 'multer';
const router:Router = Router();
import * as controller from "../../controller/admin/account.controller"
import {uploadSingle} from "../../middleware/admin/uploadCloud.middleware"

const upload = multer();

router.get("/",controller.index);

router.get("/create",controller.create);

router.post(
    "/create",
    upload.single("avatar"),
    uploadSingle,
    controller.createPost
);

router.patch("/change-status/:DataStatus/:DataID",controller.changeStatus);

router.get("/edit/:id",controller.edit);

router.patch("/edit/:id",controller.editPatch);

export const accountRoutes:Router = router;