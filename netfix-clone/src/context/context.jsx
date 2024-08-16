import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'
import {auth,db} from '../services/firebase'
import {count, doc,setDoc} from 'firebase/firestore'

const Authcontext = createContext();

export function AuthContextProvider({children}){

    const [user,Setuser] = useState({})
    useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        Setuser(currentUser)
     })
     return ()=>{
        unsubscribe();
     }
    },[])
    function signup(email,password){
      createUserWithEmailAndPassword(auth,email,password)
      setDoc(doc(db,'users',email),{
        favShows:[],
      })
    }
    
    function login(email,password){
      signInWithEmailAndPassword(auth,email,password)
    }

    function logout(){
        signOut(auth)
    }
    
   const value = useEffect(()=>{
      console.log("hello")
   })

    return(
      <Authcontext.Provider value={{user,signup,login,logout}}>
           {children}
      </Authcontext.Provider>
          
      
    )
}

export function userAuth(){
    return useContext(Authcontext)
}