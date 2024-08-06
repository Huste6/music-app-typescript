import { Request,Response } from "express";
import md5 from "md5"
import User from "../../model/user.model";
import { generateRandomNumber } from "../../helpers/generate";
import ForgotPassword from "../../model/forgot-password.model";
import { sendMail } from "../../helpers/sendMail";

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
//[GET] /user/logout
export const logout = async (req:Request, res:Response) => {
    res.clearCookie("tokenUser");
    res.redirect("/topics")
}
//[GET] /user/password/forgot
export const forgotPassword = async (req:Request, res:Response) => {
    res.render("client/pages/user/forgotPassword",{
        pageTitle: "Lấy lại mật khẩu"
    });
}
//[POST] /user/password/forgot
export const forgotPasswordPost = async (req:Request, res:Response) => {
    const email = req.body.email;
    const user = await User.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        req["flash"]("error", "Không tồn tại email!");
        return res.redirect("back");
    }
    const otp = generateRandomNumber(8);
    // luu thong tin vao db
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }
    const forgot = new ForgotPassword(objectForgotPassword);
    await forgot.save();

    // neu ton tai gui otp qua email
    const subject = "Mã OTP xác minh lấy lại mật khẩu: "
    const html = `
        Mã OTP để lấy lại mật khẩu là <b>${otp}</b> Thời hạn sử dụng 3 phút
    `
    sendMail(email,subject,html);

    res.redirect(`/user/password/otp?email=${email}`);
}
//[GET] /user/password/otp?email=:email
export const otpPassword = async (req:Request, res:Response) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password",{
        pageTitle: "Nhập mã OTP",
        email: email,
    })
}
//[POST] /user/password/otp
export const otpPasswordPost = async (req:Request, res:Response) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const result = await ForgotPassword.findOne({
        email:email,
        otp: otp
    });
    if(!result){
        req["flash"]("error","OTP không hợp lệ!");
        res.redirect("back");
        return;
    }
    const user = await User.findOne({
        email:email
    });

    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/user/password/reset");
}
//[GET] /user/password/reset
export const reset =async (req:Request, res:Response) => {
    res.render("client/pages/user/reset-password",{
        pageTitle: "Đổi mật khẩu"
    })
}
//[POST] /user/password/reset
export const resetPost =async (req:Request, res:Response) => {
    const password = md5(req.body.password);
    const confirmPassword = req.body.confirmPassword;
    const tokenUser = req.cookies.tokenUser;
    const user = await User.findOne({
        tokenUser: tokenUser
    })
    if(user.password === password){
        req["flash"]("error","Mật khẩu mới phải khác mật khẩu cũ!");
        res.redirect("back");
        return;
    }
    const ExistPassword = await User.findOne({
        password: password
    });
    if(ExistPassword){
        req["flash"]("error","Đã tồn tại password!");
        return res.redirect("back");
    }
    await User.updateOne(
        {
            tokenUser: tokenUser
        },
        {
            password: password
        }
    );
    req["flash"]("success","Đổi mật khẩu thành công");
    res.redirect("/topics");
}