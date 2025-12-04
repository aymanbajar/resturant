import logo from "../../public/images/logo.png";
export default function Navbar() {
  return (
    <header className="bg-orange-500 font-serif shadow-md fixed w-full z-10 top-0 left-0 ">
      <nav className="flex flex-row justify-between items-center gap-2 px-2 md:px-4 lg:px-8 xl:px-16 py-2">
        <div className="w-14 h-10 md:w-18 md:h-14 flex-shrink-0 ">
          <img
            className="w-full h-full  object-cover rounded-md"
            src={logo}
            alt="Logo image"
          />
        </div>
        <ul className=" flex flex-row justify-between items-center gap-2 text-sm md:gap-4 md:text-xl text-white font-semibold">
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
        </ul>
      </nav>

    </header>
  );
}
