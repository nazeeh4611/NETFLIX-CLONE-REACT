import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import endpoints, { createUrl } from '../services/movieservices'

function Hero() {
    const [movie,setmovie] = useState({})
    useEffect(() => {
        axios.get(endpoints.popular)
          .then(response => {
          const movies = response.data.results;
          const randomMovie =movies[Math.floor(Math.random() *movies.length)]
          setmovie(randomMovie)
           })
          .catch(err => {
            console.error(err);
          });
      }, []);

      const truncate = (str,len)=>{
       if(!str)return ''
       return str.length > len?str.slice(0,len)+'...' : str;
      }

      if(!movie) return(
        <>
        <p>fetching movie...</p>
        </>
      )

   const {title,backdrop_path,release_date,overview} = movie;

        return (
    <div className='w-full h-[550px] lg:h[850px]'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] lg:h[850px] bg-gradient-to-r from-black'>
         <img className='w-full h-full object-cover object-top' src={createUrl(backdrop_path,'original')} alt="title" />
         <div className='absolute w-full top-[20%] lg:top-[35%] p-4 md:p-8'>
            <h1 className=' text-3xl md:text-6xl font-nsans-bold'>{title}</h1>
            <div className=' mt-8 mb-4'>
            <button className=' capitalize border bg-gray-300 text-black py-2 px-5'>play</button>
            <button className='capitalize border-grey-300 py-2 px-5 ml-4'>watch later </button>
            </div>
            <p className='text-gray-400 text-sm'>{release_date}</p>
            <p>{truncate(overview,165)}</p>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Hero