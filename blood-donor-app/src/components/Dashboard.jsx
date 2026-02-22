import { useState,useEffect} from "react";


function Dashboard() {
    const [donors,setDonors] = useState([]);
    const [loading,setLoading] = useState(true);
    const [selectedBloodGroup,setSelectedBloodGroup] = useState("");
   

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

    const filteredDonors = donors.filter(donor => {
        if(selectedBloodGroup === ""){
            return true;
        }else{
            return donor.bloodGroup === selectedBloodGroup;
        }
    });

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

  return (
    <>
    <h1>Total Donors: {donors.length}</h1>
    <h2>Available Donors: {availableCount}</h2>
    <select value={selectedBloodGroup} onChange={(e) => setSelectedBloodGroup(e.target.value)}>
        <option value="">All</option>
        <option value="A+">A+</option>
        <option value="B+">B+</option>
        <option value="O-">O-</option>
        <option value="AB+">AB+</option>
    </select>
    {filteredDonors.map(donor =>(
        <div key={donor.id}>
            <p>Name: {donor.name}</p>
            <p>Email: {donor.email}</p>
            <p>Blood Group: {donor.bloodGroup}</p>
            <p>Available: {donor.availability ? "Yes" : "No"}</p>
            <button onClick={() =>
                 handleRequest(donor.id)}
                 disabled = {donor.requested}
            >{donor.requested ? "Request Sent" : "Request Help"}</button>
        </div>
    ))}

    
    </>
  )
}

export default Dashboard