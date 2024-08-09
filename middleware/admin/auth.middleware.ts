import { NextFunction,Request,Response } from "express";
import { systemConfig } from "../../config/config";
import Account from "../../model/account-admin.model";
import Role from "../../model/role.model";

export const requireAuth = async (req:Request,res:Response,next:NextFunction) => {
    // if(!req.cookies.tokenUser){
    //     res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    // }else{
    //     const user = await Account.findOne({
    //         token: req.cookies.tokenUser
    //     })
    //     if(!user){
    //         res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    //     }else{
    //         const roles = await Role.find({
    //             _id: user.role_id
    //         }).select("title permissions");
    //         res.locals.roles = roles;
    //         res.locals.user = user;
    //         next();
    //     }
    // }
    next();
}