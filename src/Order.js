import React from 'react';
import './Order.css';
import moment from 'moment';
import BasketItem from './BasketItem';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from './StateProvider';
import { v1 as uuidv1 } from 'uuid';


function Order({ order }) {
const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className='order'>
      <h2>Order</h2>
      <p className='order__id'>
        <small>{order.id}</small>
      </p>
      
      {/* unix timetamp so we use moments*/}
      <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>

      {order.data.basket?.map((item) => (
        <BasketItem key={uuidv1()} basketItem={item} hidebutton />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className='order__total'>Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount / 100} //part of homework
        displayType={'text'}
        thousandSeparator={true}
        prefix={'₹'}
      />
    </div>
  );
}

export default Order;
