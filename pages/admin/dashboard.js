import axios from 'axios';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import {
  FaIdeal,
  FaMoneyBill,
  FaProductHunt,
  FaUserCircle,
} from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(162, 222, 208, 1)',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };
  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">
                <span className="font-bold">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">Products</Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h1 className="mb-4 text-xl font-bold text-center">
            Admin Dashboard
          </h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-12">
                <div className="admin_card bg-blue-100 items-center">
                  <FaMoneyBill className="text-[60px] opacity-80" />
                  <div className="text-3xl font-bold">
                    Rs:{summary.ordersPrice}{' '}
                  </div>
                  <span>Sales</span>
                  <div className="mt-8">
                    <Link href="/admin/orders">
                      <div className="flex items-center hover:text-slate-600">
                        <AiFillEye className="text-xl" />
                        &nbsp; view
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="admin_card bg-green-100 items-center">
                  <FaIdeal className="text-[60px] opacity-80" />
                  <div className="text-3xl font-bold">
                    {summary.ordersCount}{' '}
                  </div>
                  <span>Orders</span>
                  <div className="mt-8">
                    <Link href="/admin/orders">
                      <div className="flex items-center hover:text-slate-600">
                        <AiFillEye className='text-xl'/>
                        &nbsp; view
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="admin_card bg-orange-100 items-center">
                  <FaProductHunt className="text-[60px] opacity-80" />
                  <p className="text-3xl font-bold">{summary.productsCount} </p>
                  <span>Products</span>
                  <div className="mt-8">
                    <Link href="/admin/products">
                    <div className="flex items-center hover:text-slate-600">
                      <AiFillEye className="text-xl" />&nbsp;
                      view
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="admin_card bg-red-100 items-center">
                  <FaUserCircle className="text-[60px] opacity-80" />
                  <p className="text-3xl font-bold">{summary.usersCount} </p>
                  <span>Users</span>
                  <div className="mt-8">
                    <Link href="/admin/users">
                    <div className="flex items-center hover:text-slate-600">
                      <AiFillEye className="text-xl" />&nbsp;
                      view
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <h2 className="text-xl">Sales Report</h2>
              <Bar
                options={{
                  legend: { display: true, position: 'right' },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
