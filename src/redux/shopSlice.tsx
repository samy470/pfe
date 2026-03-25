import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGames = createAsyncThunk("cart/fetchGames", async () => {
  try {
    const res = await fetch("https://pfe-back-s17w.onrender.com/api/games");
    if (!res.ok) throw new Error("Failed to fetch games");
    return await res.json();
  } catch (error) {
    
  }
});

interface Item {
  id: number;
  name: string;
  publisher: string;
  image: string;
  heroImage: string;
  price: string;
  discount: number;
  rating: number;
  reviews: number;
  platforms: string[];
  trending: boolean;
  details: string;
  category: string;
  size: string;
  requirements: string;
  quantity?: number;
}

interface CartState {
  original: Item[];
  list: Item[];
  cart: Item[];
  wishlist: Item[];
  searchQuery: string;
  selectedCategory: string;
  pricingStrategy: 'default' | 'sale' | 'premium';
}

const initialState: CartState = {
  original: [],
  list: [],
  cart: [],
  wishlist: [],
  searchQuery: "",
  selectedCategory: "All",
  pricingStrategy: 'default',
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          state.cart = state.cart.filter(i => i.id !== id);
        }
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setList: (state, action) => {
      state.original = action.payload;
      state.list = action.payload;
    },
    toggleWishlist: (state, action) => {
      const game = action.payload;
      const index = state.wishlist.findIndex(item => item.id === game.id);
      if (index >= 0) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(game);
      }
    },
    setPricingStrategy: (state, action) => {
      state.pricingStrategy = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.original = action.payload;
      state.list = action.payload;
    });
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setSearchQuery,
  setSelectedCategory,
  setList,
  toggleWishlist,
  setPricingStrategy,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
