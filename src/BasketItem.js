import React from 'react';
import './BasketItem.css';
import { useStateValue } from './StateProvider';

function BasketItem({basketItem}) {
    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: basketItem.id
        })
    }

    return (
        <div className="basket-item">
            <div className="basket-item__container">
                <div className="basket-item__ProductImage">
                    <img src={basketItem.image} alt=""/>
                </div>
                <div className="basket-item__info">
                    <p>{basketItem.title}</p>
                    <p className="basket-item__price">
                        <small>₹</small>
                        <strong>{basketItem.price}</strong>
                    </p>
                    <div className="basket-item__rating">
                        {Array(basketItem.rating)
                        .fill()
                        .map((_, i) => (
                            <span role="img">⭐</span>
                        ))}
                    </div>
                    <button onClick={removeFromBasket}>Remove from basket</button>
                </div>
            </div>
        </div>
    )
}

export default BasketItem
