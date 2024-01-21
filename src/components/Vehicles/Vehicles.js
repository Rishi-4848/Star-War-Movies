import React, { useState,useEffect } from 'react';
import "./Vehicles.css";
import axios from 'axios';
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const Vehicles = ({vehiclesData}) => {

   //state to keep track of data fetched from vehicles links
  const [data,setData] = useState([])

 //function to fetch data from vehicles links
  const fetchData = async(url)=>{
     let response = await axios.get(url)
     let responseData = response.data
     
       setData((prev)=>[...prev,responseData])
     
  }


    //function to loop through vehicles links and fetch data
  const performApi = ()=>{
    vehiclesData.map((url)=>(
     fetchData(url)
   ))
  }
  

  //use effect is used to call the performApi() when the vehiclesData prop changes  and set the state (data) to empty
  useEffect(()=>{
   setData([])
   performApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[vehiclesData])



  //function to generate individual toggle to each Vehicle
  const ToggleItem = ({Vehicle})=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [toggle,setToggle] = useState(false)
     //state to keep track of toggle

      //function to perform toggle
    const handleToggle=()=>{
     setToggle((prev)=>!prev)
   }
    return(
      <div className='vehicle__info'>
     {toggle ?(<FaArrowUp onClick={handleToggle}/>):(<FaArrowDown onClick={handleToggle}/>)}

     {toggle ?(
      <div className='vehicle__info-desc'>
        <p>model :{Vehicle.model}</p>
        <p>manufacturer :{Vehicle.manufacturer}</p>
        <p>cost_in_credits :{Vehicle.cost_in_credits}</p>
        <p>length : {Vehicle.length}</p>
        <p>max_atmosphering_speed  : {Vehicle.max_atmosphering_speed}</p>
        <p>crew : {Vehicle.crew}</p>
        <p>passengers : {Vehicle.passengers}</p>
        <p>cargo_capacity : {Vehicle.cargo_capacity}</p>
        <p>consumables : {Vehicle.consumables}</p>
        <p>vehicle_class : {Vehicle.vehicle_class}</p>
        <p>pilots : {Vehicle.pilots}</p>
      </div>
     ):("")}
      </div>
    )
   }
  return (
    <div>
      
      <h1>VEHICLES :</h1>
      {
        data.map((Vehicle,index)=>(
          <div key={index}>
            <div className='Vehicle__header'>
            <h3>{Vehicle.name}</h3>
             <ToggleItem Vehicle={Vehicle}/>
            </div>
          
         </div>
        ))
      }
    </div>
  );
}

export default Vehicles;
