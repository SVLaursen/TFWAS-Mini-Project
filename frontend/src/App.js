import React from 'react';
import logo from './logo.svg';
import './App.css';

//Routing
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

//Pages
import FrontPage from './pages/FrontPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <Router>
      <div classname='App'>
        <Switch>
          <Route path='/' exact component={FrontPage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/admin' component={AdminPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
