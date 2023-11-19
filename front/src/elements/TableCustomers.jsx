import { useState, useEffect } from "react";
import Customer from './CardCustomer'
import ModalCustomer from "./ModalCustomer";


export default function CustomerTable(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getCards, setCards] = useState([]);

  //Modal
  const [getCustomerId, setCustomerId] = useState("");
  const [getSaveModal, setSaveModal] = useState(true);
  const [getCpf, setCpf] = useState("");
  const [getName, setName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getCity, setCity] = useState("");
  const [getAddress, setAddress] = useState("");
  const [getTelephone, setTelphone] = useState("");
  const [getEmail, setEmail] = useState("");

  // Get Customers
  function get_customers() {
    let url = "http://127.0.0.1:8000/customers/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        create_customers_table(data['customers'])
      })
  }

  function create_customers_table(value) {
    setCards(
      value.map((data) => (
        <Customer data={data} show={() => show_modal(data, false)} update={get_customers}></Customer>
      )))
  }

  function show_modal(data, value) {
    const modal = document.getElementById("ModalCustomer");
    set_modal(data)
    setSaveModal(value)
    modal.classList.toggle("show");
  }

  function set_modal(data) {
    setCustomerId(data.id || "")
    setCpf(data.cpf || "")
    setName(data.name || "")
    setLastName(data.lastname || "")
    setCity(data.city || "")
    setAddress(data.address || "")
    setEmail(data.email || "")
    setTelphone(data.telephone || "")
  }

  function select_table(event) {
    const selectedValue = event.target.value;
    const customer_table = document.getElementById("customerTable");
    const request_table = document.getElementById("requestTable");
    const select = document.getElementById("customerSelect")
    select.value = 0

    if (selectedValue === "0") {
      customer_table.style.display = "flex";
      request_table.style.display = "none";
    } else {
      customer_table.style.display = "none";
      request_table.style.display = "flex";
    }
  }

  function filter_customers(event) {
    const value = event.target.value.toLowerCase()
    const items = document.getElementsByClassName("customer-card");
    Array.from(items).forEach(item => {
      const name = item.querySelector(".card-name").innerHTML.toLowerCase();
      const cpf = item.querySelector(".card-telephone").innerHTML.toLowerCase();

      if (name.includes(value) || cpf.includes(value)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  useEffect(() => {
    get_customers()
    const select = document.getElementById("customerSelect")
    select.value = 0
  }, [])

  return (
    <>
      <div className='align-cards' id="customerTable">
        <div className='table-navbar'>
          <div className="align-btns-table-navbar">
            <select id="customerSelect" onChange={select_table}>
              <option value={0}> Clientes </option>
              <option value={1}> Serviços </option>
            </select>
            <button className="btn-app" onClick={() => show_modal({}, true)}> Novo </button>
            <input id="FilterCustomer" className="text-filter" onChange={filter_customers} placeholder="Buscar cpf ou nome"></input>
          </div>
        </div>

        {getCards}
      </div>
      <ModalCustomer 
        save={getSaveModal} 
        update={get_customers}

        customer_id={getCustomerId}
        cpf={getCpf} 
        name={getName} 
        lastname={getLastName} 
        city={getCity}
        address={getAddress} 
        email={getEmail} 
        telephone={getTelephone}

        setCpf={setCpf} 
        setName={setName} 
        setLastName={setLastName} 
        setCity={setCity}
        setAddress={setAddress} 
        setEmail={setEmail} 
        setTelephone={setTelphone}>
      </ModalCustomer>
    </>
  )
}