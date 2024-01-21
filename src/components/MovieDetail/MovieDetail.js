import React, { useEffect, useState } from 'react';
import "./MovieDetail.css";
import Character from '../Character/Character';
import Planets from '../Planets/Planets';
import Starships from '../Starships/Starships';
import Vehicles from '../Vehicles/Vehicles';
import Species from '../Species/Species';

const MovieDetail = ({selectedId,data,characterData,planetsData,StarshipsData,vehiclesData,SpeciesData}) => {

  //state to keep track of selected movie data
  const [selectedMovie,setSelectedMovie] = useState([]);


  //function to filter the selected movie data
  const selectedMovieFunc =()=>{
  const filter =  data.filter((film)=>(
         film.episode_id ===selectedId
    ))
    
    
    // console.log(filter,selectedId)
    setSelectedMovie(filter)
  }

  



  

 //useffect hook is used render selectedMovieFunc() based on prop selectedId
  useEffect(()=>{
    selectedMovieFunc()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedId])


  return (
    <div>
      {selectedMovie.length ?(
        selectedMovie.map((movie,index)=>(
          <div key={index} className='movie__container'>
            <div className='movie__info'>
            <h2>Title :{movie.title}</h2>
          <h3>Director : {movie.director}</h3>
          <h3>Producer : {movie.producer}</h3>

          <div>
            <h2>opening_crawl :</h2>
            <p> {movie.opening_crawl}</p> 
         </div>
            </div>

          

            <div className='movie__description'>
              
               <Character characterData={characterData}/>
               <Planets planetsData={planetsData}/>
               <Starships StarshipsData={StarshipsData}/>
               <Vehicles vehiclesData={vehiclesData}/>
               <Species SpeciesData={SpeciesData}/>
            </div>

        
        </div>
        ))
       
      ) :( <div className='empty__div'><h1>select a movie</h1></div>)
       
      }
     
    </div>
  );
}

export default MovieDetail;
