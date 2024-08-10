import { Request,Response } from "express";
import { systemConfig } from "../../config/config";
import Account from "../../model/account-admin.model";
import md5 from "md5"

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
// [POST] /admin/auth/login
export const loginPost = async (req:Request,res:Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        email: email,
        deleted:false
    });
    if(!user){
        req["flash"]("error","Email không tồn tại");
        res.redirect("back");
        return;
    }
    if(md5(password) != user.password){
        req["flash"]("error","Sai mat khau");
        res.redirect("back");
        return;
    }
    if(user.status == "inactive"){
        req["flash"]("error","Tai khoan da bi khoa!");
        res.redirect("back");
        return;
    }
    res.cookie("token",user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}