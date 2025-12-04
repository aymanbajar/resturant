/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Constants/BASE_URL";
export default function AllRecipes() {
  const [recipes, setRecipes] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchRecipes = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/recipe`);
            setRecipes(response.data);
        }catch(error){
            console.error("Error fetching recipes:", error);
        } 
    };
    fetchRecipes();
  }, []);
  

  return <div  className="  min-h-screen  flex flex-col   ">
    <h1 className="px-10 text-xl md:text-2xl  font-serif font-bold">All Recipes</h1>
        
        <div className="p-8 font-serif grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
             {
            (recipes.length > 0 ? 
                recipes.map((recipe:any) =>(
                <div key={recipe._id}
                className="flex flex-col justify-between items-start  border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300  hover:bg-orange-500 hover:text-white"
                >
                <h4 className="text-sm md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">{recipe.title}</h4>
                <p className="text-sm md:text-xl mb-2"> {recipe.ingredients}</p>
                <p className="text-sm md:text-xl">  {recipe.instructions}</p>
              
            </div>
                )):(
                <p className="text-red-500 text-center text-xl md:text-2xl  " >No recipes found.</p>
            ))
        }

        </div>
       
  </div>;
}
