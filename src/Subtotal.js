import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';


function Subtotal() {
    const [{basket}, dispatch] = useStateValue();
    const history = useHistory();
    
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                        {/* part of homework */}
                            Subtotal ({basket.length} items):
                            <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                // value={basket.reduce((acc, cur) => acc + cur.price, 0)} //part of homework
                value={getBasketTotal(basket)} //part of homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
            <button onClick={(e) => history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
