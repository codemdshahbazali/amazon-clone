import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import Orders from './Orders';

//setting up the stripe payment
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
//public key from stripe
const promise = loadStripe(
  'pk_test_51HTbmrDHVe8m0XbK7ADLZTx192Dj8nUoTx5rvgNBjgQZeGuwXeJ3xIsdyYkneDbWsjCZ4JODaNYDZCxcuiCifGjx00X0cCpYTV'
);

function App() {
  const [{basket}, dispatch] = useStateValue();

  useEffect(() => {
    let localData = localStorage.getItem('basket');
    localData = localData ? JSON.parse(localData) : []; 
    console.log(localData);
    dispatch({
      type: 'INITIALIZE_BASKET',
      item: localData,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    //will only run once the app component renders or re-renders
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authuser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });

    
    // localData = localData ? JSON.parse(localData) : []; 
    // console.log("localstorage", localStorage);
  }, []);

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
