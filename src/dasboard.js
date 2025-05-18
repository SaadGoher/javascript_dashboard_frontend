import React, { useEffect, useState } from 'react';
import api from './axios/api';

const containerStyle = {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '2rem 1rem',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  minHeight: '100vh',
  width: '100%',
  boxSizing: 'border-box'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '3rem',
  padding: '2rem 0',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px'
};

const titleStyle = {
  fontSize: '2.5rem',
  color: '#2c3e50',
  margin: '0 0 0.5rem',
  fontWeight: '600'
};

const welcomeStyle = {
  fontSize: '1.1rem',
  color: '#7f8c8d',
  margin: '0'
};

const productsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '1.2rem',
  marginBottom: '4rem'
};

const productCardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0
};

const imageContainerStyle = {
  backgroundColor: '#f8f9fa',
  padding: '1.5rem',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const productImageStyle = {
  maxWidth: '100%',
  maxHeight: '140px',
  objectFit: 'contain',
  mixBlendMode: 'multiply'
};

const productContentStyle = {
  padding: '1.2rem',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
};

const productTitleStyle = {
  fontSize: '1.1rem',
  margin: '0 0 1rem',
  color: '#2c3e50',
  lineHeight: '1.4',
  minHeight: '3em'
};

const priceRatingContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem'
};

const priceStyle = {
  fontSize: '1.4rem',
  fontWeight: '700',
  color: '#27ae60',
  margin: '0'
};

const ratingStyle = {
  fontSize: '0.9rem',
  color: '#f39c12',
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem'
};

const descriptionStyle = {
  fontSize: '0.9rem',
  color: '#7f8c8d',
  lineHeight: '1.5',
  margin: '0 0 1.5rem',
  minHeight: '4.5em'
};

const addToCartButtonStyle = {
  width: '100%',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  padding: '0.8rem 1rem',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease'
};

const cartContainerStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '1.2rem',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  marginTop: '2rem',
  width: '100%',
  boxSizing: 'border-box'
};

const cartTitleStyle = {
  color: '#2c3e50',
  margin: '0 0 2rem',
  fontSize: '1.8rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const cartListStyle = {
  listStyle: 'none',
  padding: '0',
  margin: '0'
};

const cartItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.2rem 0',
  borderBottom: '1px solid #ecf0f1'
};

const itemInfoStyle = {
  flex: '1 1 60%'
};

const itemTitleStyle = {
  fontSize: '1rem',
  color: '#34495e',
  margin: '0 0 0.5rem'
};

const priceInfoStyle = {
  fontSize: '0.95rem',
  color: '#7f8c8d',
  margin: '0'
};

const quantityControlsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem'
};

const quantityButtonStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  border: '1px solid #bdc3c7',
  backgroundColor: 'white',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};

const quantityNumberStyle = {
  minWidth: '36px',
  textAlign: 'center',
  fontSize: '1rem'
};

const removeButtonStyle = {
  ...quantityButtonStyle,
  color: '#e74c3c',
  borderColor: '#e74c3c',
  width: 'auto',
  padding: '0 12px'
};

const totalStyle = {
  fontSize: '1.4rem',
  fontWeight: '700',
  color: '#2c3e50',
  textAlign: 'right',
  marginTop: '2rem',
  paddingTop: '2rem',
  borderTop: '2px solid #ecf0f1'
};

const loadingStyle = {
  textAlign: 'center',
  fontSize: '1.2rem',
  color: '#7f8c8d',
  padding: '3rem 0'
};

const errorStyle = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '1.5rem',
  borderRadius: '8px',
  margin: '2rem auto',
  maxWidth: '600px',
  textAlign: 'center'
};

const emptyCartStyle = {
  color: '#7f8c8d',
  textAlign: 'center',
  padding: '2rem 0',
  fontSize: '1.1rem'
};

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
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
      prevCart
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  return (
    <div style={containerStyle}>
      <header style={headerStyle} className="dashboard-header">
        <h1 style={titleStyle}>🛒 E-Commerce Dashboard</h1>
        <p style={welcomeStyle}>Discover amazing products!</p>
      </header>

      {loading && <p style={loadingStyle}>⏳ Loading products...</p>}
      {error && <div style={errorStyle}>{error}</div>}

      <div style={productsGridStyle} className="dashboard-products-grid">
        {products.map(product => (
          <div 
            key={product.id} 
            style={productCardStyle}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={imageContainerStyle}>
              <img
                src={product.image}
                alt={product.title}
                style={productImageStyle}
              />
            </div>
            <div style={productContentStyle}>
              <h3 style={productTitleStyle}>{product.title}</h3>
              <div style={priceRatingContainer}>
                <p style={priceStyle}>${product.price}</p>
                <div style={ratingStyle}>
                  ⭐ {product.rating.rate} ({product.rating.count})
                </div>
              </div>
              <p style={descriptionStyle}>{product.description.slice(0, 80)}...</p>
              <button
                onClick={() => addToCart(product)}
                style={addToCartButtonStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2479b5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
              >
                ➕ Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={cartContainerStyle} className="dashboard-cart-container">
        <h2 style={cartTitleStyle}>
          🛍️ Your Cart ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})
        </h2>
        
        {cart.length === 0 ? (
          <p style={emptyCartStyle}>Your cart is empty. Start shopping!</p>
        ) : (
          <>
            <ul style={cartListStyle}>
              {cart.map(item => (
                <li key={item.id} style={cartItemStyle}>
                  <div style={itemInfoStyle}>
                    <h3 style={itemTitleStyle}>{item.title}</h3>
                    <p style={priceInfoStyle}>
                      ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div style={quantityControlsStyle}>
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      style={quantityButtonStyle}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      -
                    </button>
                    <span style={quantityNumberStyle}>{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      style={quantityButtonStyle}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={removeButtonStyle}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fdedec'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div style={totalStyle}>
              Total: ${totalPrice}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Add mobile responsive styles using a style tag
const ResponsiveStyle = () => (
  <style>
    {`
      @media (max-width: 900px) {
        .dashboard-products-grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)) !important;
          gap: 0.8rem !important;
        }
        .dashboard-cart-container {
          padding: 1rem !important;
        }
      }
      @media (max-width: 600px) {
        .dashboard-products-grid {
          grid-template-columns: 1fr !important;
        }
        .dashboard-header {
          padding: 1rem 0 !important;
        }
        .dashboard-cart-container {
          padding: 0.5rem !important;
        }
      }
    `}
  </style>
);