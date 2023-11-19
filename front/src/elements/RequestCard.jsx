import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Request(props) {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));

  function delete_request() {
    let url = "http://127.0.0.1:8000/requests/del/"
    const form = new FormData()
    form.append("id", props.data.id)
    let data = {
      method: 'DELETE',
      headers: { Authorization: 'Token ' + getToken },
      body: form
    }
    fetch(url, data)
      .then(() => props.update)
  }

  return (
    <details className='request-card'>
      <summary>
        <div className='table-align-data'>
          <a className='card-title'>{props.data.title}</a>
        </div>

        <div className='table-align-data'>
          <a className='card-status'> {props.data.status}</a>
        </div>

        <div className='table-align-data'>
          <a className='card-name'> {props.data.name}</a>
        </div>
      </summary>
      <div className='card-desc'>
        <div className='table-align-data'>
          <a className='card-order'> {props.data.order}</a>
        </div>
        <div className='table-align-data'>
          <a className='card-tel'>{props.data.telephone}</a>
        </div>
        <div className='table-align-btns'>
          <FontAwesomeIcon icon={faEdit} className='icon' onClick={props.show} />
          <FontAwesomeIcon icon={faTrash} className='icon' onClick={delete_request} />
        </div>
      </div>
    </details>
  )
}