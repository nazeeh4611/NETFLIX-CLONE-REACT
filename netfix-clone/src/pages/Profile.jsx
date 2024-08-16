import React, { useEffect, useState } from 'react'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'
import { userAuth } from '../context/context'
import { db } from '../services/firebase'
import { createUrl  } from '../services/movieservices'
import { arrayRemove,doc,updateDoc,onSnapshot } from 'firebase/firestore'

function Profile() {

const [movies,setmovie] = useState([])
const user = userAuth()

useEffect(()=>{
if(user){
  onSnapshot(doc(db,'users',`${user.email}`),(doc)=>{
    if(doc.data()) setmovie(doc.data().favShows);
  });
}
},[user?.email]);



if(!user){
  return <><p>fetching shows....</p></>
}

const slide = (offset)=>{
  const slider = document.getElementById('slider')
  slider.scrollLeft=slider.scrollLeft + offset
}

  return (
    <>
      <div>
        <div>
          <img
            className="block w-full h-[500px] object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg"
            alt=""
          />
          <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 md:p-8">
            <h1 className="text-3xl md:text-6xl font-nsans-bold text-white">
              My Shows
            </h1>
            <p className="font-nsans-light text-gray-400 text-lg">
              {user.email}
            </p>
          </div>
        </div>

        <h2 className="font-nsans-bold md:text-xl p-4 capitalize">Fav Shows</h2>

        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={() => slide(-500)}
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
          <div
            id="slider"
            className=" w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {movies.map(({id,title,backdrop_path,poster_path}) => (
              <div
                key={id}
                className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
              >
                                <img
                    className="w-full h-40 block object-cover object-top"
                    src={createUrl(backdrop_path ?? poster_path, "w500")}
                    alt={title}
                  />
                <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                  <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                    {title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <MdChevronRight
            onClick={() => slide(500)}
            className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
          />
        </div>
      </div>
    </>
  );
}

export default Profile