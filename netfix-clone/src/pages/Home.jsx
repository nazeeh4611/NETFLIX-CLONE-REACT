import React from 'react'
import Hero from '../components/Hero'
import MovieRaw from '../components/MovieRaw'
import endpoints from '../services/movieservices'

function Home() {
  return (
    <>
      <Hero/>
   <MovieRaw title="upcoming" url={endpoints.upcoming}/>
   <MovieRaw title="trending" url={endpoints.trending}/>
   <MovieRaw title="top rated" url={endpoints.topRated}/>
   <MovieRaw title="comedy" url={endpoints.comedy}/>
   <MovieRaw title="popular" url={endpoints.popular}/>
    </>
 
  )
}

export default Home