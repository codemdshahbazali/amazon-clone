import userEvent from '@testing-library/user-event';
import React from 'react';
import { Link } from 'react-router-dom';
import BasketItem from './BasketItem';
import './Payment.css';
import { useStateValue } from './StateProvider';

// Setting up the stripe payment
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

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
                        <form>
                            <CardElement />
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment;
