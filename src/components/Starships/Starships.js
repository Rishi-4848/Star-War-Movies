import React, { useState,useEffect } from 'react';
import "./Starships.css";
import axios from 'axios';
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const Starships = ({StarshipsData}) => {

  //state to keep track of data fetched from starships links
  const [data,setData] = useState([])

 //function to fetch data from starships links
  const fetchData = async(url)=>{
     let response = await axios.get(url)
     let responseData = response.data
     
       setData((prev)=>[...prev,responseData])
     
  }


  //function to loop through starships links and fetch data
  const performApi = ()=>{
    StarshipsData.map((url)=>(
     fetchData(url)
   ))
  }
  

   //use effect is used to call the performApi() when the StarshipsData prop changes  and set the state (data) to empty
  useEffect(()=>{
   setData([])
   performApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[StarshipsData])



    //function to generate individual toggle to each Starship
  const ToggleItem = ({Starship})=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [toggle,setToggle] = useState(false)
    //state to keep track of toggle

      //function to perform toggle
    const handleToggle=()=>{
     setToggle((prev)=>!prev)
   }
    return(
      <div className='starship__info'>
     {toggle ?(<FaArrowUp onClick={handleToggle}/>):(<FaArrowDown onClick={handleToggle}/>)}

     {toggle ?(
      <div className='starship__info-desc'>
        <p>model :{Starship.model}</p>
        <p>manufacturer :{Starship.manufacturer}</p>
        <p>cost_in_credits :{Starship.cost_in_credits}</p>
        <p>length : {Starship.length}</p>
        <p>max_atmosphering_speed  : {Starship.max_atmosphering_speed}</p>
        <p>crew : {Starship.crew}</p>
        <p>passengers : {Starship.passengers}</p>
        <p>cargo_capacity : {Starship.cargo_capacity}</p>
        <p>consumables : {Starship.consumables}</p>
        <p>hyperdrive_rating : {Starship.hyperdrive_rating}</p>
        <p>MGLT : {Starship.MGLT}</p>
        <p>starship_class : {Starship.starship_class}</p>
        <p>pilots : {Starship.pilots}</p>
        
      </div>
     ):("")}
      </div>
    )
   }
  return (
    <div>
        <h1>STARSHIPS :</h1>
      {
        data.map((Starship,index)=>(
          <div key={index}>
            <div className='Starship__header'>
            <h3>{Starship.name}</h3>
             <ToggleItem Starship={Starship}/>
            </div>
          
         </div>
        ))
      }
    </div>
  );
}

export default Starships;
