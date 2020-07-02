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
import UserProfile from './Routes/UserProfile';
import SubscribeUserPosts from './Routes/SubscribeUserPosts';
import Reset from './Routes/Reset';
import NewPassword from  './Routes/NewPassword';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("use"));
    if(user){
      dispatch({ type: "USER", payload: user });
    } else {
      if(!history.location.pathname.startsWith('/reset')){
        history.push('/login');
      }
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
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/subscriptions">
        <SubscribeUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route path="/reset/:token">
        <Reset />
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
