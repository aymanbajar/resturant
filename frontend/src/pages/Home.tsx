import image1 from "../../public/images/image1.png";
import "../animations/fade-in.css"
import "../animations/float.css"
export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* hero section */}
      <div className="flex flex-col md:flex-row justify-between  items-center gap-8 px-4 md:px-8 lg:px-16 xl:px-32 py-12 md:py-20 ">
        {/* left */}
        <div className='flex flex-col justify-start items-start gap-6 max-w-2xl animate-fade-in font-serif '>
          <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl leading-tight'>Share Your Favorite Recipe With the World</h1>
          <p className='text-base md:text-lg text-orange-500 leading-relaxed'>
            Discover, cook, and share your favorite recipes with our vibrant
            community of food enthusiasts. Whether you're a seasoned chef or a
            home cook, our platform is designed to inspire and connect you with
            others who share your passion for culinary delights.
          </p>
          <button className='bg-gradient-to-r from-cyan-800 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold rounded-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>Share Your Recipe</button>
        </div>
        {/* right */}
        <div className='w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0 animate-float'> <img className='w-full h-full object-cover rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-shadow duration-300' src={image1} alt="Delicious Recipe" /> </div>
      </div>

      {/* div wave */}
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ff5500"
            fill-opacity="1"
            d="M0,288L26.7,266.7C53.3,245,107,203,160,186.7C213.3,171,267,181,320,197.3C373.3,213,427,235,480,240C533.3,245,587,235,640,208C693.3,181,747,139,800,106.7C853.3,75,907,53,960,69.3C1013.3,85,1067,139,1120,160C1173.3,181,1227,171,1280,170.7C1333.3,171,1387,181,1413,186.7L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
