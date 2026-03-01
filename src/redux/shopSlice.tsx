import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGames = createAsyncThunk("cart/fetchGames", async () => {
  try {
    const res = await fetch("http://localhost:5000/api/games");
    if (!res.ok) throw new Error("Failed to fetch games");
    return await res.json();
  } catch (error) {
    return [
      { 
        id: 1, 
        name: "God of War", 
        publisher: "PlayStation PC LLC",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_hero.jpg",
        price: "6000 DA", 
        discount: 40,
        rating: 4.8,
        reviews: 85420,
        platforms: ["windows"],
        trending: true,
        details: "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters.", 
        category: "Action", 
        size: "70 GB", 
        requirements: "GPU: GTX 1060 | CPU: i5-6600k | RAM: 8GB" 
      },
      { 
        id: 2, 
        name: "Elden Ring", 
        publisher: "FromSoftware Inc.",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg",
        price: "10000 DA", 
        discount: 0,
        rating: 4.9,
        reviews: 120500,
        platforms: ["windows"],
        trending: true,
        details: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.", 
        category: "RPG", 
        size: "60 GB", 
        requirements: "GPU: GTX 1060 | CPU: i5-8400 | RAM: 12GB" 
      },
      { 
        id: 3, 
        name: "Red Dead Redemption 2", 
        publisher: "Rockstar Games",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_hero.jpg",
        price: "8000 DA", 
        discount: 67,
        rating: 4.9,
        reviews: 450000,
        platforms: ["windows"],
        trending: false,
        details: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters hounding them.", 
        category: "Adventure", 
        size: "150 GB", 
        requirements: "GPU: GTX 1060 | CPU: i7-4770K | RAM: 12GB" 
      },
      { 
        id: 4, 
        name: "The Last of Us Part I", 
        publisher: "PlayStation PC LLC",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_hero.jpg",
        price: "9000 DA", 
        discount: 20,
        rating: 4.7,
        reviews: 25000,
        platforms: ["windows"],
        trending: true,
        details: "Experience the emotional storytelling and unforgettable characters in The Last of Us, winner of over 200 Game of the Year awards.", 
        category: "Action", 
        size: "75 GB", 
        requirements: "GPU: RTX 3060 | CPU: i7-9700K | RAM: 16GB" 
      },
      { 
        id: 5, 
        name: "Cyberpunk 2077", 
        publisher: "CD PROJEKT RED",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_hero.jpg",
        price: "7000 DA", 
        discount: 50,
        rating: 4.5,
        reviews: 650000,
        platforms: ["windows"],
        trending: true,
        details: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamour, and body modification.", 
        category: "RPG", 
        size: "70 GB", 
        requirements: "GPU: RTX 2060 | CPU: i7-6700 | RAM: 12GB" 
      },
      { 
        id: 6, 
        name: "The Witcher 3: Wild Hunt", 
        publisher: "CD PROJEKT RED",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_hero.jpg",
        price: "5000 DA", 
        discount: 75,
        rating: 4.9,
        reviews: 700000,
        platforms: ["windows"],
        trending: false,
        details: "The most awarded game of a generation! Become a professional monster slayer and embark on an adventure of epic proportions.", 
        category: "RPG", 
        size: "50 GB", 
        requirements: "GPU: GTX 770 | CPU: i7-3770 | RAM: 8GB" 
      },
      { 
        id: 7, 
        name: "Horizon Zero Dawn", 
        publisher: "PlayStation PC LLC",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_hero.jpg",
        price: "6500 DA", 
        discount: 33,
        rating: 4.6,
        reviews: 120000,
        platforms: ["windows"],
        trending: false,
        details: "Experience Aloy’s entire legendary quest to unravel the mysteries of a world ruled by deadly Machines.", 
        category: "Action", 
        size: "100 GB", 
        requirements: "GPU: GTX 1060 | CPU: i7-4770 | RAM: 16GB" 
      },
      { 
        id: 8, 
        name: "Sekiro: Shadows Die Twice", 
        publisher: "Activision",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_hero.jpg",
        price: "7500 DA", 
        discount: 0,
        rating: 4.8,
        reviews: 180000,
        platforms: ["windows"],
        trending: true,
        details: "Carve your own clever path to vengeance in the award-winning adventure from developer FromSoftware.", 
        category: "Action", 
        size: "25 GB", 
        requirements: "GPU: GTX 970 | CPU: i5-2500K | RAM: 8GB" 
      },
      { 
        id: 9, 
        name: "Civilization VI", 
        publisher: "2K Games",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/library_hero.jpg",
        price: "4500 DA", 
        discount: 90,
        rating: 4.4,
        reviews: 200000,
        platforms: ["windows", "mac"],
        trending: false,
        details: "Civilization VI offers new ways to interact with your world, expand your empire across the map, advance your culture.", 
        category: "Strategy", 
        size: "12 GB", 
        requirements: "GPU: GTX 770 | CPU: i5-4460 | RAM: 8GB" 
      },
      { 
        id: 10, 
        name: "FIFA 23", 
        publisher: "Electronic Arts",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/library_hero.jpg",
        price: "9500 DA", 
        discount: 25,
        rating: 3.8,
        reviews: 150000,
        platforms: ["windows"],
        trending: true,
        details: "Experience the pinnacle of international football with the FIFA World Cup Qatar 2022 and FIFA Women’s World Cup.", 
        category: "Sports", 
        size: "100 GB", 
        requirements: "GPU: GTX 1050 Ti | CPU: i5-6600K | RAM: 8GB" 
      },
      { 
        id: 11, 
        name: "Forza Horizon 5", 
        publisher: "Xbox Game Studios",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_hero.jpg",
        price: "7000 DA", 
        discount: 45,
        rating: 4.7,
        reviews: 140000,
        platforms: ["windows"],
        trending: true,
        details: "Your ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico.", 
        category: "Sports", 
        size: "110 GB", 
        requirements: "GPU: GTX 1070 | CPU: i5-8400 | RAM: 8GB" 
      },
      { 
        id: 12, 
        name: "Anno 1800", 
        publisher: "Ubisoft",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/916440/library_600x900_2x.jpg", 
        heroImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/916440/library_hero.jpg",
        price: "8500 DA", 
        discount: 15,
        rating: 4.6,
        reviews: 80000,
        platforms: ["windows"],
        trending: false,
        details: "Welcome to the dawn of the Industrial Age. Experience one of the most exciting and fast-changing periods of all time.", 
        category: "Strategy", 
        size: "60 GB", 
        requirements: "GPU: GTX 970 | CPU: i5-4460 | RAM: 8GB" 
      },
    ];
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
