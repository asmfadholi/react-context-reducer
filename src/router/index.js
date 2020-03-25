import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from '../views/App'
import ListMovie from '../views/ListMovie'

export default () => (
    <div>
      <Route exact path="/" component={App} />
      <Route path="/list-movie" component={ListMovie} />
    </div>
  );