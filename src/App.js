import React, {useEffect} from 'react';
import './App.css';
import Header from'./Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once the app component loads
    auth.onAuthStateChanged((authuser) => {
      console.log("The use is ==> ",authuser);

      if (authuser) {
        //the use just logged in / the user was logged initialState
        dispatch({
          type: 'SET_USER',
          user: authuser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
