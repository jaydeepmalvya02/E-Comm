import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const[email,setEmail]=React.useState('');
  const[password,setPassword]=React.useState('');
  const navigate=useNavigate();

   useEffect(()=>{
     const auth=localStorage.getItem('user');
     if(auth){
       navigate('/')
     }

   },[])

  const handleLogin=async()=>{
    
    let result= await fetch(`shopify-dashboard-red.vercel.app
/login`,{
      method:'post',
      body:JSON.stringify({email,password}),
      headers:{
        'content-type':'application/json'
      }
    });
    result=await result.json();
    console.warn(result);
    if(result.name){
      localStorage.setItem('user',JSON.stringify(result));
      navigate('/')
    }
    else{
      alert('Please Enter correct details')
    }
  }
  return (
    <div className='login'>
      <h1>Login</h1>
      <input type="text"
      className='inputBox' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <input type="password"
      className='inputBox' placeholder='Enter Password'  onChange={(e)=>setPassword(e.target.value)} value={password}/>
      <button  onClick={handleLogin} type="button" className='appButton'>Login</button>
      
    </div>
  )
}

export default Login
