import mongoose, {Schema,Document} from "mongoose";

export interface IRecipe extends Document {
    title:string;
    ingredients:string;
    instructions:string;
    createdAt:Date;
    coverImage:string;
}


const RecipeSchema =new Schema<IRecipe>({
    title:{type:String, required:true},
    ingredients:{type:String, required:true}, 
    instructions:{type:String, required:true},
    createdAt:{type:Date, default:Date.now},
    coverImage:{type:String, required:false}
})

export  const recipeModel =  mongoose.model<IRecipe>('Recipe',RecipeSchema);
