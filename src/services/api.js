import axios from 'axios';


export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";


const url='https://api.themoviedb.org/3'
const apiKey=import.meta.env.VITE_API_KEY

// trending/all/{time_window}

// TRENDING

// export const fetchTrending = async({timeWindow='day'})=>{
//     const {data}=await axios.get(`${url}/trending/all/${timeWindow}?api_key=${apiKey}`)
//     return data?.results;

// }
export const fetchTrending = async (timeWindow = "day") => {
    const { data } = await axios.get(
      `${url}/trending/all/${timeWindow}?api_key=${apiKey}`
    );
  
    return data?.results;
  };

  // Details of tv shows and movies

  export const fetchDetails = async(type, id)=>{
    const res = await axios.get(`${url}/${type}/${id}?api_key=${apiKey}`)
    return res?.data
  };


  // Credits and cast details

  export const  fetchCredits = async(type, id)=>{
    const res = await axios.get(`${url}/${type}/${id}/credits?api_key=${apiKey}`)
    return res?.data
  }

  // videos


  export const fetchVideos = async (type, id) => {
    const res = await axios.get(
      `${url}/${type}/${id}/videos?api_key=${apiKey}`
    );
    return res?.data;
  };

  // discover movies and tv shows
  
  export const fetchMovies= async(page, sortBy)=>{
    const res = await axios.get(`${url}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`);
    
    return res?.data
  }

  export const fetchTvSeries= async(page, sortBy)=>{
    const res = await axios.get(`${url}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`);
    
    return res?.data
  }

  // search 

  export const searchData = async (query, page) => {
    const res = await axios.get(
      `${url}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
    );
    return res?.data
  };


  // upcoming


  export const fetchupcomingmovies = async () => {
    const res = await axios.get(
      `${url}/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`
    );
    return res?.data
  };

  // recommendations 

  export const fetchrecommendations = async (type,id) => {
    try {
      const res = await axios.get(
        `${url}/${type}/${id}/recommendations?language=en-US&page=1&api_key=${apiKey}`
      );
      return res.data; // Accessing the data property of the response
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      throw error; // Re-throw the error so it can be handled by the calling function
    }
  };
  