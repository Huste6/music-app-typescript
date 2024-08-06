import { Request,Response } from "express";
import md5 from "md5"
import User from "../../model/user.model";

//[GET] /user/register
export const register = async (req:Request, res:Response) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    });
}
//[POST] /user/register
export const registerPost = async (req:Request, res:Response) => {
    try{
        req.body.password = md5(req.body.password);
        const ExistEmail = await User.findOne({
            email: req.body.email
        })
        if (ExistEmail) {
            req["flash"]("error","Đã tồn tại email!");
            return res.redirect("back");
        }
        const ExistPassword = await User.findOne({
            password: req.body.password
        });
        if(ExistPassword){
            req["flash"]("error","Đã tồn tại password!");
            return res.redirect("back");
        }
        const user = new User(req.body);
        await user.save();

        res.cookie("tokenUser",user.tokenUser);
        res.redirect("/topics");
    }catch(error){
        req["flash"]("error","Đã xảy ra lỗi!");
        return res.redirect("back");
    }
}
//[GET] /user/login
export const login = async (req:Request, res:Response) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    });
}
//[POST] /user/login
export const loginPost = async (req:Request, res:Response) => {
    try {
        const email = req.body.email;
        const password = md5(req.body.password);
        const user = await User.findOne({
            email: email,
            deleted:false
        })
        if(!user){
            req["flash"]("error","Không tồn tại email!");
            return res.redirect("back");
        }
        if(user.password !== password){
            req["flash"]("error","Sai mật khẩu!");
            return res.redirect("back");
        }
        if(user.status === "inactive"){
            req["flash"]("error","Tài khoản đang bị khóa!");
            return res.redirect("back");
        }
        res.cookie("tokenUser",user.tokenUser);
        res.redirect("/topics");
    }catch(error){
        console.error(error);
        req["flash"]("error","Đã xảy ra lỗi!");
        return res.redirect("back");
    }
}