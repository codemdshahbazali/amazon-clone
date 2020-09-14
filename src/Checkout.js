import React from 'react';
import BasketItem from './BasketItem';
import './Checkout.css';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
    const [{basket}, dispatch] = useStateValue();
    console.log("Checkout Page ==>", basket)
    
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                src="https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/media/images/banner-ads-examples-intro-liberty-university.jpg" alt="" 
                className="checkout__ad"
                />

                <div>
                    <h2 className="checkout__title">
                        Your Shopping Basket
                    </h2>
                    {basket.map((item) => {
                        return <BasketItem basket={item} key={item.id}/>
                    })}
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
