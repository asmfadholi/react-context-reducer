

import React from 'react';
import { connect } from '../store';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";


function mapStateToPropsMod(state) {
  return {
      data: state.edit_movie,
      production: state.production
  }
}

function mapDispatchToPropsMod(dispatch) {
  return {
      deleteMovie: ()=> dispatch({ type: 'DELETE', feature: 'movie' }),
      editMovie: (payload)=> dispatch({type: 'EDIT', ...payload, feature: 'movie' }),
      addMovie: (payload)=> dispatch({type: 'ADD', ...payload, feature: 'movie'}),
      closeModal: () => dispatch({ type: 'CLOSE_MODAL', show: false, feature: 'movie' })
  }
}


function ModalApp(props) {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = values => {
    doSome(values)
  };

  const doSome = (values) => {
    values.production = JSON.parse(values.production)
    if (props.data.mode === 'edit') {
      props.editMovie(values)
    } else {
      props.addMovie(values)
    }
    props.closeModal()
  }

  const doDelete = () => {
    props.deleteMovie()
    props.closeModal()
  }

  return (
    <div className="form-data">
    <form onChange={() => handleSubmit(()=>{})}>
      <Modal
        show={props.data.show}
        onHide={() => props.closeModal()}
        dialogClassName="modal-90w"
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {props.data.mode === 'edit' ? 'Edit Movie' : 'Add New Movie'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>Movie Name*</label>
            <br/>
            <input
              name="name"
              defaultValue={props.data.value ? props.data.value.name : ''}
              ref={register({
                required: 'this field is required',
              })}
            />
            <br />
            {errors.name && errors.name.message}

            <br/>
            <label>Production House Name*</label>
            <br/>
            <select
              name='production'
              defaultValue={props.data.value ? JSON.stringify(props.data.value.production) : '-'}
              ref={register({
                required: 'this field is required',
                validate: value => value !== "-" || 'this field is required'
              })}>
              <option value="-">--</option>
              {props.production.map((value, index) => {
                return <option value={JSON.stringify(value)} key={index}>{value.name}</option>
              })}
            </select>
            <br />
            {errors.production && errors.production.message}

            <br/>
            <label>Movie Genre*</label>
            <br/>
            <input
              name="genre"
              defaultValue={props.data.value ? props.data.value.genre : ''}
              ref={register({
                required: 'this field is required',
              })}
            />
            <br />
            {errors.genre && errors.genre.message}

            <br/>
            <label>Age Film Ratings*</label>
            <br/>
            <select
              name='age'
              defaultValue={props.data.value ? props.data.value.age : '-'}
              ref={register({
                required: 'this field is required',
                validate: value => value !== "-" || 'this field is required'
              })}>
              <option value="-">--</option>
              <option value="child">Child</option>
              <option value="adult">Adult</option>
              <option value="family">Family</option>
              
            </select>
            <br />
            {errors.age && errors.age.message}
           
          
        </Modal.Body>
        <Modal.Footer>
          {
            props.data.mode === 'edit' ? <Button variant="danger" onClick={() => doDelete()}>
            Delete
            </Button> : ''
          }
          <Button variant="secondary" onClick={() => props.closeModal()}>
            Close
          </Button>
          <Button
            type="submit"
            disabled={errors.name}
            variant="success"
            onClick={handleSubmit(onSubmit)}>
            {props.data.mode === 'edit' ? 'Edit Data' : 'Save Data'}
          </Button>  
        </Modal.Footer>
      </Modal>

      </form>
      
    </div>
  )
}

const FormModal = connect(mapStateToPropsMod, mapDispatchToPropsMod)(ModalApp)

export default FormModal;
