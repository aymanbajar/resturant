import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/Auth/AuthProvider";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyRecipes from "./pages/MyRecipes";
import AddRecipe from "./pages/AddRecipe";
function App() {
  return (
    <>
      <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<  HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={ <ProtectedRoute /> }>
            <Route path="/myRecipes" element={<MyRecipes />} />
            <Route path="/addRecipe" element={<AddRecipe />} />


          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
        </AuthProvider>
    </>
  );
}

export default App;
