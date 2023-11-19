import { useState, useEffect } from 'react'
import Input from './login/input'


export default function ModalRequest(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  const [getCpfs, setCpfs] = useState([]);

  // Is valid?
  const [validTitle, setValidTitle] = useState(false);
  const [validOrder, setValidOrder] = useState(false);
  const [validStatus, setValidStatus] = useState(true);
  const [validCustomer, setValidCustomer] = useState(false);


  function close_modal() {
    const modal = document.getElementById("ModalRequest");
    modal.classList.remove("show");
  }

  function get_all_users() {
    let url =  "http://127.0.0.1:8000/customers/all/" 
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }}
    fetch(url, data)
    .then((res) => res.json())
    .then((data) => {
      setCpfs(data['customers'])
    })
  }

  function set_customer_id(event) {
    const value = event.target.value;
    props.setCustomerId(value)
  }

  // Validate
  function validate_title(event) {
    const value = event.target.value
    props.setTitle(value)
    setValidTitle( value.length > 4 ? true : false)
  }

  function validate_order(event) {
    const value = event.target.value
    props.setOrder(value)
    setValidOrder( value.length > 6 ? true : false)
  }

  function validate_status(event) {
    const value = event.target.value
    props.setStatus(value)
    setValidStatus(value !== "" ? true : false)
  }

  function validate_customer(event) {
    const value = event.target.value
    console.log(value)
    props.setCustomerId(value)
    setValidCustomer(value !== "" ? true : false)
  }

  function check_request_validate() {
    if (validTitle && validOrder && validStatus && validCustomer) {
      create_request()
      close_modal()
    } else {
      const tip = document.getElementById("modalRequestTip")
      tip.innerText = "Prencha os dados corretamente"
    }
  }

  // Create form
  function create_form() {
    const formData = new FormData();
    formData.append("id", props.requestId)
    formData.append("customer", props.customerId)
    formData.append("title", props.title)
    formData.append("order", props.order)
    formData.append("status", props.status)
    return formData
  }

  // Create customer
  function create_request() {
    let url =  props.save? "http://127.0.0.1:8000/works/new/" : "http://127.0.0.1:8000/works/edit/"
    const body = create_form()
    let data = {
      method: 'POST',
      headers: { Authorization: 'Token ' + getToken },
            body: body
    }
    fetch(url, data)
    .then(() => props.update())
  }
  
  // Invalid empty form
  useEffect(() => {
    get_all_users()
    const fakeTitle = { target: { value: props.title || ""}};
    validate_title(fakeTitle)
    const fakeOrder = { target: { value: props.order || ""}};
    validate_order(fakeOrder)
    const fakeStatus = {target: {value: props.status || "Em aberto"}};
    validate_status(fakeStatus)
    const tip = document.getElementById("modalRequestTip")
    tip.innerText = ""
    const cpf = document.getElementById("StatusSelect")
    cpf.value = "selecione o cpf do cliente"
  }, [props])


  return (
    <div className="modal-background" id="ModalRequest" onClick={close_modal}>
      <div className="div-modal" onClick={e => e.stopPropagation()}>
        <div className="align-inputs">
          <Input validate={validate_title} valid={validTitle} value={props.title} placeholder='Digite o titulo' ></Input>
          <Input validate={validate_order} valid={validOrder} value={props.order} placeholder='Digite o pedido'></Input>

          <select className='modal-select' onChange={validate_status}>
            <option key={0} selected={true} value="Em aberto"> Em aberto </option>
            <option key={1} value="Em aguardo"> Em aguardo </option>
            <option key={2} value="Concluido"> Concluido </option>
          </select>

          <select className='modal-select' onChange={validate_customer} id="StatusSelect">
            <option key={0}> selecione o cpf do cliente </option>
            {getCpfs.map((data) => (
              <option key={data.id} value={data.id} onClick={set_customer_id}>{data.cpf}</option>
            ))}
          </select>
        </div>
        
        <div className='align-btns' onChange={validate_customer}>
          <button className='btn' onClick={check_request_validate}> Salvar </button>
        </div>
        <a className='login-tip' id='modalRequestTip'> </a>
      </div>
    </div>
  )
}