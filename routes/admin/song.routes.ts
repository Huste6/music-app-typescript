import { Router } from "express";
import multer from 'multer';
const router:Router = Router();
import * as controller from "../../controller/admin/song.controller"
import {uploadSingle} from "../../middleware/admin/uploadCloud.middleware"

const upload = multer();

router.get("/",controller.index);

router.get("/create",controller.create);

router.post(
    "/create",
    upload.single("avatar"),
    uploadSingle,
    controller.createPOST
);

export const songRoutes:Router = router;