
import { useState,useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MovieDetail from './components/MovieDetail/MovieDetail';
import MovieList from './components/MoviesList/MovieList';
import axios from "axios"



function App() {
 
  //state to keep track of selected movie id
  const [selectedId,setSelectedId] = useState(0);
  //state to keep track of movie data
  const [data,setData] = useState([]);
  //state to keep track selected movie characters
  const [characterData,setCharacterData] = useState([])
  //state to keep track selected movie planets
  const [planetsData,setPlanetsData] = useState([]);
  //state to keep track selected movie starships
  const [StarshipsData,setStarshipsData] = useState([]);
  //state to keep track selected movie vehicles
  const [vehiclesData,setVehiclesData] = useState([]);
  //state to keep track selected movie species
  const [SpeciesData,setSpeciesData] = useState([]);
  //state to keep track of displaydata after applying sort & search
 const [disPlayData,setDisplayData] = useState([])

//function  to fetch characterdata of selected movie
  const fetchCharacterData=(data)=>{
    setCharacterData(data)
  }

  //function  to fetch planetsData of selected movie
  const fetchPlanetsData = (data) =>{
    setPlanetsData(data)
  }

  //function  to fetch StarshipsData of selected movie
  const fetchStarshipsData = (data)=>{
    setStarshipsData(data)
  }

  //function  to fetch vehiclesData of selected movie
  const fetchVehiclesData = (data)=>{
    setVehiclesData(data)
  }

  //function  to fetch SpeciesData of selected movie
  const fetchSpeciesData = (data)=>{
    setSpeciesData(data)
  }

  //function to fetch movies data
  const fetchMovies = async ()=>{
    const data = await  axios.get("https://swapi.dev/api/films/?format=json")
  //  console.log(data.data)
    setData(data.data.results)
  }
  
  //useeffect hook used to call the fetchmovies function during the intial render
  useEffect(()=>{
    fetchMovies()
    
  },[])


  
  

  return (
    <div className="App">
        
        
         <Header data={data} setDisplayData={setDisplayData}/>
         <div className='content__wrapper'>

          <div className='movieList__container'>
          <MovieList disPlayData={disPlayData} setSelectedId={setSelectedId} data={data} 
          fetchCharacterData={fetchCharacterData} fetchPlanetsData={fetchPlanetsData} fetchStarshipsData={fetchStarshipsData}
           fetchVehiclesData={fetchVehiclesData} fetchSpeciesData={fetchSpeciesData}/>
          </div>

         
          <div className='movieDetail__container'>
          <MovieDetail  selectedId={selectedId} data={data} characterData={characterData} 
          planetsData={planetsData} StarshipsData={StarshipsData} vehiclesData={vehiclesData} SpeciesData={SpeciesData}/>
            </div>

         </div>
    
    </div>
  );
}

export default App;
