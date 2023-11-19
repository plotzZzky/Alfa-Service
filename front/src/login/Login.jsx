import { useState, useEffect } from 'react';

import NavBar from "../elements/navbar";


export default function Login() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  function go_customers() {
    location.href = "/alfa/login/clientes/"
  }

  function go_employees() {
    location.href = "/alfa/login/equipe/"
  }

  return (
    <>
      <NavBar></NavBar>

      <div className="page">

        <div className='login-align-cards'>
          <div className='login-card login-img_a' onClick={go_customers}>
            <h2 className='title'> Clientes </h2>
          </div>

          <div className='login-card login-img_b' onClick={go_employees}>
            <h2 className='title'> Equipe </h2>
          </div>
        </div>  
      </div>
    </>
  )
}