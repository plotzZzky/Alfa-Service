import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './navbar.css'


export default function NavBar() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getProfile, setProfile] = useState(JSON.parse(sessionStorage.getItem("profile")))

  // Adiciona os items a navbar se estiver na pagina home
  const About = () => {
    return window.location.pathname === "/alfa/" ? (
      <div className="menu-item" onClick={go_about}>
        <a> Sobre </a>
      </div>
    ) : null;
  }

  const Products = () => {
    return window.location.pathname === "/alfa/" ? (
      <div className="menu-item" onClick={go_products}>
        <a> Produtos </a>
      </div>
    ) : null;
  }

  const Faq = () => {
    return window.location.pathname === "/alfa/" ? (
      <div className="menu-item" onClick={go_faq}>
        <a> Duvidas </a>
      </div>
    ) : null;
  }

  // Funções
  function OpenMenu() {
    let navbar = document.getElementsByClassName("menu")[0];
    if (navbar.className == "menu") {
      navbar.classList.add("responsive")
    } else {
      navbar.className = "menu"
    }
  }

  function go_home() {
    if (location.pathname === "/alfa/") {
      document.getElementById('Home').scrollIntoView()
      let navbar = document.getElementsByClassName("menu")[0];
      navbar.className = "menu"
    } else {
      location.href = "/alfa/"
    }
  }

  function go_login() {
    if (getToken == undefined) {
      location.href = "/alfa/login/"
    } else {
      if (getProfile.username !== undefined) {
        location.href = "/alfa/profile/"
      } else {
        location.href = "/alfa/app/"
      }  
    }
  }

  // Alterna entre o ietm app e entrar na navbar
  function check_if_login() {
    const link = document.getElementById("appLink")
    if (getToken == null) {
      link.innerHTML = "Entrar"
    } else {
      link.innerHTML = "App"
    }
  }

  // Funções para navegar na pagina inicial
  function go_products() {
    document.getElementById('Products').scrollIntoView()
    let navbar = document.getElementsByClassName("menu")[0];
    navbar.className = "menu"
  }

  function go_about() {
    document.getElementById('About').scrollIntoView()
    let navbar = document.getElementsByClassName("menu")[0];
    navbar.className = "menu"
  }

  function go_faq() {
    document.getElementById('Faq').scrollIntoView()
    let navbar = document.getElementsByClassName("menu")[0];
    navbar.className = "menu"
  }

  useEffect(() => {
    check_if_login()
  }, [])


  return (
    <div className="navbar">

      <div className='navbar-align'>

        <div className="menu" id="menu">
          <a className="menu-icon" onClick={OpenMenu}>
            <FontAwesomeIcon icon={faBars} />
          </a>

          <div className="menu-item" onClick={go_home}>
            <a> Inicio </a>
          </div>

          {About()}

          {Products()}

          {Faq()}

          <div className="menu-item" onClick={go_login}>
            <a id="appLink"> App </a>
          </div>

        </div>
      </div>
    </div>
  )
}