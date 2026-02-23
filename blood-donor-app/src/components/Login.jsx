import React from 'react'
import coverImage from "../assets/blood-donation.jpg";

function Login({ onLogin }) {
  return (
      <div className="h-screen flex flex-col">
      
    
      <div className="relative h-[65vh]">
        
          <img
          src={coverImage}
          alt="Blood Donation"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-red-700/70 flex flex-col justify-center items-center text-white px-6 text-center">
          <h1 className='text-4xl font-bold mb-2'>
          Donate Blood,
        </h1>
        <h1 className="text-4xl font-bold mb-4">
          Save Life!
        </h1>

        <p className="text-sm text-red-100 max--w-md">
          Your small act of kindness can save someone's life.
          Join our community of life savers.
        </p>
      </div>
    </div>  

      <div className='h-[35vh] bg-gray-100 flex items-center justify-center px-6 pt-8'>
    <button 
       onClick={onLogin}
       className="w-full max-w-md bg-red-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-red-700 transition">
        Get Started
        </button>
      </div>
    </div>  
  )
}

export default Login