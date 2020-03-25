import React, { useContext, Component } from 'react';
import { store, connect } from '../store';
import { Card, Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";


function mapStateToPropsProd(state) {
  return {
      data: state.production
  }
}
function mapDispatchToPropsProd(dispatch) {
  return {
      editProduction: (payload)=> dispatch({type: 'DETAIL', ...payload, feature: 'production'})
  }
}


function ListProductionApp(props) {

  return (
    <div className="list-production">
      {props.data.map((value, index) => {
        return <Card body key={index} className="each-card" onClick={() => props.editProduction({ value, index, show: true, mode: 'edit'})}>{value.name}</Card>
      })}
    </div>
  )
}

const ListProduction = connect(mapStateToPropsProd, mapDispatchToPropsProd)(ListProductionApp)

export default ListProduction;
