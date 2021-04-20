import React, { Fragment, useState } from 'react'
import './Form.scss'
import Modal from '../Modal/Modal'
import {observer, useLocalObservable} from 'mobx-react'

const Form = (props) => {
  const [modalActive, setModalActive] = useState(false)


  const store = useLocalObservable(() => {
    return {
      firstName: props.initialFirstName ?? '',
      lastName: props.initialLastName ??  '',
      getFirstName(e) {
        this.firstName = e.target.value
      },
      getLastName(e){
        this.lastName = e.target.value
      },
      getValidate(){
        const $name = document.querySelector('.name')
        const $surname = document.querySelector('.surname')
        if (!this.firstName) {
          $name.classList.add('error') 
        } else if (!this.lastName) {
          $name.classList.remove('error')
          $surname.classList.add('error')
        } else {
          setModalActive(true)
          $surname.classList.remove('error')
        }
      },
    }
  })


  return (
    <Fragment>
      <div className="main">
        <form className="form">
          <label>
            <p>Имя</p>
            <input className="input name" name="firstName" type="text" placeholder="Введите имя" onChange={store.getFirstName}/>
          </label>
          <label>
            <p>Фамилия</p>
            <input className="input surname" name="lastName" type="text" placeholder="Введите фамилию" onChange={store.getLastName}/>
          </label>
        </form>
        <div className="btn-w">
          <button className="btn ok" onClick={store.getValidate}>Готово</button>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}> {store.firstName} {store.lastName} </Modal>
    </Fragment>
  )
}

export default observer(Form);