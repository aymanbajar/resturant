export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white font-serif py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-sm md:text-xl lg:text-2xl xl:text-3xl">
        <p>&copy; {new Date().getFullYear()} RecipeShare. All rights reserved.</p>
      </div>
    </footer>
  );
}