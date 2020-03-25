import React, { useContext, Component } from 'react';
import { store, connect } from '../store';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";


function mapStateToPropsProd(state) {
  return {
      data: state.movie
  }
}
function mapDispatchToPropsProd(dispatch) {
  return {
      editMovie: (payload)=> dispatch({type: 'DETAIL', ...payload, feature: 'movie'})
  }
}


function ListMovieApp(props) {

  return (
    <div className="list-movie">
      <Container fluid>
        <Row>
          {props.data.map((value, index) => {
            return (
              
              <Col xs={3} key={index}>
                <Card body onClick={() => props.editMovie({ value, index, show: true, mode: 'edit'})} className="each-card">
                    
                  <h4>
                    {value.name}
                  </h4>
                  <p>
                  {value.genre}
                  </p>
                  
                  <h5>
                    {value.production.name}
                  </h5>
                  <p>
                    {value.age}
                  </p>
                  
                </Card>
              </Col>
              
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

const ListMovie = connect(mapStateToPropsProd, mapDispatchToPropsProd)(ListMovieApp)

export default ListMovie;
