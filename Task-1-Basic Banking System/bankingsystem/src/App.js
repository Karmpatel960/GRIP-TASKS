import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import Home from './components/Home/Home';
import About from './components/About/About';
import Alltransfer from './components/Alltransfer';
import Transfer from './components/Transfer';
import Customers from './components/Viewcustomer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/transfer' element={<Transfer/>} />
              <Route exact path='/alltransfer' element={<Alltransfer/>} />
              <Route exact path='/viewcustomer' element={<Customers/>} />
            </Routes>

    </Router>
  );
}

export default App;
