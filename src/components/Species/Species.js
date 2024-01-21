import React, { useState,useEffect } from 'react';
import "./Species.css";
import axios from 'axios';
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const Species = ({SpeciesData}) => {

   //state to keep track of data fetched from species links
  const [data,setData] = useState([])

 //function to fetch data from species links
  const fetchData = async(url)=>{
     let response = await axios.get(url)
     let responseData = response.data
     
       setData((prev)=>[...prev,responseData])
     
  }


  //function to loop through species links and fetch data
  const performApi = ()=>{
    SpeciesData.map((url)=>(
     fetchData(url)
   ))
  }
  

  //use effect is used to call the performApi() when the SpeciesData prop changes  and set the state (data) to empty
  useEffect(()=>{
   setData([])
   performApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[SpeciesData])



  //function to generate individual toggle to each species
  const ToggleItem = ({Species})=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [toggle,setToggle] = useState(false)
      //state to keep track of toggle

      //function to perform toggle
    const handleToggle=()=>{
     setToggle((prev)=>!prev)
   }
    return(
      <div className='species__info'>
     {toggle ?(<FaArrowUp onClick={handleToggle}/>):(<FaArrowDown onClick={handleToggle}/>)}

     {toggle ?(
      <div className='species__info-desc'>
        <p>classification :{Species.classification}</p>
        <p>designation :{Species.designation}</p>
        <p>average_height :{Species.average_height}</p>
        <p>skin_colors : {Species.skin_colors}</p>
        <p>hair_colors  : {Species.hair_colors}</p>
        <p>eye_colors : {Species.eye_colors}</p>
        <p>average_lifespan : {Species.average_lifespan}</p>
        <p>homeworld : {Species.homeworld}</p>
        <p>language : {Species.language}</p>
      </div>
     ):("")}
      </div>
    )
   }
  return (
    <div>
      <h1>SPECIES :</h1>
      {
        data.map((Species,index)=>(
          <div key={index}>
            <div className='Species__header'>
            <h3>{Species.name}</h3>
             <ToggleItem Species={Species}/>
            </div>
          
         </div>
        ))
      }
    </div>
  );
}

export default Species;
