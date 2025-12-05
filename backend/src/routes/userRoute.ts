import express from 'express';
import { register,login } from '../services/userService';
import { userModel } from '../models/UserModel';
const  router  = express.Router();

router.post('/register', async(req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const {data, statusCode } =await register({
            firstName,
            lastName,
            email,
            password
        });
     return  res.status(statusCode || 500).json(data);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async(req, res) => {
    try{
        const { email, password } = req.body;
        const {data ,statusCode } =await login({
            email,
            password
        });
      return  res.status(statusCode || 500).json(data);

    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/:id', async(req,res) => {
    try{
        const userId = req.params.id;
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({message:'Server error'});
    }
})

export default router;