import React from 'react';

//Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Pages
import FrontPage from './pages/FrontPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <Router>
      <div className='App'>
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
