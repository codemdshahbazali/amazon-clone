import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasketItem from './BasketItem';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';
import axios from './axios';
import { db } from './firebase';
import { v1 as uuidv1 } from 'uuid';


// Setting up the stripe payment
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  //handling payment
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState('');
  const [succeeded, setSucceeded] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate special stripe secret which allows us to charge a customer
    // Whenever the basket changes we need a new secret
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          //Stripe accepts the total in a currency sub-units
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
  
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        alert(error.message);
      }
    };

    getClientSecret();
  }, [basket]);

  console.log('Secret is ==> ', clientSecret);

  const handleSubmit = async (event) => {
    //will do the fancy stripe stuff
    event.preventDefault();

    //this will block users from clicking the buy button more than one time
    //after first click it will be disabled
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //payment Intent is equal to payment confiirmation
        //pushes the data into the database
        console.log('paymentIntent =>>> ', paymentIntent);
        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          // .doc(uuidv1())
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: 'EMPTY_BASKET',
        });

        history.replace('/orders');
      });
  };

  const handleChange = (event) => {
    //Listen for changes inside the card element
    //and display any errors as the customer types their card details
    setDisabled(event.empty);
    //setDisabled(false);
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>Electronic City</p>
            <p>Bangalore</p>
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map((item) => {
              return <BasketItem key={uuidv1()} basketItem={item} />;
            })}
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            {/* String magic will happen here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  // value={basket.reduce((acc, cur) => acc + cur.price, 0)} //part of homework
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'₹'}
                />
                {/* <button disabled={processing || disabled || succeeded}> */}
                <button disabled={disabled}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>

              {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
