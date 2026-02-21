import React from 'react'

function Login({ onLogin }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
    <h1 className="text-2xl font-bold mb-4">Blood Donor Finder</h1>
    <button 
       onClick={onLogin}
       className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
        Login
        </button>
       </div>
      </div>  
  )
}

export default Login