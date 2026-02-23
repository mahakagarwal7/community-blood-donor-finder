import { useState,useEffect} from "react";


function Dashboard({ onLogout }) {
    const [donors,setDonors] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedBloodGroup,setSelectedBloodGroup] = useState("");
    const [searchCity,setSearchCity] = useState("");
    const [sortByAvailability , setSortByAvailability] = useState(false);
    const [error,setError] = useState(null);


    useEffect(() =>{
        async function fetchDonors(){
          try{
             const response = await fetch("https://jsonplaceholder.typicode.com/users");

             if(!response.ok){
                throw new Error("Network response was not ok");
             }

             const data = await response.json();

              const bloodGroups = ["A+","B+","O-","AB+"];
           
          
         
              const mappedDonors = data.map(user => {
              const index = Math.floor(Math.random() * bloodGroups.length);
              return {
                 id: user.id,
                 name: user.name,
                 email: user.email,
                 city: user.address.city,
                 bloodGroup: bloodGroups[index],
                 availability: Math.random() > 0.5,
                 requested: false
              };
           });
           setDonors(mappedDonors);


            
          }catch(err){
             setError("Failed to load donors.Please try again.");
          }finally{
              setLoading(false);
          }
            
               

        }

        fetchDonors();
  
    },[]);

    
      
       

    if(loading){
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
       );
    }

    if(error){
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-sm">

        <p className="text-red-600 font-semibold mb-4">
          {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Retry
        </button>

      </div>
    </div>
  );
}

   const filteredDonors = donors.filter(donor => {
      const bloodMatch = selectedBloodGroup === "" || donor.bloodGroup === selectedBloodGroup;

      const cityMatch = donor.city.toLowerCase().includes(searchCity.toLowerCase());

      return bloodMatch && cityMatch;
   })

    const availableCount = filteredDonors.filter(donor => donor.availability === true).length;


    function handleRequest(id){
        setDonors(
            donors.map(donor =>{
                if(donor.id === id){
                    return {...donor , requested:!donor.requested};
                }else{
                    return donor;
                }
            })
        )
    }

    const sortedDonors = sortByAvailability ? [...filteredDonors].sort((a,b) => b.availability - a.availability) : filteredDonors;

  return (
    <div className="min-h-screen bg-gray-100">
        <div className="relative bg-gradient-to-r from-red-600 to-red-500 text-white p-10 rounded-b-3xl shadow-lg">
            <h1 className="text-3xl font-extrabold">
                Welcome to LifeSaver Network
            </h1>
            <p className="text-red-100 text-sm mt-2">
                 Together we connect donors with those in need.
                 Every request brings hope closer.
            </p>

         <button
          onClick={onLogout}
                className="absolute top-6 right-6 bg-white text-red-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition"
          >
            Logout
      </button>
        </div>
        <div className="p-6 space-y-6 -mt-6">
            <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
                  <input 
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    type="text"
                    placeholder="Search by city"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  />



                  <select className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" value={selectedBloodGroup} onChange={(e) => setSelectedBloodGroup(e.target.value)}>
                        <option value="">All</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                 </select>

                                
                <button onClick={() => setSortByAvailability(!sortByAvailability)}
                    className="w-full  bg-red-600  text-white py-3 rounded-lg hover:bg-red-700 transition"
                    >
                        {sortByAvailability ? "Disable Sort" : "Sort Available First"}
                </button>
            </div>

            <p className="text-gray-500 text-sm">
                 Browse available donors and send requests instantly.
            </p>

      <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-5 rounded-2xl shadow-md text-center">
              <p className="text-gray-500 text-sm">Total Donors</p>
               <p className="text-3xl font-bold text-red-600 mt-1">
                  {sortedDonors.length}
              </p>

            
            </div>
            
            <div className="bg-white p-5 rounded-2xl shadow-md text-center">
            <p className="text-gray-500 text-sm">Available Donors</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
                    {availableCount}
            </p>
            </div>



      </div>
        

       


    
    

    

 <div className="grid gap-4 md:grid-cols-2">

          {sortedDonors.length === 0 ? (
            <h3 className="text-center col-span-2">
              No donors found
            </h3>
          ) : (
            sortedDonors.map(donor => (
              <div
                key={donor.id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-200 space-y-3"
              >
                <p className="font-semibold text-lg">
                  {donor.name}
                </p>

                <p className="text-sm text-gray-600">
                  {donor.email}
                </p>

                <p className="text-sm">
                  City: {donor.city}
                </p>

                <p className="text-sm">
                  Blood Group: {donor.bloodGroup}
                </p>

              
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    donor.availability
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {donor.availability
                    ? "Available"
                    : "Unavailable"}
                </span>

                <button
                  onClick={() => handleRequest(donor.id)}
                  
                  className={`w-full py-2 rounded-md transition ${
                
                   donor.requested
                    ? "bg-gray-500 text-white hover:bg-gray-600"
                    : "bg-red-600 text-white hover:bg-red-700"}`}>

                    {donor.requested ? "Withdraw Request" : "Request Help"}
                </button>

              </div>
            ))
          )}

        </div>

      </div>

    </div>  
    

    
    
  )
}

export default Dashboard