import logo from "../../public/images/logo.png";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
export default function Navbar() {
  const navigate = useNavigate  ();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const{isAuthenticated , logout}=useAuth();
  return (
    <header className="bg-orange-500 font-serif shadow-md fixed w-full z-10 top-0 left-0 ">
      <nav className="flex flex-row justify-between items-center gap-2 px-2 md:px-4 lg:px-8 xl:px-16 py-2">
        <div className="w-14 h-8 md:w-18 md:h-14 flex-shrink-0 ">
          <img
            className="w-full h-full  object-cover rounded-md"
            src={logo}
            alt="Logo image"
          />
        </div>
        <ul className=" hidden md:flex flex-row justify-between items-center gap-2 text-sm md:gap-4 md:text-xl text-white font-semibold">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/recipes">Recipes</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          {!isAuthenticated ? (
            <li  
              onClick={() => navigate('/login')}
            className=" bg-cyan-600 hover:bg-cyan-700 text-white text-center px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">Login</li>
          ) :(
            <li  
              onClick={() => {
                navigate('/');
                logout();
              }}
            className=" bg-cyan-600 hover:bg-cyan-700 text-white text-center px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">log out</li>
          )}
        </ul>
        <CiMenuBurger
          onClick={() => setIsOpenMenu(true)}
          className="md:hidden text-3xl"
        />
        {isOpenMenu && (
          <>
            <div
              className="fixed inset-0  bg-opacity-50 z-40 backdrop-blur-sm animate-fade-in"
              onClick={() => setIsOpenMenu(false)}
            >
              {/* w-64 bg-gradient-to-b from-orange-500 to-orange-600 */}
              <div className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-orange-500 to-orange-600 z-50 shadow-2xl animate-slide-in">
                <div className="flex flex-col h-full justify-center items-center">
                  <div className="absolute top-0 right-0 p-6">
                    <IoCloseOutline
                      onClick={() => setIsOpenMenu(false)}
                      className="text-4xl text-white cursor-pointer hover:text-cyan-300 hover:rotate-90 transition-all duration-300"
                    />
                  </div>
                  {/* Menu Items */}
                  <ul className="flex flex-col items-center gap-6 px-8 py-4 text-white font-semibold text-xl w-full">
                    <li className="w-full border-b border-white/20 pb-3 hover:border-cyan-300 transition-colors text-center">
                      <a
                        href="/"
                        className="block hover:text-cyan-300 transition-all duration-300"
                      >
                        Home
                      </a>
                    </li>
                    <li className="w-full border-b border-white/20 pb-3 hover:border-cyan-300 transition-colors text-center">
                      <a
                        href="/recipes"
                        className="block hover:text-cyan-300 transition-all duration-300"
                      >
                        Recipes
                      </a>
                    </li>
                    <li className="w-full border-b border-white/20 pb-3 hover:border-cyan-300 transition-colors text-center">
                      <a
                        href="/about"
                        className="block hover:text-cyan-300 transition-all duration-300"
                      >
                        About
                      </a>
                    </li>
                    <li className="w-full border-b border-white/20 pb-3 hover:border-cyan-300 transition-colors text-center">
                      <a
                        href="/contact"
                        className="block hover:text-cyan-300 transition-all duration-300"
                      >
                        Contact
                      </a>
                    </li>
                    <li 
                     onClick={() => navigate('/login')}
                    className="w-full pt-4 bg-cyan-600 hover:bg-cyan-700 text-white text-center py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Login
                      
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
