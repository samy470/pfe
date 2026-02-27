import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGames = createAsyncThunk("cart/fetchGames", async () => {
  try {
    const res = await fetch("http://localhost:5000/api/games");
    if (!res.ok) throw new Error("Failed to fetch games");
    return await res.json();
  } catch (error) {
    return [
      { id: 1, name: "God of War", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900_2x.jpg", price: "6000 DA", details: "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters.", category: "Action", size: "70 GB", requirements: "GPU: GTX 1060 | CPU: i5-6600k | RAM: 8GB" },
      { id: 2, name: "Elden Ring", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg", price: "10000 DA", details: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.", category: "RPG", size: "60 GB", requirements: "GPU: GTX 1060 | CPU: i5-8400 | RAM: 12GB" },
      { id: 3, name: "Red Dead 2", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg", price: "8000 DA", details: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters hounding them.", category: "Adventure", size: "150 GB", requirements: "GPU: GTX 1060 | CPU: i7-4770K | RAM: 12GB" },
      { id: 4, name: "The Last of Us", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg", price: "9000 DA", details: "Experience the emotional storytelling and unforgettable characters in The Last of Us, winner of over 200 Game of the Year awards.", category: "Action", size: "75 GB", requirements: "GPU: RTX 3060 | CPU: i7-9700K | RAM: 16GB" },
      { id: 5, name: "Grand Theft Auto V", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg", price: "5000 DA", details: "When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening elements of the criminal underworld.", category: "Action", size: "110 GB", requirements: "GPU: GTX 660 | CPU: i5-3470 | RAM: 8GB" },
      { id: 6, name: "The Witcher 3", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900_2x.jpg", price: "7000 DA", details: "The most awarded game of a generation! Become a professional monster slayer and embark on an adventure of epic proportions.", category: "RPG", size: "50 GB", requirements: "GPU: GTX 770 | CPU: i7-3770 | RAM: 8GB" },
    ];
  }
});

interface Item {
  id: number;
  name: string;
  image: string;
  price: string;
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
  searchQuery: string;
  selectedCategory: string;
}

const initialState: CartState = {
  original: [],
  list: [],
  cart: [],
  searchQuery: "",
  selectedCategory: "All",
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
  setList
} = cartSlice.actions;
export default cartSlice.reducer;
