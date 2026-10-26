import { createSlice } from '@reduxjs/toolkit';

// Load initial cart state safely from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('gymdaulphin_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

// Save cart array to localStorage helper
const saveCartToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem('gymdaulphin_cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const initialState = {
  items: loadCartFromLocalStorage(),
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      saveCartToLocalStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += delta;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }

      saveCartToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('gymdaulphin_cart');
    },

    setCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
  },
});

export const { addToCart, updateQuantity, clearCart, setCartOpen } = cartSlice.actions;
export default cartSlice.reducer;