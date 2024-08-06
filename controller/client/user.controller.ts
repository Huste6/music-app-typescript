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
            alert("Đã tồn tại email!");
            return res.redirect("back");
        }
        const ExistPassword = await User.findOne({
            password: req.body.password
        });
        if(ExistPassword){
            alert("Đã tồn tại password!");
            return res.redirect("back");
        }
        const user = new User(req.body);
        await user.save();

        res.cookie("tokenUser",user.tokenUser);
        res.redirect("/topics");
        
    }catch(error){
        alert("Đã xảy ra lỗi!");
        return res.redirect("back");
    }
}