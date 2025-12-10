import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Constants/BASE_URL';
import { useNavigate } from 'react-router-dom';
export default function AddRecipe() {
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        title:'',
        ingredients:'',
        instructions:'',
        coverImage:null as File | null,
    });
  const [imagePreview, setImagePreview] = useState<string>("");

//   function to handle form input changes
    const handleChange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.name === 'ingredients' ? e.target.value.split(',') : e.target.value;
        setFormData((prev) => ({
            ...prev, 
            [e.target.name]: value  
        }));
    }
    // function to handle image input change
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target as HTMLInputElement;

        if(fileInput.files && fileInput.files.length > 0){
            const file = fileInput.files[0];
            setFormData((prev) => ({
                ...prev,
                coverImage:file
        }));
        // create image preview
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result as string);
        }
        reader.readAsDataURL(file);
        }
}

    // function handle submit
    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        
        // Create FormData object for file upload
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('ingredients', formData.ingredients);
        formDataToSend.append('instructions', formData.instructions);
        if(formData.coverImage) {
            formDataToSend.append('coverImage', formData.coverImage);
        }
        
        try{
            const response = await axios.post(`${BASE_URL}/recipe`, formDataToSend,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            console.log("Recipe added successfully:", response.data);
            setFormData({
                title:'',
                ingredients:'',
                instructions:'',
                coverImage:null,
            });
            setImagePreview('');
            navigate('/');
        }catch(error){
            console.error("Error adding recipe:", error);
        }
    }

    return (
        <div className='min-h-screen flex  justify-center items-center px-4 py-24 bg-gradient-to-br from-orange-50 via-white to-cyan-50 font-serif'>
            <div className='w-full max-w-2xl'>
                 {/* Card Container */}
                <div className='bg-white rounded-2xl shadow-2xl overflow-hidden'>
                    {/* Header Section */}
                    <div className='bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-2 text-center '>
                        <h1 className='text-3xl font-bold text-white mb-2'>Add new recipe</h1>
                        <p className='text-orange-100'>Share your delicious recipe with the community</p>
                    </div>
                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className='px-8 py-10 space-y-6'>
                        {/* Title input */}
                        <div className='space-y-2'>
                            <label htmlFor="title" className='block text-s, font-bold text-gray-700'>Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Chocolate Chip Cookies"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {/* Ingredients input */}
                        <div className='space-y-2'>
                            <label htmlFor="ingredients" className='block text-sm text-gray-700 font-bold'>Ingredients</label>
                            <textarea
                                id="ingredients"
                                name="ingredients"
                                value={formData.ingredients}
                                onChange={handleChange}
                                rows={6}
                                placeholder="List ingredients separated by commas"
                                className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 duration-300 placeholder-gray-400 resize-none'
                            />
                        </div>
                        {/* Instructions input */}
                        <div className='space-y-2'>
                            <label htmlFor="instructions" className='block text-sm text-gray-700 font-bold'>Instructions</label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                placeholder="Step-by-step cooking instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                                rows={8}
                                className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 duration-300 placeholder-gray-400 resize-none'
                            />
                        </div>
                        {/* image upload */}
                        <div className='space-y-2'>
                            <label htmlFor="coverImage" className='block text-sm text-gray-700 font-bold'>Recipe Image</label>
                            <div className='flex flex-col gap-4'>
                                <div className='relative'>
                                    <input type="file" id='coverImage' name='coverImage' accept="image/*" onChange={handleFileChange} className='hidden'/>
                                    <label htmlFor="coverImage" className='flex justify-center items-center w-full px-4 py-3 border-2 border-dahsed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hovver:bg-orange-50 transition-all duration-300'>
                                        <div className='text-center'>
                                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p className='mt-2 text-sm text-gray-600'><span className='font-semibold text-orange-600'>Click to upload</span> or drag and drop</p>
                                            
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </label>
                                </div>
                                {/* image preview */}
                                {imagePreview && (
                                    <div className='relative rounded-lg overflow-hidden border-2 border-gray-200'>
                                        <img
                                        className='w-full h-48 object-cover'
                                        src={imagePreview} alt=" Preview" />
                                        <button type='button'
                                        onClick={() => {
                                            setImagePreview('')
                                            setFormData(prev => ({...prev, coverImage:null}))
                                        }}
                                        className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors'
                                        > <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg></button>
                                    </div>
                                )}

                            </div>
                            {/* submit button */}
                             <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Recipe
                        </button>
                        </div>
                        
                    </form>

                </div>

            </div>
        </div>
    )
}