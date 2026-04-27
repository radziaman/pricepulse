// ==========================================
// CONFIG - Constants & Data
// ==========================================

export const DATA = [
    { id: 1, user: "FoodieKing 🍔", name: "The Umami Burger", price: 18.5, loc: "Orchard Road", category: "food", img: "gourmet_burger_find_1777014996371.png", likes: 42, shares: 15, homePrice: 19.20, lat: 1.3048, lng: 103.8318 },
    { id: 2, user: "TechWiz 💻", name: "MacBook Pro M3", price: 3299, loc: "City Hall", category: "electronics", img: "premium_laptop_find_1777015033134.png", likes: 256, shares: 89, homePrice: 3499, lat: 1.2931, lng: 103.8522 },
    { id: 3, user: "StyleIcon ⌚", name: "Elite Watch", price: 1250, loc: "Marina Bay", category: "fashion", img: "luxury_watch_find_1777015121802.png", likes: 112, shares: 34, homePrice: 1350, lat: 1.2823, lng: 103.8584 },
    { id: 4, user: "BurgerLover", name: "The Umami Burger", price: 17.5, loc: "Somerset", category: "food", lat: 1.3000, lng: 103.8380, homePrice: 19.20, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300" },
    { id: 5, user: "CheapEats", name: "The Umami Burger", price: 16.0, loc: "Dhoby Ghaut", category: "food", lat: 1.2990, lng: 103.8450, homePrice: 19.20, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=300" },
    { id: 6, user: "GadgetGuru", name: "iPhone 15 Pro", price: 1299, loc: "Bugis", category: "electronics", likes: 189, shares: 67, homePrice: 1499, lat: 1.3000, lng: 103.8550, img: "https://images.unsplash.com/photo-1592750475338-f74cc3dbfc52?auto=format&fit=crop&q=80&w=300" },
    { id: 7, user: "SneakerHead", name: "Nike Air Max", price: 159, loc: "Orchard", category: "fashion", likes: 78, shares: 23, homePrice: 199, lat: 1.3048, lng: 103.8318, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300" },
    { id: 8, user: "HomeChef", name: "KitchenAid Mixer", price: 299, loc: "Jurong", category: "home", likes: 45, shares: 12, homePrice: 399, lat: 1.3300, lng: 103.7200, img: "https://images.unsplash.com/photo-1594385208974-2e75ebe8f9b2?auto=format&fit=crop&q=80&w=300" }
];

export const USERS = [
    { id: 1, name: "FoodieKing 🍔", bio: "Foodie Forever", home: "Orchard", xp: 2500, deals: 45, followers: 230, following: 89, badges: ["first_deal", "foodie"] },
    { id: 2, name: "TechWiz 💻", bio: "Tech hunter", home: "City Hall", xp: 5200, deals: 128, followers: 567, following: 120, badges: ["first_deal", "trending"] },
    { id: 3, name: "StyleIcon ⌚", bio: "Style scout", home: "Marina Bay", xp: 1800, deals: 34, followers: 189, following: 67, badges: ["first_deal"] },
    { id: 4, name: "BurgerLover", bio: "Burger enthusiast", home: "Somerset", xp: 950, deals: 12, followers: 45, following: 34, badges: ["newbie"] },
    { id: 5, name: "CheapEats", bio: "Frugal foodie", home: "Dhoby Ghaut", xp: 1400, deals: 28, followers: 112, following: 56, badges: ["first_deal"] },
    { id: 6, name: "GadgetGuru", bio: "Gadget deals", home: "Bugis", xp: 3200, deals: 89, followers: 345, following: 90, badges: ["first_deal", "power"] },
    { id: 7, name: "SneakerHead", bio: "Sneaker scout", home: "Orchard", xp: 2100, deals: 56, followers: 234, following: 78, badges: ["first_deal"] },
    { id: 8, name: "HomeChef", bio: "Home deals", home: "Jurong", xp: 1200, deals: 23, followers: 89, following: 45, badges: ["first_deal"] }
];

export const CATEGORIES = [
    { id: "all", name: "All", icon: "grid" },
    { id: "food", name: "Food 🍔", icon: "utensils" },
    { id: "electronics", name: "Tech 💻", icon: "laptop" },
    { id: "fashion", name: "Fashion ⌚", icon: "shirt" },
    { id: "home", name: "Home 🏠", icon: "home" }
];

export const BOUNTIES = [
    { id: 501, requester: "Shopaholic_99", item: "AirPods Pro 2", reward: "500 XP", details: "Looking for the cheapest set in the East!", applicants: 12 },
    { id: 502, requester: "Chef_Ray", item: "Wagyu A5 Ribeye", reward: "1.2k XP", details: "Need a butcher price check in Jurong.", applicants: 5 }
];

export const ACHIEVEMENTS = [
    { id: "first_deal", name: "First Pulse", icon: "🎯", desc: "Share your first deal" },
    { id: "trendsetter", name: "Trendsetter", icon: "🔥", desc: "Get 100 likes on a deal" },
    { id: "hunter", name: "Pro Hunter", icon: "🎯", desc: "Complete 10 bounties" },
    { id: "social", name: "Socialite", icon: "💬", desc: "Get 50 followers" },
    { id: "savers", name: "Community Saver", icon: "💰", desc: "Community saves $10k total" },
    { id: "streak7", name: "Week Warrior", icon: "⚡", desc: "7 day posting streak" },
    { id: "foodie", name: "Foodie", icon: "🍔", desc: "Share 10 food deals" },
    { id: "tech", name: "Tech Scout", icon: "💻", desc: "Share 10 tech deals" }
];

export const NOTIFS = [
    { id: 1, type: 'like', text: 'FoodieKing liked your "Umami Burger" find!', time: '2m ago', icon: 'heart', color: 'var(--accent-pink)' },
    { id: 2, type: 'bounty', text: 'New Bounty: "PS5 Slim" requested near you.', time: '15m ago', icon: 'target', color: 'var(--accent-blue)', targetTab: 'bounties' },
    { id: 3, type: 'drop', text: 'Price Drop! "Elite Watch" is now $50 cheaper.', time: '1h ago', icon: 'trending-down', color: 'var(--accent-lime)' },
    { id: 4, type: 'follow', text: 'TechWiz started following you!', time: '1h ago', icon: 'user-plus', color: 'var(--accent-blue)' },
    { id: 5, type: 'comment', text: 'GadgetGuru commented on your iPhone deal!', time: '30m ago', icon: 'message', color: 'var(--accent-lime)' }
];

export const DEFAULT_USER = {
    id: 0,
    name: "Guest Hunter",
    bio: "Hunting deals...",
    home: "Singapore",
    xp: 0,
    deals: 0,
    followers: 0,
    following: 0,
    badges: []
};

export const DEFAULT_NOTIFICATION = {
    hasUnread: true
};

export default {
    DATA,
    USERS,
    CATEGORIES,
    BOUNTIES,
    ACHIEVEMENTS,
    NOTIFS,
    DEFAULT_USER
};