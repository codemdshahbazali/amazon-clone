import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BasketItem from './BasketItem';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';

// Setting up the stripe payment
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    //handling payment
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(true);

    const handleSubmit = () => {
        //will do the fancy stripe stuff
    }

    const handleChange = (e) => {
        //Listen for changes inside the card element
        //and display any errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Electronic City</p>
                        <p>Bangalore</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map((item) => {
                            return <BasketItem basketItem={item} />
                        })}
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* String magic will happen here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChnage={handleChange}/>

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                        <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    // value={basket.reduce((acc, cur) => acc + cur.price, 0)} //part of homework
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p>: "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment;
