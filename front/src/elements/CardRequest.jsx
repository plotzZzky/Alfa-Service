import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Request(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  // Delete customer
  function delete_customer() {
    let url = "http://127.0.0.1:8000/works/del/"
    const form = new FormData()
    form.append("id", props.data.id)
    let data = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + getToken },
      body: form
    }
    fetch(url, data)
      .then(() => {
        props.update()
      })
  }


  return (
    <details className='request-card'>
      <summary className='card-summary'>
        <div className='table-align-data'>
          <a className='card-title'> {props.data.title}</a>
        </div>

        <div className='table-align-data'>
          <a className='card-status'> {props.data.status}</a>
        </div>
      </summary>
      <div className='card-desc'>
        <a className='card-desc-order'>
          {props.data.order}
        </a>

        <div className='card-desc-info'>
          <div className='table-align-data'>
            <a className='card-name'> {props.data.name} {props.data.lastname}</a>
          </div>

          <div className='table-align-data'>
            <a className='card-address'>{props.data.address}</a>
          </div>
          <div className='table-align-btns'>
            <FontAwesomeIcon icon={faEdit} className='icon' onClick={props.show} />
            <FontAwesomeIcon icon={faTrash} className='icon' onClick={delete_customer} />
          </div>
        </div>
      </div>
    </details>
  )
}