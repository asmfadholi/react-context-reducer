
import React, { useContext, Component } from 'react';
import { store, connect } from '../store';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import ModalProduction from './ModalProduction';
import ModalMovie from './ModalMovie';
import ListProduction from './ListProduction';
import ListMovie from './ListMovie';


function mapStateToProps(state) {
  return {
      data: state
  }
}
function mapDispatchToProps(dispatch) {
  return {
      showFormProduction: (payload)=> dispatch({type: 'SHOW_MODAL', ...payload, feature: 'production' }),
      showFormMovie: (payload)=> dispatch({type: 'SHOW_MODAL', ...payload, feature: 'movie' })
  }
}


function App(props) {
  return (
    <div className="App">

      <div className="production-wrap">
        <Container fluid className="title">
          <Row>
            <Col> <h3> Production House </h3></Col>
            <Col>
              <div className="d-flex justify-content-end">
                <Button variant="primary" onClick={()=> props.showFormProduction({ show: true })}>Add Production House</Button>
              </div>
            </Col>
          </Row>
        </Container>
    
        <ListProduction/>
        <ModalProduction/>
        <hr/>
      </div>

      

      <Container fluid className="title">
        <Row>
          <Col> <h3> Movie List </h3></Col>
          <Col>
            <div className="d-flex justify-content-end">
              <Button variant="primary" onClick={()=> props.showFormMovie({ show: true })}>Add Movie</Button>
            </div>
          </Col>
        </Row>
      </Container>
      
      <ListMovie/>
      <ModalMovie/>
    </div>
  );
}

const HFirstC = connect(mapStateToProps, mapDispatchToProps)(App)

export default HFirstC;
