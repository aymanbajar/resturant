/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Constants/BASE_URL";
import { useAuth } from "../context/Auth/AuthContext";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
interface Recipe {
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  coverImage?: string;
}
export default function MyRecipes() {  
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const[formData, setFormData]=useState({
        title:'',
        ingredients:'',
        instructions:''
    });
    const[editModelOpen,setEditModelOpen]=useState(false);
    const { token } = useAuth();

    // for getting user's recipes
    useEffect(() => {
        const fetchMyRecipes = async () => {
            try {
                if (!token) {
                    console.log("No token found");
                    return;
                }

                // Fetch user's recipes using the dedicated endpoint
                const response = await axios.get(`${BASE_URL}/recipe/my-recipes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setMyRecipes(response.data || []);
            } catch (error) {
                console.error("Error fetching my recipes:", error);
                setMyRecipes([]);
            } 
        };
        
        fetchMyRecipes();
    }, [token]);

// delete function
const handleDelete = async (recipeId: string) => {
    try{
        const response = await axios.delete(`${BASE_URL}/recipe/${recipeId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        if(!response.data){
            console.error("Failed to delete recipe");
            return;
        }
        // Optionally, update the state to remove the deleted recipe
        setMyRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
    }catch(error){  
        console.error("Error deleting recipe:", error);
    }
}
const handleEditClick = async(recipe:any) => {
    setSelectedRecipe(recipe);
    setFormData({
        title:recipe.title,
        ingredients:recipe.ingredients,
        instructions:recipe.instructions
    });
    setEditModelOpen(true);
}
const  handleEdit = async () => {
    if(!selectedRecipe){
        console.log("No recipe selected for editing");
        return;
    }
    try{
        const response = await axios.put(`${BASE_URL}/recipe/${selectedRecipe._id}`, {
            title: formData.title,
            ingredients: formData.ingredients,
            instructions: formData.instructions
        },{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.data){
            console.error("Failed to update recipe");
            return;
        }
        setMyRecipes(prev => prev.map(recipe => recipe._id === selectedRecipe._id ? response.data : recipe));
        setEditModelOpen(false);    
        setSelectedRecipe(null);
    }catch(error){
        console.log("Error updating recipe:", error);
        return
    }
}
    return (
        <div className="min-h-screen p-2 md:p-16  font-serif">
            <h1 className="text-3xl font-bold mb-6">My Recipes</h1>
            {
                myRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {myRecipes.map((recipe: any) => (
                            <div key={recipe._id} className="  border border-gray-300 rounded-lg p-0 md:p-4 shadow-lg hover:shadow-xl transition-shadow">
                                <h2 className="text-xl font-bold mb-2 p-2">{recipe.title}</h2>
                                {recipe.coverImage && (
                                    <img 
                                         src={`${BASE_URL}/images/${recipe.coverImage}`} 
                                        alt={recipe.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <p className="text-gray-700 mb-2">{recipe.ingredients}</p>
                                <p className="text-gray-600">{recipe.instructions}</p>
                                {/* icons */}
                                 {/* Action Buttons */}
                                        <div className="flex justify-center items-center gap-2 md:gap-4  border-t border-gray-200">
                                            <button
                                              onClick={() =>handleEditClick(recipe) }
                                                className="flex-1 flex items-center justify-center p-1 gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                            >
                                                <MdEdit size={20} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(recipe._id)}
                                                className="flex-1 flex items-center justify-center p-2 gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                            >
                                                <MdDelete size={20} />
                                                Delete
                                            </button>
                                        </div>
                            </div> 
                            
                        ))}

                        {/* Edit Modal */}
                        {
                            editModelOpen && (
                                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-70'>
                                    <div className="flex  flex-col bg-white rounded-lg shadow-2xl border-2 border-orange-600 p-8">
                                       <h1 className="font-bold text-center">Edit Recipe</h1>
                                       <form className="p-6 space-y-4 w-96" onSubmit={(e)=> e.preventDefault()}>
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="mt-1 block p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                                                Ingredients
                                            </label>
                                            <textarea 
                                                id="ingredients"
                                                name="ingredients"
                                                rows={4}
                                                    value={formData.ingredients}
                                                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                                                className="mt-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                                                Instructions    
                                            </label>
                                            <textarea 
                                                id="instructions"
                                                name="instructions"
                                                rows={4}
                                                    value={formData.instructions}
                                                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                                                className="mt-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </form>
                                    <div className='flex justify-center items-center gap-50'>
                                        <button className='bg-green-600 text-white px-4 py-2 rounded' onClick={handleEdit}>ok</button>
                                        <button className='bg-red-600 text-white px-4 py-2 rounded' onClick={() => setEditModelOpen(false)}>cancel</button>
                                    </div>
                                    

                                    </div>
                                </div>
                            )
                        }
                    </div>
                    
                ) : (
                    <p className="text-red-600 text-xl text-center">No recipes found for this user.</p>
                )
            }
        </div>
    );
}