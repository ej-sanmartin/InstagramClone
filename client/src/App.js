import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

// Components
import NavBar from './Components/Navbar';

// Routes
import Home from './Routes/Home';
import Login from './Routes/Login';
import SignUp from './Routes/SignUp';
import Profile from './Routes/Profile';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </BrowserRouter>
  );
}

export default App;
