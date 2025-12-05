import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/Auth/AuthProvider";
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
        </Routes>
      </BrowserRouter>
      <Footer />
        </AuthProvider>
    </>
  );
}

export default App;
