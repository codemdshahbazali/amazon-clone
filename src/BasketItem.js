import React from 'react';
import './BasketItem.css';
import { useStateValue } from './StateProvider';
import { v1 as uuidv1 } from 'uuid';

function BasketItem(props) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: props.basketItem.id,
    });
  };

  return (
    <div className='basket-item'>
      <div className='basket-item__container'>
        <div className='basket-item__ProductImage'>
          <img src={props.basketItem.image} alt='' />
        </div>
        <div className='basket-item__info'>
          <p>{props.basketItem.title}</p>
          <p className='basket-item__price'>
            <small>₹</small>
            <strong>{props.basketItem.price}</strong>
          </p>
          <div className='basket-item__rating'>
            {Array(props.basketItem.rating)
              .fill()
              .map((_, i) => (
                <span key={uuidv1()} role='img'>
                  ⭐
                </span>
              ))}
          </div>
          {!props?.hidebutton && (
            <button onClick={removeFromBasket}>Remove from basket</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BasketItem;
