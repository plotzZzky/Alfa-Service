import { useState, useEffect } from 'react';
import NavBar from "../../elements/navbar";
import InputPwd from '../../elements/login/inputPwd';
import InputEmail from '../../elements/login/inputEmail';
import InputUser from '../../elements/login/inputUser';
import Input from '../../elements/login/input';


export default function Login() {
  const [getLogin, setLogin] = useState(true);
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getProfile, setProfile] = useState(sessionStorage.getItem('profile'));

  // User data
  const [getUsername, setUsername] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword1, setPassword1] = useState("");
  const [getPassword2, setPassword2] = useState("")

  // Customer data
  const [getCpf, setCpf] = useState("");
  const [getName, setName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getCity, setCity] = useState("");
  const [getAddress, setAdress] = useState("");
  const [getTelephone, setTelphone] = useState("");

  // Validate
  const [UserValid, setUserValid] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const [Pwd1Valid, setPwd1Valid] = useState(false);
  const [Pwd2Valid, setPwd2Valid] = useState(false)

  const [validCpf, setValidCpf] = useState(false)
  const [validName, setValidName] = useState(false)
  const [validLastName, setValidLastName] = useState(false)
  const [validCity, setValidCity] = useState(false)
  const [validAddress, setValidAddress] = useState(false)
  const [validTelephone, setValidTelephone] = useState(false)

  function check_login() {
    if (getToken != undefined) {
      location.href = "/alfa/profile/";
    }
  }

  function show_login() {
    let login = document.getElementById('loginTab');
    let signup = document.getElementById('signupTab');
    login.style.display = getLogin ? 'none' : 'block'
    signup.style.display = getLogin ? 'block' : 'none'
    setLogin(getLogin ? false : true)
  }

  function check_if_login_valid() {
    if (Pwd1Valid && UserValid) {
      loginFunc()
    } else {
      const tip = document.getElementById("LoginTip")
      tip.innerText = "Prencha os dados de login"
    }
  }

  function loginFunc() {
    let url = `http://127.0.0.1:8000/users/login/`

    const formData = new FormData();
    formData.append("username", getUsername)
    formData.append("password", getPassword1)
    let info = {
      method: 'POST',
      body: formData
    }

    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const tip = document.getElementById("LoginTip")
          tip.innerText = data.error
        } else {
          const profile = JSON.stringify(data['profile'])
          sessionStorage.setItem("token", data["token"])
          setToken(sessionStorage.getItem("token"))
          sessionStorage.setItem("profile", profile)
          setProfile(JSON.parse(sessionStorage.getItem("profile")))
        }
      })
  }

  function check_if_sign_valid() {
    if (UserValid && EmailValid && Pwd1Valid && Pwd2Valid && Pwd1Valid === Pwd2Valid) {
      SignUpFunc()
    } else {
      const tip = document.getElementById("SignTip")
      tip.innerText = "Prencha os dados para se registar"
    }
  }

  // Create form
  function create_form() {
    const formData = new FormData();
    formData.append("username", getUsername);
    formData.append("email", getEmail)
    formData.append("password1", getPassword1)
    formData.append("password2", getPassword2)

    formData.append("cpf", getCpf);
    formData.append("name", getName)
    formData.append("lastname", getLastName)
    formData.append("city", getCity)
    formData.append("address", getAddress)
    formData.append("telephone", getTelephone)
    return formData
  }

  // SignUp
  function SignUpFunc() {
    let url = `http://127.0.0.1:8000/users/register/customer/`

    const formData = create_form();
    let info = { method: 'POST', body: formData }

    fetch(url, info)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const tip = document.getElementById("SignTip")
          tip.innerText = data.error
        } else {
          const profile = JSON.stringify(data['profile'])
          sessionStorage.setItem("token", data["token"])
          setToken(sessionStorage.getItem("token"))
          sessionStorage.setItem("profile", profile)
          setProfile(JSON.parse(sessionStorage.getItem("profile")))
        }
      })
  }

  // Validate
  function validate_cpf(event) {
    const value = event.target.value
    setCpf(value)
    setValidCpf(value.length > 10 && value.length < 13 ? true : false)
  }

  function validate_name(event) {
    const value = event.target.value
    setName(value)
    setValidName(value.length >= 3 ? true : false)
  }

  function validate_lastname(event) {
    const value = event.target.value
    setLastName(value)
    setValidLastName(value.length >= 3 ? true : false)
  }

  function validate_city(event) {
    const value = event.target.value
    setCity(value)
    setValidCity(value.length >= 3 ? true : false)
  }

  function validate_address(event) {
    const value = event.target.value
    setAdress(value)
    setValidAddress(value.length >= 8 ? true : false)
  }

  function validate_telephone(event) {
    const value = event.target.value
    setTelphone(value)
    setValidTelephone(value.length >= 12 ? true : false)
  }

  useEffect(() => {
    check_login()
    const fakeCpf = { target: { value: getCpf || "" } };
    validate_cpf(fakeCpf)
    const fakeName = { target: { value: getName || "" } };
    validate_name(fakeName)
    const fakeLastName = { target: { value: getLastName || '' } };
    validate_lastname(fakeLastName)
    const fakeCity = { target: { value: getCity || '' } };
    validate_city(fakeCity)
    const fakeAddress = { target: { value: getAddress || '' } };
    validate_address(fakeAddress)
    const fakeTel = { target: { value: getTelephone || '' } };
    validate_telephone(fakeTel)
  }, [getToken]);

  return (
    <>
      <NavBar></NavBar>

      <div className="page banner" style={{ paddingTop: '6em' }}>
        <div className='login-div' id='loginTab'>
          <p className='login-title'> Bem vindo de volta!</p>

          <div className='align-inputs'>
            <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='LoginTip'></InputUser>
            <InputPwd password={setPassword1} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a senha" tip='LoginTip'></InputPwd><br />
            <a className='login-tip' id='LoginTip'> Entrar na alfa como parceiro</a>
          </div>
          <div className='align-login-btns'>
            <button className='btn' onClick={check_if_login_valid}> Entrar </button>
            <button className='btn-r' onClick={show_login}> Cadastrar </button>
          </div>
        </div>

        <div className='login-div' id='signupTab' style={{ display: 'none' }}>
          <p className='login-title'> Criar conta na Alfa! </p>

          <div className='align-inputs'>
            <a> Dados do usuario </a>
            <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} tip='SignTip'></InputUser>
            <InputEmail email={setEmail} valid={EmailValid} setValid={setEmailValid} tip='SignTip'></InputEmail>
            <InputPwd password={setPassword1} valid={Pwd1Valid} setValid={setPwd1Valid} placeholder="Digite a senha" tip='SignTip'></InputPwd>
            <InputPwd password={setPassword2} valid={Pwd2Valid} setValid={setPwd2Valid} placeholder="Comfirme a senha" tip='SignTip'></InputPwd><br />

            <a> Dados pessoais </a>
            <Input validate={validate_cpf} valid={validCpf} value={getCpf} placeholder='Digite o cpf' ></Input>
            <Input validate={validate_name} valid={validName} value={getName} placeholder='Digite o nome'></Input>
            <Input validate={validate_lastname} valid={validLastName} value={getLastName} placeholder='Digite o sobrenome'></Input>
            <Input validate={validate_telephone} valid={validTelephone} value={getTelephone} placeholder='Digite o telefone'></Input>
            <Input validate={validate_city} valid={validCity} value={getCity} placeholder='Digite a cidade'></Input>
            <Input validate={validate_address} valid={validAddress} value={getAddress} placeholder='Digite o endereço'></Input><br />

            <a className='login-tip' id='SignTip'> Cadastrar como cliente </a>
          </div>

          <div className='align-login-btns'>
            <button className='btn' onClick={check_if_sign_valid}> Cadastrar </button>
            <button className='btn-r' onClick={show_login}> Entrar </button>
          </div>
        </div>

      </div>
    </>

  )
}