import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5001/bookstore/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Admin Page - Order Details</h1>
      </header>
      
      <main className="main-content">
        <section className="orders-section">
          <h2>Orders</h2>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5">No orders available</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.OrderID}>
                      <td>{order.OrderID}</td>
                      <td>{order.UserID}</td>
                      <td>{new Date(order.OrderDate).toLocaleString()}</td>
                      <td>${Number(order.TotalAmount).toFixed(2)}</td>
                      <td>{order.Status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;