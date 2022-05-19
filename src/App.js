import React, { Component } from 'react';
import "./Css/Style.css";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './components/Home';
import EditTodo from './components/EditTodo';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="todoapp">
        <h3 className="todoapp-title">My Todolist</h3>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/edit/:id" component={EditTodo} />
            </Switch>
        </div>
      </Router >
    );
  }
}

export default App;
