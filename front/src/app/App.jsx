import { useState, useEffect } from 'react'
import NavBar from '../elements/navbar'
import CustomerTable from '../elements/TableCustomers'
import TableRequests from '../elements/TableRequests'


export default function App() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const [getProfile, setProfile] = useState(JSON.parse(sessionStorage.getItem("profile")))

  function check_login() {
    if (getToken == undefined) {
      location.href = "/alfa/login/";
    } else {
      if (getProfile.username !== undefined) {
        location.href = "/alfa/profile/"
      }
    }
  }

  useEffect(() => {
    check_login()
  }, [])

  return (
    <>
      <NavBar></NavBar>
      <div className='page' id="pageCards">
        <TableRequests></TableRequests>
        <CustomerTable> </CustomerTable>
      </div>
    </>
  )
}
