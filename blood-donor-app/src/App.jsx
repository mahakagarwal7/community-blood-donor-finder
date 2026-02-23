import { useState } from 'react'
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogin(){
       setIsLoggedIn(true);
    }
   
    if(isLoggedIn){
      return <Dashboard onLogout={() => setIsLoggedIn(false)}/>
    }else{
       return <Login onLogin={handleLogin} />
    }

    
}

export default App
