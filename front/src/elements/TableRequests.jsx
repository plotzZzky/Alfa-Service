import { useState, useEffect } from "react";
import Request from "./CardRequest";
import ModalRequest from '../elements/ModalRequest'


export default function TableRequests(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getCards, setCards] = useState([]);

  //Modal
  const [getSaveModal, setSaveModal] = useState(true);
  const [getRequestId, setRequestId] = useState("");
  const [getCustomerId, setCustomerId] = useState("");
  const [getTitle, setTitle] = useState("");
  const [getOrder, setOrder] = useState("");
  const [getStatus, setStatus] = useState("Em aberto");


  // Get requests
  function get_requests() {
    let url = "http://127.0.0.1:8000/works/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        create_customers_table(data['works'])
        filter_requests_by_status({"target": { "value": 0}})
      })
  }

  function create_customers_table(value) {
    setCards(
      value.map((data) => (
        <Request data={data} show={() => show_modal(data, false)} update={get_requests}></Request>
      )))
  }

  function show_modal(data, value) {
    const modal = document.getElementById("ModalRequest");
    set_modal(data)
    console.log(data)
    setSaveModal(value)
    modal.classList.toggle("show");
  }

  function set_modal(data) {
    setRequestId(data.id || "")
    setTitle(data.title || "")
    setOrder(data.order || "")
    setStatus(data.status || "")
    setCustomerId(data.user_id || "")
  }

  function select_table(event) {
    const selectedValue = event.target.value;
    const customer_table = document.getElementById("customerTable");
    const request_table = document.getElementById("requestTable");
    const select = document.getElementById("requestSelect")
    select.value = 0

    if (selectedValue === "1") {
      customer_table.style.display = "flex";
      request_table.style.display = "none";
    } else {
      customer_table.style.display = "none";
      request_table.style.display = "flex";
    }
  }

  function check_filter_value(event) {
    const value = event.target.value.toLowerCase()
    console.log(value)
    if (value === "") {
      filter_requests_by_status({"target": { "value": 0}})
    } else {
      filter_requests(value)
    };
  }

  function filter_requests(value) {
    const items = document.getElementsByClassName("request-card");
    Array.from(items).forEach(item => {
      const title = item.querySelector(".card-title").innerHTML.toLowerCase();
      const name = item.querySelector(".card-name").innerHTML.toLowerCase();

      if (title.includes(value) || name.includes(value)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    })
  }

  function filter_requests_by_status(event) {
    const value = event.target.value
    const result = value == 0? 'Em':'Concluido'
    console.log(result)
    const items = document.getElementsByClassName("request-card");
    Array.from(items).forEach(item => {
      const status = item.querySelector(".card-status").innerHTML;

      if ( status.includes(result) ) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  useEffect(() => {
    get_requests()
    const select = document.getElementById("requestSelect")
    select.value = 0
  }, [])

  return (
    <>
      <div className='align-cards' id="requestTable" style={{display: 'none'}}>
        <div className='table-navbar'>
          <div className="align-btns-table-navbar">
            <select id="requestSelect" onChange={select_table}>
              <option value={0}> Serviços </option>
              <option value={1}> Clientes </option>
            </select>
            
            <select id="selectStatus" onChange={filter_requests_by_status}>
              <option value={0}> Aberto </option>
              <option value={1}> Fechado </option>
            </select>

            <button className="btn-app" onClick={() => show_modal({}, true)}> Novo </button>
            <input id="FilterCustomer" className="text-filter" onChange={check_filter_value} placeholder="Buscar cpf ou nome"></input>
          </div>
        </div>

        {getCards}
      </div>
      <ModalRequest
        save={getSaveModal} 
        update={get_requests}

        title={getTitle}
        order={getOrder}
        status={getStatus}
        requestId={getRequestId}
        customerId={getCustomerId}
        
        setTitle={setTitle}
        setOrder={setOrder}
        setStatus={setStatus}
        setCustomerId={setCustomerId}>
      </ModalRequest>
    </>
  )
}