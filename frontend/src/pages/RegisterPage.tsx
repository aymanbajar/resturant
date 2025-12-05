/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { BASE_URL } from "../Constants/BASE_URL";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
export default function RegisterPage() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });   
    const[error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    try{
        const response =  await axios.post(`${BASE_URL}/user/register`,{
            firstName: dataForm.firstName,
            lastName: dataForm.lastName,
            email: dataForm.email,
            password: dataForm.password},{
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.data){
            setError("Registration failed");
            return;
        }
    setDataForm({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    navigate('/')
    const token = response.data;
    login(dataForm.email, token);
    }catch(error: any){
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* card */}
        <div className=" flex flex-col gap-4 p-4 shadow-2xl border-2  border-orange-500 rounded-lg">
          {/* form    */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* first name input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold"
              >
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="firstName"
                value={dataForm.firstName}
                onChange={(e) => setDataForm({...dataForm, firstName: e.target.value})}
                placeholder="Your Name"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            {/*last name input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold"
              >
                Last Name
              </label>
              <input
                type="text"
                id="name"
                name="lastName"
                value={dataForm.lastName}
                onChange ={(e) => setDataForm({...dataForm,lastName:e.target.value})}
                placeholder="Your Last Name"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            {/* email input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={dataForm.email}
                onChange={(e) => setDataForm({...dataForm, email: e.target.value})}
                placeholder="Your Email Address"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            {/* password input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={dataForm.password}
                onChange={(e) => setDataForm({...dataForm, password: e.target.value})}
                placeholder="Your Password"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Register
            </button>
          </form>
            {error && (
            <p className="text-red-500 text-center mt-2">{error}</p>
            )}
          <p className="text-gray-600 text-center mt-4">
            Are you have an account?{" "}
            <a
              href="/login"
              className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
