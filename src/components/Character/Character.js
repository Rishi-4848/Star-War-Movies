import React, { useEffect, useState } from 'react';
import "./Character.css";
import axios from 'axios';
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const Character = ({characterData}) => { 

  //state to keep track of data fetched from character links
   const [data,setData] = useState([])

  //function to fetch data from character links
   const fetchData = async(url)=>{
      let response = await axios.get(url)
      let responseData = response.data
      
        setData((prev)=>[...prev,responseData])
      
   }

   //function to loop through character links and fetch data
   const performApi = ()=>{
    characterData.map((url)=>(
      fetchData(url)
    ))
   }
   

   //use effect is used to call the performApi() when the characterdata prop changes  and set the state (data) to empty
   useEffect(()=>{
    setData([])
    performApi()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[characterData])



   //function to generate individual toggle to each character
   const ToggleItem = ({character})=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [toggle,setToggle] = useState(false)
    //state to keep track of toggle

    //function to perform toggle
    const handleToggle=()=>{
     setToggle((prev)=>!prev)
   }
    return(
      <div className='character__info'>
     {toggle ?(<FaArrowUp onClick={handleToggle}/>):(<FaArrowDown onClick={handleToggle}/>)}

     {toggle ?(
      <div className='character__info-desc'>
        <p>height :{character.height}</p>
        <p>mass :{character.mass}</p>
        <p>hair_color :{character.hair_color}</p>
        <p>skin_color : {character.skin_color}</p>
        <p>eye_color  : {character.eye_color}</p>
        <p>birth_year : {character.birth_year}</p>
        <p>gender : {character.gender}</p>
      </div>
     ):("")}
      </div>
    )
   }

  return (
    <div className='character__container'>
      
      <h1>CHARACTERS :</h1>
      
     {data.map((character,index)=>(
           <div key={index}>
            <div className='character__header'>
            <h3>{character.name}</h3>
             <ToggleItem character={character}/>
            </div>
          
         </div>
     ))}
      
     
    </div>
  );
}

export default Character;
