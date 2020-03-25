

import React from 'react';
import { connect } from '../store';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";


function mapStateToPropsMod(state) {
  return {
      data: state.edit_production
  }
}

function mapDispatchToPropsMod(dispatch) {
  return {
      deleteProduction: ()=> dispatch({ type: 'DELETE', feature: 'production' }),
      editProduction: (payload)=> dispatch({type: 'EDIT', ...payload, feature: 'production' }),
      addProduction: (payload)=> dispatch({type: 'ADD', ...payload, feature: 'production'}),
      closeModal: () => dispatch({ type: 'CLOSE_MODAL', show: false, feature: 'production' })
  }
}


function ModalApp(props) {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = values => {
    doSome(values)
  };

  const doSome = (values) => {
    if (props.data.mode === 'edit') {
      props.editProduction(values)
    } else {
      props.addProduction(values)
    }
    props.closeModal()
  }

  const doDelete = () => {
    props.deleteProduction()
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
            {props.data.mode === 'edit' ? 'Edit Production House' : 'Add New Production House'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <label>Production House Name*</label>
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
