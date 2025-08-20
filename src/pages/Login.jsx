import React from 'react';
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../Context/authContext';

const Login = () => {
  const [email ,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {login} = useAuth();
  
  const [error,setError]=useState(null);
  
  const navigate =useNavigate();

    const handleSubmit=async(event)=>{
      event.preventDefault();
      try{
        const response =await axios.post('https://emsbackend-z0kf.onrender.com/api/auth/login',{email,password});

        if(response.data.success){
          login(response.data.token);
          localStorage.setItem('token',response.data.token);
          if(response.data.user.role ==='Admin'){
            navigate('/admin-dashboard');
          }else if(response.data.user.role ==='Employee'){
            navigate('/employee-dashboard');
          }else{
            navigate('/login');
          }
    
          setEmail('');
          setPassword('');
        }
      }catch(error){
  if (error.response && error.response.data && error.response.data.error) {
    setError(error.response.data.error);
  } else {
    setError('Server error');
  }
}
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-Playwrite-900 text-center text-gray-800 mb-6">
          Employee Management System
        </h2>

        <form onSubmit={handleSubmit}>
         
          {error && <p className='text-red-500'> {error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              onChange={(e)=>setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>

          <div className="text-right mt-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
