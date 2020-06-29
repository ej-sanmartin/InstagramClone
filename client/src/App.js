import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

// Components
import NavBar from './Components/Navbar';

// Reducers
import { reducer, initialState } from './Reducers/userReducer';

// Routes
import Home from './Routes/Home';
import Login from './Routes/Login';
import SignUp from './Routes/SignUp';
import Profile from './Routes/Profile';
import CreatePost from './Routes/CreatePost';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("use"));
    if(user){
      dispatch({ type: "USER", payload: user });
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [])

  return(
    <Switch>
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
      <Route path="/create">
        <CreatePost />
      </Route>
    </Switch>
  );
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
