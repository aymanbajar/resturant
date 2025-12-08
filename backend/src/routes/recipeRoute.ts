import express from 'express';
import {recipeModel} from '../models/RecipeModel';
import upload from '../middlewares/mutler';
import { validateJWT } from '../middlewares/validateJWT';
import { ExtendRequest } from '../types/ExtendRequest';

const router = express.Router();

// for sending data to server
router.post('/', upload.single('coverImage'), validateJWT, async(req: ExtendRequest, res) => {
    try{
        const {title, ingredients, instructions} = req.body;
        if(!title || !ingredients || !instructions){
            return res.status(400).send('All fields are required');
        }
        
        // Get uploaded file name
        const coverImage = req.file?.filename || '';
        
        const newRecipe = await recipeModel.create({
            title, 
            ingredients, 
            instructions,
            coverImage,
            createdBy: req.user?._id
        });
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Recipe creation error:', error);
        res.status(500).send('Server error');
    }
} )

// for getting data from server
router.get('/', async(req,res) => {
    try{
        const recipes = await recipeModel.find();
        if(recipes.length === 0){
            return res.status(404).send('No recipes found');
        }
        res.status(200).json(recipes);
    }catch(error){
        res.status(500).send(error);
    }
})

// Get user's own recipes
router.get('/my-recipes', validateJWT, async(req: ExtendRequest, res) => {
    try{
        const userId = req.user?._id;
        if(!userId){
            return res.status(401).send('Unauthorized');
        }
        
        const recipes = await recipeModel.find({ createdBy: userId });
        res.status(200).json(recipes);
    }catch(error){
        console.error('Error fetching user recipes:', error);
        res.status(500).send('Server error');
    }
})

//get data by id
router.get('/:id', async(req,res) => {
    try{
        const _id:string = req.params.id;
            const recipe = await recipeModel.findById( _id);
            
        if(!recipe){
            return res.status(404).send('Recipe not found');

        }
        res.status(200).json(recipe);
    }catch(error){
        res.status(500).send(error);
    }
})
// for editing data by id
router.put('/:id', async(req,res) => {
    try{
        const _id:string = req.params.id;
        const {title, ingredients, instructions} = req.body;
        if(!title || !ingredients || !instructions){
            return res.status(400).send('All fields are required');
        }
        const updatedRecipe = await recipeModel.findByIdAndUpdate(_id,{title, ingredients, instructions},{new:true});
        if(!updatedRecipe){
            return res.status(404).send('Recipe not found');
        }
        res.status(200).json(updatedRecipe);


    }catch(error){
        res.status(500).send('Server error');
    }
})
// for deleting data by id
router.delete('/:id',validateJWT, async(req: ExtendRequest, res) => {
    try{
        const _id:string = req.params.id;
        const deletedRecipe = await recipeModel.findByIdAndDelete(_id);
        if(!deletedRecipe){
            return res.status(404).send('Recipe not found');
        }
        res.status(200).send('Recipe deleted successfully');

    }catch(error){
        res.status(500).send('Server error');
    }
})

export default router;