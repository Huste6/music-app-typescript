import { Request,Response } from "express";
import { systemConfig } from "../../config/config";

// [GET] /admin/auth/login
export const login = async (req:Request,res:Response) => {
    if(req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    }else{
        res.render("admin/pages/auth/login",{
            pageTitle: "Trang đăng nhập"
        })
    }
}