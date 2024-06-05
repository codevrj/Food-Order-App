import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout title="Order-History">
      <div className="min-h-screen">
        <h1 className="text-xl my-10 font-semibold text-center">ORDER HISTORY</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="overflow-x-auto mx-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-center">ID</th>
                  <th className="px-5 text-center">DATE</th>
                  <th className="px-5 text-center">TOTAL</th>
                  <th className="px-5 text-center">PAID</th>
                  <th className="px-5 text-center">STATUS</th>
                  <th className="px-5 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="text-center">{order._id.substring(20, 24)}</td>
                    <td className="text-center">{order.createdAt.substring(0, 10)}</td>
                    <td className="text-center">Rs:{order.totalPrice}</td>
                    <td className="text-center">
                      {order.isPaid
                        ? `${order.paidAt.substring(0, 10)}`
                        : 'not paid'}
                    </td>
                    <td className="text-center">
                      {order.isDelivered
                        ? `${order.deliveredAt.substring(0, 10)}`
                        : 'not delivered!'}
                    </td>
                    <td className="p-5 text-center">
                      <Link href={`/order/${order._id}`} passHref>
                        <span className="px-2 py-1 border-2 hover:text-orange-400 border-orange-100 rounded-md">
                          Details
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;
