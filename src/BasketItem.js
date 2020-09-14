import React from 'react';
import './BasketItem.css';
import { useStateValue } from './StateProvider';

function BasketItem({basket}) {
    return (
        <div className="basket-item">
            <div className="basket-item__container">
                <div className="basket-item__ProductImage">
                    <img src={basket.image} alt=""/>
                </div>
                <div className="basket-item__info">
                    <p>{basket.title}</p>
                    <p className="basket-item__price">
                        <small>₹</small>
                        <strong>{basket.price}</strong>
                    </p>
                    <div className="basket-item__rating">
                        {Array(basket.rating)
                        .fill()
                        .map((_, i) => (
                            <span role="img">⭐</span>
                        ))}
                    </div>
                    <button>Remove from basket</button>
                </div>
            </div>
        </div>
    )
}

export default BasketItem
