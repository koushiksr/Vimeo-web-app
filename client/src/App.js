import React, { Component } from 'react';
import Home from '../src/Layout/Home/Home';
import NavBar from '../src/Layout/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
// require('dotenv').config()
// process.env.CI = false

class App extends Component {
  render() {
    return (
      <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} /> */}
      </Routes>
    </>
    );
  }
}

export default App;
