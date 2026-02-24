import React from 'react'
import coverImage from "../assets/blood-donation.jpg";

function Login({ onLogin }) {
  return (
      <div className="relative min-h-screen w-full overflow-hidden">
      
    
      <div className="absolute inset-0">
        
          <img
          src={coverImage}
          alt="Blood Donation"
          className="absolute inset-0 w-full h-full object-cover"
        />

       
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-red-800/80 flex flex-col justify-center items-center text-white text-center px-6 ">
          <h1 className='text-5xl font-extrabold leading-tight'>
          Donate Blood,
        </h1>
        <h1 className="text-4xl font-light mt-2">
          Save Lives
        </h1>

        <p className="mt-6 max-w-xl text-red-100 text-lg">
          Every drop counts. Join our community and make
          a difference today.
        </p>

         <button 
          onClick={onLogin}
          className="mt-10 bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-700 transition">
            Get Started
        </button>

      </div>
    </div>  

      <div className='flex-1 flex items-center justify-center px-6'>
    
      </div>
    </div>  
  )
}

export default Login