import { useState, useEffect } from 'react'
import Input from './login/input'

export default function ModalCustomer(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  // Is valid?
  const [validCpf, setValidCpf] = useState(false)
  const [validName, setValidName] = useState(false)
  const [validLastName, setValidLastName] = useState(false)
  const [validCity, setValidCity] = useState(false)
  const [validAddress, setValidAddress] = useState(false)
  const [validTelephone, setValidTelephone] = useState(false)
  const [validEmail, setValidEmail] = useState(false)

  function close_modal() {
    const modal = document.getElementById("ModalCustomer");
    modal.classList.remove("show");
  }

  // Validate
  function validate_cpf(event) {
    const value = event.target.value
    if (value.length > 9 &&  value.length < 12) {
      props.setCpf(value)
      setValidCpf(true)
    } else {
      props.setCpf(value)
      setValidCpf(false)
    }
  }

  function validate_name(event) {
    const value = event.target.value
    if (value.length > 2) {
      props.setName(value)
      setValidName(true)
    } else {
      props.setName(value)
      setValidName(false)
    }
  }

  function validate_lastname(event) {
    const value = event.target.value
    if (value.length > 3) {
      props.setLastName(value)
      setValidLastName(true)
    } else {
      props.setLastName(value)
      setValidLastName(false)
    }
  }

  function validate_city(event) {
    const value = event.target.value
    if (value.length > 2) {
      props.setCity(value)
      setValidCity(true)
    } else {
      props.setCity(value)
      setValidCity(false)
    }
  }

  function validate_address(event) {
    const value = event.target.value
    if (value.length > 4) {
      props.setAddress(value)
      setValidAddress(true)
    } else {
      props.setAddress(value)
      setValidAddress(false)
    }
  }

  function validate_telephone(event) {
    const value = event.target.value
    if (value.length > 9) {
      props.setTelephone(value)
      setValidTelephone(true)
    } else {
      props.setTelephone(value)
      setValidTelephone(false)
    }
  }

  function validate_email(event) {
    const value = event.target.value
    if (value.includes('@') && value.includes("mail.com")) {
      props.setEmail(value)
      setValidEmail(true)
    } else {
      props.setEmail(value)
      setValidEmail(false)
    }
  }

  function check_customer_validate() {
    if (validCpf && validName && validLastName && validCity && validAddress && validTelephone && validEmail) {
      create_customer()
      close_modal()
    } else {
      const tip = document.getElementById("modalTip")
      tip.innerText = "Prencha os dados corretamente"
    }
  }

  // Create customer
  function create_form() {
    const formData = new FormData();
    formData.append("id", props.customer_id)
    formData.append("cpf", props.cpf);
    formData.append("name", props.name)
    formData.append("lastname", props.lastname)
    formData.append("city", props.city)
    formData.append("address", props.address)
    formData.append("telephone", props.telephone)
    formData.append("email", props.email)
    return formData
  }

  // Create customer
  function create_customer() {
    let url =  props.save? "http://127.0.0.1:8000/customers/new/" : "http://127.0.0.1:8000/customers/edit/"
    console.log(url)
    let data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
            body: create_form()
    }
    fetch(url, data)
    .then(() => props.update())
  }
  

  useEffect(() => {
    const fakeCpf = { target: { value: props.cpf || ""} };
    validate_cpf(fakeCpf)
    const fakeName = { target: { value: props.name || ""} };
    validate_name(fakeName)
    const fakeLastName = { target: { value: props.lastname || '' } };
    validate_lastname(fakeLastName)
    const fakeCity = { target: { value: props.city || '' } };
    validate_city(fakeCity)
    const fakeAddress = { target: { value: props.address || '' } };
    validate_address(fakeAddress)
    const fakeTel = { target: { value: props.telephone || '' } };
    validate_telephone(fakeTel)
    const fakeEmail = { target: { value: props.email || '' } };
    validate_email(fakeEmail)
    const tip = document.getElementById("modalTip")
    tip.innerText = ""
  }, [props.cpf])


  return (
    <div className="modal-background" id="ModalCustomer" onClick={close_modal}>
      <div className="div-modal" onClick={e => e.stopPropagation()}>
        <div className="align-inputs">
          <Input validate={validate_cpf} valid={validCpf} value={props.cpf} placeholder='Digite o cpf' ></Input>
          <Input validate={validate_name} valid={validName} value={props.name} placeholder='Digite o nome'></Input>
          <Input validate={validate_lastname} valid={validLastName} value={props.lastname} placeholder='Digite o sobrenome'></Input>
          <Input validate={validate_telephone} valid={validTelephone} value={props.telephone} placeholder='Digite o telefone'></Input>
          <Input validate={validate_city} valid={validCity} value={props.city} placeholder='Digite a cidade'></Input>
          <Input validate={validate_address} valid={validAddress} value={props.address} placeholder='Digite o endereço'></Input>
          <Input validate={validate_email} valid={validEmail} value={props.email} placeholder='Digite a email'></Input>
        </div>
        
        <div className='align-btns'>
          <button className='btn' onClick={check_customer_validate}> Salvar </button>
        </div>
        <a className='login-tip' id='modalTip'> </a>
      </div>
    </div>
  )
}