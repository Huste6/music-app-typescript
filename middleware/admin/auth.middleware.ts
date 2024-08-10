import { NextFunction,Request,Response } from "express";
import { systemConfig } from "../../config/config";
import Account from "../../model/account-admin.model";
import Role from "../../model/role.model";

export const requireAuth = async (req:Request,res:Response,next:NextFunction) => {
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }else{
        const user = await Account.findOne({
            token: req.cookies.token
        })
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }else{
            const roles = await Role.find({
                _id: user.role_id
            }).select("title permissions");
            if (roles.length === 0) {
                res.locals.roles = null;
            } else {
                res.locals.roles = roles[0];
            }
            res.locals.user = user;
            next();
        }
    }
}