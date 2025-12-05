import {type Request,  type Response, type NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/UserModel';
import { ExtendRequest } from '../types/ExtendRequest';

export const validateJWT = async (req:ExtendRequest, res:Response, next:NextFunction) => {
    // Get authorization h
    const authorization = req.get('authorization');
    if(!authorization){
        return res.status(401).json({message:'Unauthorized'});
    }
    
    const token = authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    jwt.verify(token, process.env.JWT_SECRET || " " ,async (err:any ,payload:any) => {
        if(err){
            return res.status(401).json({message:'Unauthorized'});
        }
        if(!payload){
            return res.status(401).json({message:'Unauthorized'});
        } 
        const user = await userModel.findOne({email:payload.email});
        if(!user){
            return res.status(401).json({message:'Unauthorized'});
        }
        req.user = user;
        next();
    });
}