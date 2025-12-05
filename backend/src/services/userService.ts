import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/UserModel';
import { stat } from 'fs';

interface RegisterPArams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export const register = async ({firstName, lastName, email, password}:RegisterPArams) => {
    // Check if user already exists
    const findUser = await userModel.findOne({email});
    if(findUser){
        return {status:400, message:'User already exists'};
    }
    const bcryptedPassword  =  await bcrypt.hash(password,10);
    // Create new user
    const newUser = await userModel.create({firstName, lastName, email, password:bcryptedPassword});
    await newUser.save();
    return {data:generateJWT({firstName,lastName,email}), statusCode:201};


}
interface loginParams{
    email:string;
    password:string;
}

export const login  = async ({email, password}: loginParams) => {
    const findUser  = await userModel.findOne({email});
    if(!findUser){
        return {status:404, message:'User not found'};
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if(!isPasswordValid){
     return {data:'Invalid password or email', statusCode:400}
    }

    return {data: generateJWT({firstName:findUser.firstName, lastName:findUser.lastName, email:findUser.email}), statusCode:200};

}

const generateJWT = (data:any ) => {
    return jwt.sign(data, process.env.JWT_SECRET || "")
}