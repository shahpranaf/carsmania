import React from 'react';
import './App.scss';

import { Redirect, Route, Router, Switch } from 'react-router-dom';
import {history} from "./utils/history";
import { Col, Container, Row } from 'react-bootstrap';
import NotFound from './pages/404';
import Header from './components/Header';
import Cars from './pages/Cars';

function App() {
  return (
    <Container fluid>
      <Row className="p-2">
        <Header />
      </Row>
      <Row className="p-2">
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/cars" />} />
            <Route exact path="/cars" component={Cars} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Row>
    </Container>
			
  );
}

export default App;
