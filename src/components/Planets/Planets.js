import React, { useState,useEffect } from 'react';
import "./Planets.css";
import axios from 'axios';
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const Planets = ({planetsData}) => {
 
  //state to keep track of data fetched from planets links
  const [data,setData] = useState([])

 
  //function to fetch data from planets links
  const fetchData = async(url)=>{
     let response = await axios.get(url)
     let responseData = response.data
     
       setData((prev)=>[...prev,responseData])
     
  }

   //function to loop through planets links and fetch data
  const performApi = ()=>{
    planetsData.map((url)=>(
     fetchData(url)
   ))
  }
  

  //use effect is used to call the performApi() when the planetsData prop changes  and set the state (data) to empty
  useEffect(()=>{
   setData([])
   performApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[planetsData])


  //function to generate individual toggle to each planet
  const ToggleItem = ({planet})=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [toggle,setToggle] = useState(false)
     //state to keep track of toggle

     //function to perform toggle
    const handleToggle=()=>{
     setToggle((prev)=>!prev)
   }
    return(
      <div className='planet__info'>
     {toggle ?(<FaArrowUp onClick={handleToggle}/>):(<FaArrowDown onClick={handleToggle}/>)}

     {toggle ?(
      <div className='planet__info-desc'>
        <p>rotation_period :{planet.rotation_period}</p>
        <p>orbital_period :{planet.orbital_period}</p>
        <p>diameter :{planet.diameter}</p>
        <p>climate : {planet.climate}</p>
        <p>gravity  : {planet.gravity}</p>
        <p>terrain : {planet.terrain}</p>
        <p>surface_water : {planet.surface_water}</p>
        <p>population : {planet.population}</p>
      </div>
     ):("")}
      </div>
    )
   }
  return (
    <div>
      <h1>PLANETS :</h1>
      {
        data.map((planet,index)=>(
          <div key={index}>
            <div className='planet__header'>
            <h3>{planet.name}</h3>
             <ToggleItem planet={planet}/>
            </div>
          
         </div>
        ))
      }
    </div>
  );
}

export default Planets;
