import React, { useEffect, useState } from 'react';
import "./Header.css";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const Header = ({data,setDisplayData}) => {

  //state to toggle the sort container
  const [toggle,setToggle] = useState(false)
  //state to keep track of selected sort option
  const [sort,setSort] = useState("");
  //state to keep track of search input
  const [search,setSearch] = useState("");

  //function to handle toggle
  const handleToggle=()=>{
    setToggle((prev)=>!prev)
  }

  //function to assign selected sort option to sort state
  const handleSort=(sort)=>{
    setSort(sort)
    console.log(sort,"sort")
  }


  //function to assign search input to search state
  const handleInput=(value)=>{
    setSearch(value)
  }

 
  //function to filter the data based on sort or search data
  const generateDisplayData=()=>{

    
    let updateData = data
    // console.log("updateData",updateData)

    if(sort.length){
      if(sort === "episode"){
        updateData = updateData.sort((a,b)=>(
          a.episode_id-b.episode_id
        ))
      }

      if(sort === "date"){
        updateData = updateData.sort((a,b)=>(
           new Date(a.release_date) - new Date(b.release_date)
        ))
      }
     
    }else{
      updateData=[...updateData]
    }

    if(search.length ){
      updateData=updateData.filter((movie)=>(
       movie.title.toLowerCase().includes(search)
         
      ))
    }else{
      updateData=[...updateData]
    }

   //updated data is assigned to the setDisplayData prop
    setDisplayData(updateData)
  }

  //use effect hook is used to render generateDisplayData() ,when sort or search state updates
  useEffect(()=>{
    generateDisplayData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[sort,search])

  return (
    <div className='header__wrapper'>
      


      <div className='input__container'>
        <input placeholder='Enter Movie Name...' onChange={(e)=>handleInput(e.target.value)}></input>
      </div>

      <div className='sort__container'>

        <div className='sort__header'>
        <h3>SORT</h3>
        {toggle ?(<FaArrowUp onClick={handleToggle}/>):(<FaArrowDown onClick={handleToggle}/>)}
      </div>

      
      {toggle ? (
        <div className='sort__body'>
          <div className='sort__item'  onClick={()=>handleSort("episode")}>
          EPISODE
          </div>
          <div className='sort__item'  onClick={()=>handleSort("date")}>
          DATE
            </div>
              
        </div>
      ):("")}
        </div>
    </div>
  );
}

export default Header;
