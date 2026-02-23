import React from 'react'
import coverImage from "../assets/blood-donation.jpg";

function Login({ onLogin }) {
  return (
      <div className="min-h-screen flex flex-col bg-gray-100">
      
    
      <div className="relative h-[70vh]">
        
          <img
          src={coverImage}
          alt="Blood Donation"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-red-800/80 flex flex-col justify-center items-center text-white text-center px-6 ">
          <h1 className='text-5xl font-extrabold leading-tight'>
          Donate Blood,
        </h1>
        <h1 className="text-3xl font-bold mt-2">
          Save Lives
        </h1>

        <p className="mt-4 text-red-100 max-w-md">
          Every drop counts. Join our community and make
          a difference today.
        </p>
      </div>
    </div>  

      <div className='flex-1 flex items-center justify-center px-6'>
    <button 
       onClick={onLogin}
       className="w-full max-w-md bg-red-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-red-700 transition">
        Get Started
        </button>
      </div>
    </div>  
  )
}

export default Login