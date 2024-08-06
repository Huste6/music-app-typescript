import { Router } from "express";
const router:Router = Router();
import multer from 'multer';
import * as controller from "../../controller/admin/upload.controller"
import { uploadFields, uploadSingle } from "../../middleware/admin/uploadCloud.middleware";

const upload = multer();

router.post(
    "/",
    upload.single("file"),
    uploadSingle,
    controller.index
);

export const uploadRoutes:Router = router;