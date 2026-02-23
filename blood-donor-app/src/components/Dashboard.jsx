import { useState,useEffect} from "react";


function Dashboard() {
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
        return <h1 className="text-center mt-10 text-xl">Loading...</h1>
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
                    return {...donor , requested:true};
                }else{
                    return donor;
                }
            })
        )
    }

    const sortedDonors = sortByAvailability ? [...filteredDonors].sort((a,b) => b.availability - a.availability) : filteredDonors;

  return (
    <div className="min-h-screen bg-gray-100">
        <div className="bg-red-600 text-white p-6 rounded-b-3xl shadow-md">
            <h1 className="text-2xl font-bold">
                Community Blood Donors
            </h1>
            <p className="text-red-100 text-sm mt-1">
                Find and request blood donors quickly.
            </p>
        </div>
        <div className="p-6 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-md space-y-3">
                  <input 
                    type="text"
                    placeholder="Search by city"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  />

                  <select value={selectedBloodGroup} onChange={(e) => setSelectedBloodGroup(e.target.value)}>
                        <option value="">All</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                 </select>

                                
                <button onClick={() => setSortByAvailability(!sortByAvailability)}
                    className="w-full  bg-red-600  text-white py-2 rounded-md hover:bg-red-700 transition"
                    >
                        {sortByAvailability ? "Disable Sort" : "Sort Available First"}
                </button>
            </div>
        </div>

        <div className="flex justify-between text-sm font-medium">
              <span>Total Donors: {donors.length}</span>
              <span>Available Donors: {availableCount}</span>
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
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition space-y-2"
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
                  disabled={donor.requested}
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
                >
                  {donor.requested
                    ? "Request Sent"
                    : "Request Help"}
                </button>

              </div>
            ))
          )}

        </div>

      </div>
    

    
    
  )
}

export default Dashboard