import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Constants/BASE_URL";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();   
  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email || !password){
        setError("Email and password are required");
        return;
    }
    try{
        const response = await axios.post(`${BASE_URL}/user/login`, {
            email,
            password},{
            headers:{
                'Content-Type':'application/json'
            }
        })
        const token = response.data;
        if(!token){
            setError("Invalid login credentials");
            return;
        }
        login(email, token);
        navigate('/')
    }catch(error){
        console.error("Login error:", error);
        setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-20">
   
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-orange-500">
        
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="px-8 py-10 space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
            
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                
                Email Address
                </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 text-gray-800"
              />
            </div>
            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 text-gray-800"
              />
            </div>
            {/* Forgot Password Link */}
            <div className="text-right">
    
              <a
                href="/forgot-password"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              
              Sign In
            </button>
          </form>
          {error && (
            <div className="px-8 pb-4 text-center">
              <p className="text-red-500 font-semibold">{error}</p>
            </div>
          )}
          {/* Register Link */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 text-center">
           
            <p className="text-gray-600">
              
              Don't have an account?
              <a
                href="/register"
                className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
              >
             
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
