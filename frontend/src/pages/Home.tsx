import image1 from "../../public/images/image1.png";
import "../animations/fade-in.css"
import "../animations/float.css"
import AllRecipes from "../components/AllRecipes";
export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* hero section */}
      <div className="flex flex-col md:flex-row justify-between  items-center gap-8 px-4 md:px-8 lg:px-16 xl:px-32 py-12 md:py-20 ">
        {/* left */}
        <div className='flex flex-col justify-start items-start gap-6 max-w-2xl animate-fade-in font-serif '>
          <h1 className='font-bold text-xl md:text-2xl lg:text-3xl leading-tight'>Share Your Favorite Recipe With the World</h1>
          <p className='text-base md:text-lg text-orange-500 leading-relaxed'>
            Discover, cook, and share your favorite recipes with our vibrant
            community of food enthusiasts. Whether you're a seasoned chef or a
            home cook, our platform is designed to inspire and connect you with
            others who share your passion for culinary delights.
          </p>
          <button className='bg-gradient-to-r from-cyan-800 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold rounded-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 '>Share Your Recipe</button>
        </div>
        {/* right */}
        <div className='w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0 animate-float'> <img className='w-full h-full object-cover rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-shadow duration-300' src={image1} alt="Delicious Recipe" /> </div>
      </div>

      <AllRecipes />
  
    </div>
  );
}
