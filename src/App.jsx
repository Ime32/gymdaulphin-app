import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, updateQuantity, setCartOpen } from './redux/cartSlice'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Redux Hooks
  const cart = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();

  // Expanded Product Catalog with matching ocean/slate athletic theme imagery
  const products = [
    {
      id: 1,
      name: 'GymDaulphin Tech Hoodie',
      price: 59.99,
      rating: 4.9,
      reviews: 142,
      category: 'Apparel',
      badge: 'Bestseller',
      description: 'Thermal-regulating fleece hoodie designed for warmups and heavy training sessions.',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Hydro-Isolate Blue Raspberry Whey',
      price: 54.99,
      rating: 5.0,
      reviews: 230,
      category: 'Supplements',
      badge: 'Top Rated',
      description: 'Fast-absorbing pure whey isolate formula designed to accelerate muscle recovery.',
      image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Pro Heavy-Duty Lifting Belt',
      price: 64.99,
      rating: 4.8,
      reviews: 98,
      category: 'Gear',
      badge: 'New',
      description: '10mm steel-lever leather belt providing maximal lumbar and abdominal support.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      name: 'GymDaulphin Seamless Performance Tee',
      price: 34.99,
      rating: 4.7,
      reviews: 87,
      category: 'Apparel',
      badge: 'Popular',
      description: 'Breathable, four-way stretch athletic top crafted for maximum mobility.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      name: 'High-Grip Padded Wrist Cuffs',
      price: 18.99,
      rating: 4.8,
      reviews: 115,
      category: 'Gear',
      badge: 'Essential',
      description: 'Reinforced neoprene wrist wraps engineered for heavy pressing and stability.',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      name: 'Pre-Workout Energizer (Electric Ice)',
      price: 42.99,
      rating: 4.9,
      reviews: 176,
      category: 'Supplements',
      badge: 'High Energy',
      description: 'High-stimulant pre-workout formula with L-Citrulline for intense muscle pumps.',
      image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 7,
      name: 'Extra-Thick Non-Slip Fitness Mat',
      price: 39.99,
      rating: 4.6,
      reviews: 64,
      category: 'Gear',
      badge: 'Durable',
      description: 'High-density memory foam floor mat ideal for core exercises and stretching.',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 8,
      name: 'GymDaulphin Athletic Joggers',
      price: 49.99,
      rating: 4.8,
      reviews: 104,
      category: 'Apparel',
      badge: 'Trending',
      description: 'Tapered athletic sweatpants featuring zip pockets and moisture-wicking fabric.',
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 75.0;
  const shippingProgress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  // Filter products by category and live search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setToastMessage(`Added "${product.name}" to cart! 🐬`);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && <div className="toast-notification">{toastMessage}</div>}

      {/* Sticky Glassmorphism Header */}
      <header className="navbar-sticky">
        <div className="nav-brand">
          <span className="logo-icon">🐬</span>
          <span className="logo-text">GYMDAULPHIN</span>
        </div>

        {/* Live Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search gear, apparel, supplements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Filters */}
        <nav className="nav-links">
          {['All', 'Apparel', 'Gear', 'Supplements'].map((cat) => (
            <button
              key={cat}
              className={`nav-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Cart Drawer Trigger */}
        <button className="cart-trigger" onClick={() => dispatch(setCartOpen(true))}>
          🛒 <span className="cart-count">{totalItems}</span>
        </button>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-tag">Official Store</span>
          <h1>ELEVATE YOUR WORKOUT</h1>
          <p>Designed for athletes. Equipped with premium gear, supplements, and performance apparel.</p>
        </div>
      </section>

      {/* Product Catalog */}
      <main className="catalog-section">
        <div className="catalog-header">
          <h2>{activeCategory} Catalog ({filteredProducts.length} items)</h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No products found matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="image-wrapper">
                  <span className="badge">{product.badge}</span>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="card-body">
                  <div className="card-top">
                    <span className="category-label">{product.category}</span>
                    <span className="rating">★ {product.rating} ({product.reviews})</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <div className="card-footer">
                    <span className="price">${product.price.toFixed(2)}</span>
                    <button className="btn-add" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Slide-out Cart Sidebar */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => dispatch(setCartOpen(false))}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Your Shopping Cart ({totalItems})</h3>
              <button className="close-btn" onClick={() => dispatch(setCartOpen(false))}>✕</button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="shipping-bar-container">
              <p>
                {totalPrice >= freeShippingThreshold
                  ? '🎉 You unlocked FREE Shipping!'
                  : `Add $${(freeShippingThreshold - totalPrice).toFixed(2)} more for FREE Shipping`}
              </p>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${shippingProgress}%` }}></div>
              </div>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <p className="empty-msg">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                      <div className="quantity-controls">
                        <button onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}>+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App