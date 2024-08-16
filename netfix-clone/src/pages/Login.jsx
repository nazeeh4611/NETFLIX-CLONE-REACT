import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { userAuth } from '../context/context'

function Login() {
  const [remeberLogin,setrememberLogin] = useState(true)
  const [email,setemail] = useState('')
  const [password,setPassword] = useState('')

  const {user,login}=userAuth();
  const navigate = useNavigate();

  const handleformsubmit=async(e)=>{
    e.preventDefault()
   try {
    await login(email,password)
    navigate('/')
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <>
    <div className=' w-full h-screen'>
    <img className=' hidden sm:block absolute w-full h-full object-cover ' src="https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_large.jpg" alt="///" />
    <div className=' bg-black/70 fixed top-0 left-0 w-full h-screen' />
    <div className=' fixed w-full px-4 py-24 z-20'>
      <div className=' max-w-[450px] h-[600px] mx-auto bg-black rounded-lg'>
        <div className=' max-w-[320px] mx-auto py-16'>
          <h1 className=' text-3xl font-nsans-bold'>Login</h1>
          <form action="" onSubmit={handleformsubmit} className=' w-full flex flex-col py-4'>

            <input type="email"
             placeholder='email'
              autoComplete='email'
              value={email}
              onChange={(e)=>setemail(e.target.value)}
               className=' p-3 my-2 bg-gray-700 rounded'/>

            <input type="password"
             placeholder='password'
              autoComplete='current-password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
               className=' p-3 my-2 bg-gray-700 rounded'/>

               <button className=' bg-red-600 py-3 my-6 rounded font-nsans-bold'>Login</button>

               <div className=' flex justify-between items-center text-gray-600'>
                <p>
                  <input type="checkbox" className=' mr-2' checked={remeberLogin} onChange={(e)=>setrememberLogin(!remeberLogin)} />Remember me
                </p>
                <p>Need Help?</p>
               </div>
              <p className=' my-4'>
                <span className=' text-gray-600 mr-2'>New to Netflix?</span>
               <Link to='/signup'>Sign up</Link>
              </p>
          </form>
        </div>
      </div>
    </div>
    </div>

    </>
  )
}

export default Login