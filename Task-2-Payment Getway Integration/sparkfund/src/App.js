import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/homepage.js';
import DonationPage from './components/donationpage.js';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/donate" component={DonationPage} />
      </Switch>
    </Router>
  );
};

export default App;

