

import "./MovieList.css";


const MovieList = ({setSelectedId,data,fetchCharacterData,fetchPlanetsData,fetchStarshipsData,fetchVehiclesData,fetchSpeciesData,disPlayData}) => {
    //transfered props from app.js

    //function to asign require date of selected movie to the functions came as props
  const fetchId = (id,character,planet,starships,vehicles,species)=>{
    setSelectedId(id)
    fetchCharacterData(character)
    fetchPlanetsData(planet)
    fetchStarshipsData(starships)
    fetchVehiclesData(vehicles)
    fetchSpeciesData(species)
  }



  return (
    <div>
     {disPlayData.length ? (
       disPlayData.map((movies,index)=>(
        <div key={index} className='movie__header' onClick={()=>fetchId(movies.episode_id,movies.characters,movies.planets,
        movies.starships,movies.vehicles,movies.species)}>
          <p>Episode-{movies.episode_id}</p>
          <p>{movies.title}</p>
          <p>{movies.release_date}</p>
        </div>
      ))
     ):(
      data.map((movies,index)=>(
        <div key={index} className='movie__header' onClick={()=>fetchId(movies.episode_id,movies.characters,movies.planets,movies.starships,
        movies.vehicles,movies.species)}>
          <p>Episode-{movies.episode_id}</p>
          <p>{movies.title}</p>
          <p>{movies.release_date}</p>
        </div>
      ))
     )
     
     }
    </div>
  );
}

export default MovieList;
