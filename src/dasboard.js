import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';
import api from './axios/api';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Checkout form state
  const [isCheckout, setIsCheckout] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    contact: '',
    paymentMethod: 'Credit Card',
  });

  useEffect(() => {
    api.get("auth/products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const alreadyInCart = prevCart.some(item => item.id === product.id);
      if (alreadyInCart) {
        alert("Item already added to cart.");
        return prevCart;
      }
      return [...prevCart, { ...product, quantity: 0 }];
    });
  };

  const incrementQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Checkout handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleCheckoutSubmit = (e) => {
  //   e.preventDefault();

  //   // Simple validation
  //   if (!billingInfo.name || !billingInfo.address || !billingInfo.city || !billingInfo.contact) {
  //     alert("Please fill in all billing details.");
  //     return;
  //   }

  //   alert(`Order Confirmed!\n
  //   Name: ${billingInfo.name}
  //   Address: ${billingInfo.address}, ${billingInfo.city}, ${billingInfo.contact}
  //   Payment Method: ${billingInfo.paymentMethod}
  //   Total Amount: $${totalAmount.toFixed(2)}
  //   `);

  //   // Reset cart and form
  //   setCart([]);
  //   setBillingInfo({
  //     name: '',
  //     address: '',
  //     city: '',
  //     contact: '',
  //     paymentMethod: 'Credit Card',
  //   });
  //   setIsCheckout(false);
  // };
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    const { name, address, city, contact, paymentMethod } = billingInfo;

    // Simple validation
    if (!name || !address || !city || !contact) {
      alert("Please fill in all billing details.");
      return;
    }

    const orderData = {
      userId: 'guest-user', // Replace with actual user ID when available
      userInfo: {
        name,
        contact,
        address,
        city,
        paymentMethod
      },
      items: cart.map(item => ({
        productId: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount
    };

    try {
      const response = await api.post('auth/checkout', orderData);
      // alert(`✅ Order Confirmed!\n\nOrder ID: ${response.data._id || 'N/A'}\n\nTotal Amount: $${totalAmount.toFixed(2)}`);
      alert(`✅ Order Confirmed!\n\nTotal Amount: $${totalAmount.toFixed(2)}`);

      // Reset cart and form
      setCart([]);
      setBillingInfo({
        name: '',
        address: '',
        city: '',
        contact: '',
        paymentMethod: 'Credit Card',
      });
      setIsCheckout(false);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error(error);
      alert("❌ Failed to submit order. Please try again.");
    }
  };


  return (
    <div className="page-container">
      <h1 style={{ color: '#2c3e50' }}>Men's Wear</h1>
      {/* <p>Logged in successfully</p> */}

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Products */}
      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-desc">{product.description.slice(0, 80)}...</p>
            <p className="product-rating">⭐ {product.rating.rate} ({product.rating.count})</p>
            <div className="add-to-cart-wrapper">
              <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart-container">
        <h2 className="cart-heading">🛒 Your Cart ({cart.length} item{cart.length !== 1 ? 's' : ''})</h2>
        <div className="cart-box">
          {cart.length === 0 ? (
            <p className="empty-cart-text">Your cart is empty. Start shopping now!</p>
          ) : (
            <>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {cart.map(item => (
                  <li key={item.id} className="cart-item">
                    <div>
                      <strong>{item.title}</strong><br />
                      <span className="price-text">Price:</span> ${item.price.toFixed(2)} × {item.quantity}
                      <br />
                      <span className="subtotal-text">Subtotal: ${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => decrementQuantity(item.id)} className="cart-btn">-</button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button onClick={() => incrementQuantity(item.id)} className="cart-btn">+</button>
                      <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-amount-box">
                <h3 style={{ margin: 0 }}>💰 Total: ${totalAmount.toFixed(2)}</h3>
              </div>
              {!isCheckout && (
                <button
                  onClick={() => setIsCheckout(true)}
                  className="checkout-btn"
                >
                  Proceed to Checkout
                </button>

              )}
            </>
          )}

          {/* Checkout form */}
          {isCheckout && (
            <form className="checkout-form-container" onSubmit={handleCheckoutSubmit}>
              <h3>Checkout</h3>

              <div className="checkout-form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={billingInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="checkout-form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={billingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="checkout-form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={billingInfo.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="checkout-form-group">
                <label htmlFor="contact">Contact No</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={billingInfo.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="checkout-form-group">
                <label htmlFor="paymentMethod">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={billingInfo.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>

              <button type="submit" className="checkout-submit-btn">
                Confirm Order
              </button>
              <button
                type="button"
                className="checkout-cancel-btn"
                onClick={() => setIsCheckout(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}