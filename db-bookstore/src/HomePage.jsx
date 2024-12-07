import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch books from the backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/Bookstore/Books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Handle ordering a book
  const handleOrderBook = (book) => {
    setCart([...cart, book]);
    setTotalPrice(totalPrice + Number(book.Price));
  };

  // Handle removing a book from the cart
  const handleRemoveFromCart = (index) => {
    const bookToRemove = cart[index];
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    setTotalPrice(totalPrice - Number(bookToRemove.Price));
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Online Bookstore</h1>
      </header>
      
      <main className="main-content">
        <section className="books-section">
          <h2>Books Available</h2>
          <div className="books-table-container">
            <table className="books-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>ISBN</th>
                  <th>Publisher</th>
                  <th>Publication Year</th>
                  <th>Edition</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Add To Cart</th>
                </tr>
              </thead>
              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan="8">No books available</td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr key={book.BookID}>
                      <td>{book.Title}</td>
                      <td>{book.ISBN}</td>
                      <td>{book.Publisher}</td>
                      <td>{book.PublicationYear}</td>
                      <td>{book.Edition}</td>
                      <td>${Number(book.Price).toFixed(2)}</td>
                      <td>{book.Stock === 0 ? 'Out of Stock' : 'In Stock'}</td>
                      <td>
                        <button onClick={() => handleOrderBook(book)} className="order-button">Order Book</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section className="cart-section">
          <h2>Cart</h2>
          <ul>
            {cart.map((book, index) => (
              <li key={index}>
                {book.Title} - ${Number(book.Price).toFixed(2)}
                <button onClick={() => handleRemoveFromCart(index)} className="remove-button">Remove from Cart</button>
              </li>
            ))}
          </ul>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </section>
      </main>
    </div>
  );
};

export default HomePage;