import React from 'react'

function Login() {
 
const handleLogin= async() =>{
  const response = await AuthenticatorAssertionResponse.login(user)
  
} 
 
  return (
    <div>Login</div>
  )
}

export default Login