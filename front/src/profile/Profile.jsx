import { useState, useEffect } from 'react'
import NavBar from '../elements/navbar'
import ModalYourRequest from '../elements/ModalYourRequest'
import Request from '../elements/CardRequest'
import ModalEditUser from '../elements/ModalEditUser'


export default function Profile() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getProfile, setProfile] = useState(JSON.parse(sessionStorage.getItem("profile")))
  const [getCards, setCards] = useState([]);

  //Modal
  const [getSaveModal, setSaveModal] = useState(true);
  const [getRequestId, setRequestId] = useState("");
  const [getCustomerId, setCustomerId] = useState(null);
  const [getTitle, setTitle] = useState("");
  const [getOrder, setOrder] = useState("");
  const [getStatus, setStatus] = useState("Em aberto");

  function check_login() {
    if (getToken == undefined) {
      location.href = "/alfa/login/";
    } else {
      get_requests()
    }
  }

  function show_modal_edit_profile() {
    const modal = document.getElementById("ModalEditUser");
    set_modal({})
    setSaveModal(true)
    modal.classList.toggle("show");
  }

  function show_modal_new_requests(data, value) {
    const modal = document.getElementById("ModalRequest");
    set_modal(data)
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

  function get_requests() {
    let url = "http://127.0.0.1:8000/works/your/"
    let data = {
      method: 'GET',
      headers: { Authorization: 'Token ' + getToken }
    }
    fetch(url, data)
      .then((res) => res.json())
      .then((data) => {
        create_customers_table(data['works'])
      })
  }

  function create_customers_table(value) {
    setCards(
      value.map((data) => (
        <Request data={data} show={() => show_modal_new_requests(data, false)} update={get_requests}></Request>
      )))
  }

  useEffect(() => {
    check_login()
  }, [])


  return (
    <>
      <NavBar></NavBar>
      <div className='page' id="pageCards">
        <div className='table-navbar'>
          <div className="align-btns-table-navbar">
            <button className="btn-app" onClick={() => show_modal_new_requests({}, true)}> Novo </button>
            <button className="btn-app" onClick={show_modal_edit_profile}> Ajustes </button>
          </div>
        </div>
        <div className='align-cards' id="requestTable" >
          {getCards}
        </div>
      </div>

      <ModalEditUser></ModalEditUser>

      <ModalYourRequest
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
      </ModalYourRequest>
    </>
  )
}
