import { useState,useEffect} from "react";


function Dashboard() {
    const [donor,setDonors] = useState([]);
    const [loading,setLoading] = useState(true);
   

    useEffect(() =>{
      fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
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
           setLoading(false);

      });
       

    },[]);

    if(loading){
        return <h1>Loading...</h1>
    }

  return (
    <>
    <h1>Total Donors: {donor.length}</h1>
    {donor.map(donor =>(
        <div key={donor.id}>
            <p>Name: {donor.name}</p>
            <p>Email: {donor.email}</p>
            <p>Blood Group: {donor.bloodGroup}</p>
            <p>Available: {donor.availability ? "Yes" : "No"}</p>
        </div>
    ))}
    </>
  )
}

export default Dashboard