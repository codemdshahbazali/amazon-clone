import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import Order from './Order';
import {useHistory} from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                data: doc.data(),
              };
            })
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders__order'>
        {orders.length > 0 ? (
          orders.map((order) => <Order key={uuidv1()} order={order} />)
        ) : !user ? (
          <h1 className='orders_not_signed_in'>
            Please login to view your orders
          </h1>
        ) : (
          <h1 className='orders_not_signed_in'>You haven't placed any order</h1>
        )}
      </div>
    </div>
  );
}

export default Orders;
