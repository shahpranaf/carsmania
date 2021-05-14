import React, { Component } from 'react';
import './App.scss';

import { Redirect, Route, Router, Switch } from 'react-router-dom';
import {history} from "./utils/history";
import { Col, Container, Row } from 'react-bootstrap';
import NotFound from './pages/404';
import Header from './components/Header';
import Footer from './components/Footer';
import CarsPage from './pages/CarsPage';
import CarPage from './pages/CarPage';


function App() {
  return (
    <Container fluid className="px-0">
      <Header />
      
      <Row className="pad-3">
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/cars" />} />
            <Route exact path="/cars" component={CarsPage} />
            <Route exact path="/car/:stockNumber" component={CarPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Row>
      
      <Footer />
    </Container>
			
  );
}

export default App;
