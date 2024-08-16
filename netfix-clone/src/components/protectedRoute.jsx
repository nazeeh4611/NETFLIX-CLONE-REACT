import React from 'react'
import { userAuth } from '../context/context'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const {user}=userAuth()
    if(!user){
        return <Navigate to='/' />
    }
   return children
}

export default ProtectedRoute