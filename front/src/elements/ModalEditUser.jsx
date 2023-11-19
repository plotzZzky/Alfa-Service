import { useState, useEffect } from "react";
import InputEmail from '../elements/login/inputEmail';
import InputUser from '../elements/login/inputUser';
import Input from '../elements/login/input';


export default function ModalEditUser(props) {
  const [getLogin, setLogin] = useState(true);
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getProfile, setProfile] = useState(JSON.parse(sessionStorage.getItem("profile")))
  

  // User data
  const [getUsername, setUsername] = useState(getProfile.username || "");
  const [getEmail, setEmail] = useState(getProfile.email || "");
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


  function close_modal() {
    const modal = document.getElementById("ModalEditUser");
    modal.classList.remove("show");
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
    let url = `http://127.0.0.1:8000/users/update/`

    const formData = create_form();
    let infos = {
      method: 'POST',
      body: formData,
      headers: { Authorization: 'Token ' + getToken }}

    fetch(url, infos)
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
      close_modal()
  }

  // Validate
  function validate_pwd1(event) {
    const value = event.target.value
    setPassword1(value)
    setPwd1Valid( value == "" || value.length > 7 ? true : false)
  }

  function validate_pwd2(event) {
    const value = event.target.value
    setPassword2(value)
    setPwd2Valid(value == "" || value === getPassword1 && value.length > 7 ? true : false)
  }

  function validate_cpf(event) {
    const value = event.target.value
    setCpf(value)
    setValidCpf( value.length > 10 && value.length < 13 ? true : false )
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
    const fakeCpf = { target: { value: getProfile.cpf || ""} };
    validate_cpf(fakeCpf)
    const fakeName = { target: { value: getProfile.name || ""} };
    validate_name(fakeName)
    const fakeLastName = { target: { value: getProfile.lastname || '' } };
    validate_lastname(fakeLastName)
    const fakeCity = { target: { value: getProfile.city || '' } };
    validate_city(fakeCity)
    const fakeAddress = { target: { value: getProfile.address || '' } };
    validate_address(fakeAddress)
    const fakeTel = { target: { value: getProfile.telephone || '' } };
    validate_telephone(fakeTel)
    const fakePwd = { target: { value: "" } };
    validate_pwd1(fakePwd)
    validate_pwd2(fakePwd)
  }, [getProfile])

  return (
    <div className="modal-background" id="ModalEditUser" onClick={close_modal}>
      <div className="div-modal" onClick={e => e.stopPropagation()} >

        <div className='align-inputs'>
          <a> Dados do usuario </a>
          <InputUser username={setUsername} valid={UserValid} setValid={setUserValid} value={getUsername} tip='SignTip'></InputUser>
          <InputEmail email={setEmail} valid={EmailValid} setValid={setEmailValid} tip='SignTip' value={getEmail}></InputEmail>
          <Input type={'password'} validate={validate_pwd1} valid={Pwd1Valid} value={getPassword1} placeholder='Digite sua senha'></Input>
          <Input type={'password'} validate={validate_pwd2} valid={Pwd2Valid} value={getPassword2} placeholder='Comfirme sua senha'></Input><br/>

          <a> Dados pessoais </a>
          <Input validate={validate_cpf} valid={validCpf} value={getCpf} placeholder='Digite o cpf'></Input>
          <Input validate={validate_name} valid={validName} value={getName} placeholder='Digite o nome'></Input>
          <Input validate={validate_lastname} valid={validLastName} value={getLastName} placeholder='Digite o sobrenome'></Input>
          <Input validate={validate_telephone} valid={validTelephone} value={getTelephone} placeholder='Digite o telefone'></Input>
          <Input validate={validate_city} valid={validCity} value={getCity} placeholder='Digite a cidade'></Input>
          <Input validate={validate_address} valid={validAddress} value={getAddress} placeholder='Digite o endereço'></Input><br />

          <p className='login-tip' id='SignTip'> Atualizar seu perfil </p>
          <button className='btn' onClick={check_if_sign_valid}>Salvar</button>
        </div>
      </div>
    </div>
  )
}