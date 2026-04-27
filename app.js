// ==========================================
// PRICEPULSE - GOLD MASTER ENGINE 💎🛰️
// Social Deals Finder & Hunter App
// ==========================================

const DATA = [
    { id: 1, user: "FoodieKing 🍔", name: "The Umami Burger", price: 18.5, loc: "Orchard Road", category: "food", img: "gourmet_burger_find_1777014996371.png", likes: 42, shares: 15, homePrice: 19.20, lat: 1.3048, lng: 103.8318 },
    { id: 2, user: "TechWiz 💻", name: "MacBook Pro M3", price: 3299, loc: "City Hall", category: "electronics", img: "premium_laptop_find_1777015033134.png", likes: 256, shares: 89, homePrice: 3499, lat: 1.2931, lng: 103.8522 },
    { id: 3, user: "StyleIcon ⌚", name: "Elite Watch", price: 1250, loc: "Marina Bay", category: "fashion", img: "luxury_watch_find_1777015121802.png", likes: 112, shares: 34, homePrice: 1350, lat: 1.2823, lng: 103.8584 },
    { id: 4, user: "BurgerLover", name: "The Umami Burger", price: 17.5, loc: "Somerset", category: "food", lat: 1.3000, lng: 103.8380, homePrice: 19.20, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300" },
    { id: 5, user: "CheapEats", name: "The Umami Burger", price: 16.0, loc: "Dhoby Ghaut", category: "food", lat: 1.2990, lng: 103.8450, homePrice: 19.20, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=300" },
    { id: 6, user: "GadgetGuru", name: "iPhone 15 Pro", price: 1299, loc: "Bugis", category: "electronics", likes: 189, shares: 67, homePrice: 1499, lat: 1.3000, lng: 103.8550, img: "https://images.unsplash.com/photo-1592750475338-f74cc3dbfc52?auto=format&fit=crop&q=80&w=300" },
    { id: 7, user: "SneakerHead", name: "Nike Air Max", price: 159, loc: "Orchard", category: "fashion", likes: 78, shares: 23, homePrice: 199, lat: 1.3048, lng: 103.8318, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300" },
    { id: 8, user: "HomeChef", name: "KitchenAid Mixer", price: 299, loc: "Jurong", category: "home", likes: 45, shares: 12, homePrice: 399, lat: 1.3300, lng: 103.7200, img: "https://images.unsplash.com/photo-1594385208974-2e75ebe8f9b2?auto=format&fit=crop&q=80&w=300" }
];

// Sample users for social features
const USERS = [
    { id: 1, name: "FoodieKing 🍔", bio: "Foodie Forever", home: "Orchard", xp: 2500, deals: 45, followers: 230, following: 89, badges: ["first Deal", "foodie"] },
    { id: 2, name: "TechWiz 💻", bio: "Tech hunter", home: "City Hall", xp: 5200, deals: 128, followers: 567, following: 120, badges: ["first Deal", "trending"] },
    { id: 3, name: "StyleIcon ⌚", bio: "Style scout", home: "Marina Bay", xp: 1800, deals: 34, followers: 189, following: 67, badges: ["first Deal"] },
    { id: 4, name: "BurgerLover", bio: "Burger enthusiast", home: "Somerset", xp: 950, deals: 12, followers: 45, following: 34, badges: ["newbie"] },
    { id: 5, name: "CheapEats", bio: "Frugal foodie", home: "Dhoby Ghaut", xp: 1400, deals: 28, followers: 112, following: 56, badges: ["first Deal"] },
    { id: 6, name: "GadgetGuru", bio: "Gadget deals", home: "Bugis", xp: 3200, deals: 89, followers: 345, following: 90, badges: ["first Deal", "power"] },
    { id: 7, name: "SneakerHead", bio: "Sneaker scout", home: "Orchard", xp: 2100, deals: 56, followers: 234, following: 78, badges: ["first Deal"] },
    { id: 8, name: "HomeChef", bio: "Home deals", home: "Jurong", xp: 1200, deals: 23, followers: 89, following: 45, badges: ["first Deal"] }
];

const CATEGORIES = [
    { id: "all", name: "All", icon: "grid" },
    { id: "food", name: "Food 🍔", icon: "utensils" },
    { id: "electronics", name: "Tech 💻", icon: "laptop" },
    { id: "fashion", name: "Fashion ⌚", icon: "shirt" },
    { id: "home", name: "Home 🏠", icon: "home" }
];

const BOUNTIES = [
    { id: 501, requester: "Shopaholic_99", item: "AirPods Pro 2", reward: "500 XP", details: "Looking for the cheapest set in the East!", applicants: 12 },
    { id: 502, requester: "Chef_Ray", item: "Wagyu A5 Ribeye", reward: "1.2k XP", details: "Need a butcher price check in Jurong.", applicants: 5 }
];

const ACHIEVEMENTS = [
    { id: "first_deal", name: "First Pulse", icon: "🎯", desc: "Share your first deal" },
    { id: "trendsetter", name: "Trendsetter", icon: "🔥", desc: "Get 100 likes on a deal" },
    { id: "hunter", name: "Pro Hunter", icon: "🎯", desc: "Complete 10 bounties" },
    { id: "social", name: "Socialite", icon: "💬", desc: "Get 50 followers" },
    { id: "savers", name: "Community Saver", icon: "💰", desc: "Community saves $10k total" },
    { id: "streak7", name: "Week Warrior", icon: "⚡", desc: "7 day posting streak" },
    { id: "foodie", name: "Foodie", icon: "🍔", desc: "Share 10 food deals" },
    { id: "tech", name: "Tech Scout", icon: "💻", desc: "Share 10 tech deals" }
];

const NOTIFS = [
    { id: 1, type: 'like', text: 'FoodieKing liked your "Umami Burger" find!', time: '2m ago', icon: 'heart', color: 'var(--accent-pink)' },
    { id: 2, type: 'bounty', text: 'New Bounty: "PS5 Slim" requested near you.', time: '15m ago', icon: 'target', color: 'var(--accent-blue)', targetTab: 'bounties' },
    { id: 3, type: 'drop', text: 'Price Drop! "Elite Watch" is now $50 cheaper.', time: '1h ago', icon: 'trending-down', color: 'var(--accent-lime)' },
    { id: 4, type: 'follow', text: 'TechWiz started following you!', time: '1h ago', icon: 'user-plus', color: 'var(--accent-blue)' },
    { id: 5, type: 'comment', text: 'GadgetGuru commented on your iPhone deal!', time: '30m ago', icon: 'message', color: 'var(--accent-lime)' }
];

// Comments for deals (stored by deal id)
let dealComments = {
    1: [{ user: "BurgerLover", text: "Found this at Somerset! Much cheaper!", time: "2h ago" }],
    2: [{ user: "TechWiz 💻", text: "Best price in SG right now!", time: "1h ago" }],
    6: [{ user: "CheapEats", text: "Got mine at Bugis! Same price!", time: "30m ago" }]
};

// Initialize state with social features
let state = { 
    finds: [...DATA], 
    users: [...USERS],
    bounties: [...BOUNTIES],
    notifications: [...NOTIFS],
    acceptedHunts: [],
    likes: {},
    following: [],
    comments: dealComments,
    xp: 0,
    streak: 0,
    lastPostDate: null,
    achievements: [],
    currentTab: 'deals',
    currentRadius: 10,
    userCoords: null,
    userLocationName: null,
    isLoggedIn: localStorage.getItem('pulse_auth') === 'true',
    user: JSON.parse(localStorage.getItem('pulse_user')) || { 
        name: "Guest Hunter", 
        bio: "Hunting deals...", 
        home: "Singapore",
        xp: 0,
        deals: 0,
        followers: 0,
        following: 0,
        badges: []
    },
    map: null,
    markers: [],
    hasUnreadNotifs: true,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    alerts: JSON.parse(localStorage.getItem('alerts') || '[]'),
    searchQuery: "",
    activeCategory: "all",
    searchMode: false,
    activeFilter: "hot",
    sortBy: "hot"
};

const get = (id) => document.getElementById(id);

// --- 1. REVERSE GEOCODING ---

async function reverseGeocode(lat, lng) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
        const data = await response.json();
        
        if (data.address) {
            const addr = data.address;
            const parts = [];
            
            if (addr.building) parts.push(addr.building);
            if (addr.road) parts.push(addr.road);
            if (addr.neighbourhood) parts.push(addr.neighbourhood);
            if (addr.suburb) parts.push(addr.suburb);
            if (addr.city) parts.push(addr.city);
            else if (addr.town) parts.push(addr.town);
            else if (addr.county) parts.push(addr.county);
            if (addr.country) parts.push(addr.country);
            
            return parts.join(', ') || data.display_name?.split(',').slice(0,2).join(',') || 'Unknown location';
        }
        return data.display_name?.split(',').slice(0,2).join(',') || 'Unknown location';
    } catch (e) {
        console.error('Geocode error:', e);
        return 'Location detected';
    }
}

// --- 2. MAP INITIALIZATION ---

window.initMap = () => {
    const mapContainer = get('leaflet-map');
    if (!mapContainer || state.map) return;
    
    // Default: Singapore
    const defaultLat = 1.3521;
    const defaultLng = 103.8198;
    
    const userLat = state.userCoords?.lat || defaultLat;
    const userLng = state.userCoords?.lng || defaultLng;
    
    state.map = L.map('leaflet-map', { zoomControl: false }).setView([userLat, userLng], 14);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19
    }).addTo(state.map);
    
    // User location marker (blue pulsing)
    const userIcon = L.divIcon({
        className: 'user-marker',
        html: '<div style="width:20px;height:20px;background:#3b82f6;border-radius:50%;border:3px solid white;box-shadow:0 0 15px rgba(59,130,246,0.8);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    L.marker([userLat, userLng], { icon: userIcon, draggable: true })
        .addTo(state.map)
        .bindPopup(`<div style="text-align:center;min-width:150px;"><b style="color:#3b82f6;">📍 You are here</b><br><span style="font-size:0.75rem;opacity:0.7;">${state.userLocationName || 'Location detected'}</span></div>`)
        .openPopup();
    
    // Add deal markers
    window.updateMapMarkers();
};

// --- 2. GEOLOCATION & DISTANCE ---

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2-lat1)*Math.PI/180; const dLon = (lon2-lon1)*Math.PI/180;
    const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function sortFeedByProximity() {
    if (!state.userCoords) return;
    state.finds.sort((a, b) => calculateDistance(state.userCoords.lat, state.userCoords.lng, a.lat, a.lng) - calculateDistance(state.userCoords.lat, state.userCoords.lng, b.lat, b.lng));
    renderFeed();
}

// --- SEARCH & FILTER ---
window.searchDeals = (query) => {
    state.searchQuery = query.toLowerCase();
    state.searchMode = query.length > 0;
    renderFeed();
};

window.filterByCategory = (cat) => {
    state.activeCategory = cat;
    renderFeed();
};

function getFilteredDeals() {
    let deals = [...state.finds];
    
    // Filter by category
    if (state.activeCategory !== "all") {
        deals = deals.filter(d => d.category === state.activeCategory);
    }
    
    // Filter by search
    if (state.searchQuery) {
        deals = deals.filter(d => 
            d.name.toLowerCase().includes(state.searchQuery) ||
            d.loc.toLowerCase().includes(state.searchQuery) ||
            d.category?.toLowerCase().includes(state.searchQuery) ||
            d.user?.toLowerCase().includes(state.searchQuery)
        );
    }
    
    // Sort
    return getSortedDeals(deals);
}

// --- FAVORITES ---
window.toggleFavorite = (id) => {
    const idx = state.favorites.indexOf(id);
    if (idx > -1) {
        state.favorites.splice(idx, 1);
        showNotification("💔 Removed from favorites");
    } else {
        state.favorites.push(id);
        showNotification("❤️ Added to favorites!");
    }
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    renderFeed();
};

window.isFavorite = (id) => state.favorites.includes(id);

window.showFavorites = () => {
    state.currentTab = 'favorites';
    get('feed-container').style.display = 'block';
    get('bounty-container').style.display = 'none';
    get('tab-deals').style.background = 'transparent';
    get('tab-deals').style.color = 'white';
    get('tab-bounties').style.background = 'transparent';
    get('tab-bounties').style.color = 'white';
    renderFeed();
};

// --- SOCIAL: LIKES ---
window.toggleLike = (dealId) => {
    if (!state.isLoggedIn) { window.openAuth(); return; }
    const deal = state.finds.find(d => d.id === dealId);
    if (!deal) return;
    
    const isLiked = state.likes[dealId]?.includes(state.user.name);
    
    if (isLiked) {
        state.likes[dealId] = state.likes[dealId].filter(u => u !== state.user.name);
        deal.likes = Math.max(0, (deal.likes || 1) - 1);
        showNotification("💔 Unliked");
    } else {
        if (!state.likes[dealId]) state.likes[dealId] = [];
        state.likes[dealId].push(state.user.name);
        deal.likes = (deal.likes || 0) + 1;
        showNotification("❤️ Liked!");
        
        // Award XP
        addXP(5);
    }
    renderFeed();
};

window.hasLiked = (dealId) => {
    return state.likes[dealId]?.includes(state.user.name) || false;
};

// --- SOCIAL: COMMENTS ---
window.openComments = (dealId) => {
    state.currentSelectedItem = state.finds.find(d => d.id === dealId);
    if (!state.currentSelectedItem) return;
    state.activeDealId = dealId;
    get('comments-deal-title').innerText = state.currentSelectedItem.name;
    renderComments(dealId);
    window.openModal('comments-modal');
};

function renderComments(dealId) {
    const comments = state.comments[dealId] || [];
    const list = get('comments-list');
    list.innerHTML = '';
    
    if (comments.length === 0) {
        list.innerHTML = '<p style="text-align:center;padding:30px;color:var(--text-gray);">No comments yet. Be the first! 💬</p>';
        return;
    }
    
    comments.forEach(c => {
        const div = document.createElement('div');
        div.className = 'action-chip';
        div.style = 'flex-direction:column;align-items:flex-start;padding:15px;gap:5px;';
        div.innerHTML = `<div style="font-weight:700;font-size:0.8rem;">@${c.user}</div><div style="font-size:0.9rem;">${c.text}</div><div style="font-size:0.7rem;color:var(--text-gray);">${c.time}</div>`;
        list.appendChild(div);
    });
}

window.postComment = () => {
    const text = get('comment-input').value.trim();
    const dealId = state.activeDealId;
    if (!text || !dealId) return;
    
    if (!state.comments[dealId]) state.comments[dealId] = [];
    state.comments[dealId].unshift({
        user: state.user.name,
        text,
        time: 'Just now'
    });
    
    get('comment-input').value = '';
    renderComments(dealId);
    showNotification("💬 Comment posted!");
    addXP(3);
};

// --- SOCIAL: FOLLOW ---
window.followUser = (userName) => {
    if (!state.isLoggedIn) { window.openAuth(); return; }
    if (userName === state.user.name) {
        showNotification("Can't follow yourself!");
        return;
    }
    if (state.following.includes(userName)) {
        showNotification("Already following!");
        return;
    }
    state.following.push(userName);
    state.user.following = (state.user.following || 0) + 1;
    localStorage.setItem('pulse_user', JSON.stringify(state.user));
    showNotification(`✅ Following @${userName}`);
    addXP(10);
};

window.isFollowing = (userName) => {
    return state.following.includes(userName);
};

// --- XP & GAMIFICATION ---
function addXP(amount) {
    state.user.xp = (state.user.xp || 0) + amount;
    state.xp = state.user.xp;
    
    // Check streak
    const today = new Date().toDateString();
    if (state.lastPostDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (state.lastPostDate === yesterday.toDateString()) {
            state.streak++;
        } else {
            state.streak = 1;
        }
        state.lastPostDate = today;
        
        // Streak achievements
        if (state.streak >= 7) unlockAchievement('streak7');
    }
    
    // Check level up
    checkLevelUp();
    saveUserState();
    
    // Update UI
    updateXPDisplay();
}

function checkLevelUp() {
    const level = getLevelFromXP(state.user.xp || 0);
    const prevLevel = getLevelFromXP((state.user.xp || 0) - 100);
    if (level > prevLevel) {
        showNotification(`🎉 Level Up! You're now level ${level}!`);
    }
}

function getLevelFromXP(xp) {
    if (xp >= 5000) return 5;
    if (xp >= 2500) return 4;
    if (xp >= 1000) return 3;
    if (xp >= 500) return 2;
    return 1;
}

function getXPForNextLevel() {
    const level = getLevelFromXP(state.user.xp || 0);
    const thresholds = [0, 500, 1000, 2500, 5000];
    const next = thresholds[level] || 5000;
    return next - (state.user.xp || 0);
}

function updateXPDisplay() {
    const xpEl = get('user-xp-display');
    if (xpEl) {
        const xp = state.user.xp || 0;
        const level = getLevelFromXP(xp);
        xpEl.innerText = `Lv.${level} • ${xp} XP`;
    }
}

function unlockAchievement(id) {
    if (state.achievements.includes(id)) return;
    state.achievements.push(id);
    state.user.badges = state.user.badges || [];
    state.user.badges.push(id);
    saveUserState();
    
    const achievement = ACHIEVEMENTS.find(a => a.id === id);
    if (achievement) {
        showNotification(`🏆 Unlocked: ${achievement.icon} ${achievement.name}!`);
    }
}

// --- USER STATE ---
function saveUserState() {
    localStorage.setItem('pulse_user', JSON.stringify(state.user));
    localStorage.setItem('pulse_xp', state.xp);
    localStorage.setItem('pulse_streak', state.streak);
    localStorage.setItem('pulse_achievements', JSON.stringify(state.achievements));
    localStorage.setItem('pulse_following', JSON.stringify(state.following));
}

// --- SORT & FILTER ---
window.setSortBy = (sort) => {
    state.sortBy = sort;
    renderFeed();
};

window.setFilterBy = (filter) => {
    state.activeFilter = filter;
    renderFeed();
};

function getSortedDeals(deals) {
    let sorted = [...deals];
    
    switch(state.sortBy) {
        case 'new':
            sorted.sort((a, b) => b.id - a.id);
            break;
        case 'price_low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price_high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'savings':
            sorted.sort((a, b) => (b.homePrice - b.price) - (a.homePrice - a.price));
            break;
        case 'likes':
            sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
            break;
        case 'hot':
        default:
            // Hot = balanced score
            sorted.sort((a, b) => {
                const scoreA = (a.likes || 0) * 2 + (a.homePrice - a.price);
                const scoreB = (b.likes || 0) * 2 + (b.homePrice - b.price);
                return scoreB - scoreA;
            });
    }
    
    return sorted;
}

// --- DEAL ALERTS ---
window.createAlert = (itemName) => {
    if (!state.isLoggedIn) { window.openAuth(); return; }
    if (state.alerts.includes(itemName)) {
        showNotification("⚠️ Alert already exists!");
        return;
    }
    state.alerts.push(itemName);
    localStorage.setItem('alerts', JSON.stringify(state.alerts));
    showNotification("🔔 Alert created for ${itemName}!");
};

window.checkAlerts = () => {
    state.alerts.forEach(itemName => {
        const deal = state.finds.find(d => d.name === itemName);
        if (deal && deal.price < deal.homePrice * 0.8) {
            state.notifications.unshift({
                id: Date.now(),
                type: 'alert',
                text: 'Price Drop! ${itemName} is now at its lowest!',
                time: 'Just now',
                icon: 'bell',
                color: 'var(--accent-lime)'
            });
        }
    });
    renderNotifications();
};

// --- REPORT ---
window.reportDeal = (id) => {
    const reason = prompt("Why are you reporting this deal? (spam/fake/expired)");
    if (reason) {
        showNotification("🚩 Deal reported. Thank you!");
        // In production, save to Firestore
    }
};

window.updateMapMarkers = () => {
    if (!state.map) return;
    state.markers.forEach(m => state.map.removeLayer(m));
    state.markers = [];
    const pulseIcon = L.divIcon({ className: 'pulse-marker', iconSize: [20, 20], iconAnchor: [10, 10] });
    state.finds.forEach(item => {
        const marker = L.marker([item.lat, item.lng], { icon: pulseIcon }).addTo(state.map);
        marker.bindPopup(`<div style="padding: 15px; text-align:center;"><p style="font-size:0.7rem; color:var(--accent-lime); font-weight:800; margin-bottom:5px;">$${item.price.toLocaleString()}</p><h4 style="font-size:1rem; margin-bottom:12px;">${item.name}</h4><div style="display:flex; flex-direction:column; gap:8px;"><button onclick="window.showComparison(${item.id})" style="background:var(--accent-lime); color:#000; border:none; padding:8px; border-radius:12px; font-weight:900; font-size:0.7rem; cursor:pointer; width:100%;">ANALYZE</button></div></div>`, { className: 'custom-popup' });
        state.markers.push(marker);
    });
};

// --- 3. AUTH & IDENTITY ---

function updateIdentityUI() {
    if (state.isLoggedIn) {
        get('user-identity-text').style.display = 'block';
        get('user-display-name').innerText = state.user.name;
        get('user-avatar-container').style.borderColor = 'var(--accent-lime)';
        get('profile-name').value = state.user.name;
        get('profile-bio').value = state.user.bio || "";
        get('profile-home').value = state.user.home || "";
        get('notif-dot').style.display = state.hasUnreadNotifs ? 'block' : 'none';
    } else {
        get('user-identity-text').style.display = 'none';
        get('user-avatar-container').style.borderColor = 'transparent';
        get('notif-dot').style.display = 'none';
    }
}

window.mockLogin = (method) => {
    state.isLoggedIn = true;
    state.user = { name: "Pulse Hunter", bio: "Scout", home: "Singapore", method };
    localStorage.setItem('pulse_auth', 'true');
    localStorage.setItem('pulse_user', JSON.stringify(state.user));
    updateIdentityUI(); window.closeModals(); renderFeed();
    showNotification("✅ Logged in!");
};

// Firebase login functions (with fallback to mock)
window.loginWithGoogle = () => {
    if (typeof loginWithGoogleFirebase === 'function') {
        loginWithGoogleFirebase();
    } else {
        // Fallback to mock
        showNotification("🔄 Connecting to Google...");
        setTimeout(() => {
            state.isLoggedIn = true;
            state.user = { name: "Google User", bio: "Price Hunter", home: "Singapore", method: 'google', photo: '' };
            localStorage.setItem('pulse_auth', 'true');
            localStorage.setItem('pulse_user', JSON.stringify(state.user));
            updateIdentityUI(); window.closeModals(); renderFeed();
            showNotification("✅ Logged in with Google (Demo)!");
        }, 1500);
    }
};

window.loginWithApple = () => {
    if (typeof loginWithAppleFirebase === 'function') {
        loginWithAppleFirebase();
    } else {
        // Fallback to mock
        showNotification("🔄 Connecting to Apple...");
        setTimeout(() => {
            state.isLoggedIn = true;
            state.user = { name: "Apple User", bio: "Price Hunter", home: "Singapore", method: 'apple', photo: '' };
            localStorage.setItem('pulse_auth', 'true');
            localStorage.setItem('pulse_user', JSON.stringify(state.user));
            updateIdentityUI(); window.closeModals(); renderFeed();
            showNotification("✅ Logged in with Apple (Demo)!");
        }, 1500);
    }
};

window.loginWithEmailWrapper = () => {
    if (typeof loginWithEmailFirebase === 'function') {
        loginWithEmailFirebase();
    } else {
        // Use demo email verification
        window.loginWithEmail();
    }
};

window.logout = () => {
    if (typeof logoutFirebase === 'function') {
        logoutFirebase();
    } else {
        localStorage.clear();
        location.reload();
    }
};

window.saveProfile = () => {
    if (typeof saveProfileToFirestore === 'function') {
        saveProfileToFirestore();
    } else {
        // Demo fallback
        state.user.name = get('profile-name').value;
        state.user.bio = get('profile-bio').value;
        state.user.home = get('profile-home').value;
        localStorage.setItem('pulse_user', JSON.stringify(state.user));
        updateIdentityUI(); showNotification("✅ Identity Updated!"); renderFeed();
    }
};

window.requestEmailVerification = () => {
    const email = get('auth-email')?.value;
    if (!email) {
        showNotification("Please enter your email first");
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        showNotification("Please enter a valid email");
        return;
    }
    
    // Store pending registration
    const password = get('auth-password')?.value;
    if (!password || password.length < 6) {
        showNotification("Password must be at least 6 characters");
        return;
    }
    
    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    state.pendingRegistration = { email, password, verificationCode };
    localStorage.setItem('pending_verification', verificationCode);
    
    // Show verification modal
    window.openModal('verification-modal');
    get('verification-email-display').innerText = email;
    showNotification("📧 Verification code sent!");
    
    // Simulate sending email (in production, use backend service)
    console.log("Verification code:", verificationCode);
    showNotification(`📧 Code sent to ${email.replace(/.{3}/, '***')}`);
};

window.verifyEmailCode = () => {
    const inputCode = get('verification-code')?.value;
    const pending = state.pendingRegistration;
    
    if (!pending) {
        showNotification("No pending verification. Please register again.");
        return;
    }
    
    if (inputCode !== pending.verificationCode) {
        showNotification("❌ Invalid verification code");
        return;
    }
    
    // Complete registration
    state.isLoggedIn = true;
    state.user = { 
        name: pending.email.split('@')[0], 
        email: pending.email, 
        bio: "New Hunter", 
        home: "Singapore", 
        method: 'email',
        emailVerified: true 
    };
    localStorage.setItem('pulse_auth', 'true');
    localStorage.setItem('pulse_user', JSON.stringify(state.user));
    delete state.pendingRegistration;
    localStorage.removeItem('pending_verification');
    
    updateIdentityUI(); 
    closeModals(); 
    renderFeed();
    showNotification("✅ Email verified! Account created!");
};

window.resendVerificationCode = () => {
    if (!state.pendingRegistration) return;
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    state.pendingRegistration.verificationCode = newCode;
    localStorage.setItem('pending_verification', newCode);
    console.log("New verification code:", newCode);
    showNotification("📧 New code sent!");
};

// --- FIRESTORE: SAVE/LOAD DEALS ---
window.saveDealToFirestore = async (deal) => {
    if (!db || !firebaseAuth?.currentUser) {
        // Demo fallback - save locally
        state.finds.unshift(deal);
        renderFeed();
        showNotification("✅ Deal saved!");
        return;
    }
    try {
        await db.collection('deals').add({
            ...deal,
            userId: firebaseAuth.currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        showNotification("✅ Deal saved to cloud!");
    } catch(e) {
        console.error('Save deal error:', e);
        showNotification("Saved locally");
    }
};

window.loadDealsFromFirestore = async () => {
    if (!db) return; // Will use local data
    try {
        const snapshot = await db.collection('deals')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();
        
        if (!snapshot.empty) {
            const cloudDeals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Merge with local deals (cloud first)
            state.finds = [...cloudDeals, ...state.finds];
            renderFeed();
        }
    } catch(e) {
        console.log('Using local deals');
    }
}

// --- AI INITIALIZATION ---
if (typeof window.initializeGemini === 'function') {
    window.initializeGemini();
}

window.loginWithEmail = () => {
    const email = get('auth-email')?.value;
    const password = get('auth-password')?.value;
    
    if (!email || !password) {
        showNotification("Please enter email and password");
        return;
    }
    if (password.length < 6) {
        showNotification("Password must be at least 6 characters");
        return;
    }
    
    // Check if already verified before
    const savedUser = localStorage.getItem('pulse_user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.email === email && user.emailVerified) {
            state.isLoggedIn = true;
            state.user = user;
            updateIdentityUI(); window.closeModals(); renderFeed();
            showNotification("✅ Logged in!");
            return;
        }
    }
    
    // Request verification first
    window.requestEmailVerification();
};

window.linkTwitter = () => {
    if (!state.isLoggedIn) { window.openAuth(); return; }
    showNotification("🐦 Opening Twitter linking...");
    setTimeout(() => showNotification("✅ Twitter linked!"), 2000);
};

window.linkInstagram = () => {
    if (!state.isLoggedIn) { window.openAuth(); return; }
    showNotification("📸 Opening Instagram linking...");
    setTimeout(() => showNotification("✅ Instagram linked!"), 2000);
};

window.shareToTwitter = () => {
    const item = state.currentSelectedItem;
    if (!item) { showNotification("Select an item first"); return; }
    const savings = item.homePrice - item.price;
    const text = encodeURIComponent(`🚀 Found ${item.name} for $${item.price} at ${item.loc}! Save $${savings.toFixed(2)}! #PricePulse`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
};

window.shareToWhatsApp = () => {
    const item = state.currentSelectedItem;
    if (!item) { showNotification("Select an item first"); return; }
    const savings = item.homePrice - item.price;
    const text = encodeURIComponent(`🚀 Found ${item.name} for $${item.price} at ${item.loc}! Save $${savings.toFixed(2)}! #PricePulse`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
};

// --- AI FEATURES ---
window.analyzeWithAI = async () => {
    if (!state.currentSelectedItem) {
        showNotification("Select a deal first to analyze");
        return;
    }
    const item = state.currentSelectedItem;
    showNotification("🤖 AI is analyzing...");
    
    try {
        const analysis = await window.analyzeDealWithAI(item.name, item.price, item.loc);
        get('ai-analysis-result').innerText = analysis || "Analysis complete!";
        window.openModal('ai-analysis-modal');
    } catch(e) {
        showNotification("AI analysis unavailable");
    }
};

window.getAIRecs = async () => {
    showNotification("🤖 Getting recommendations...");
    try {
        const recs = await window.getAIRecommendations(state.user);
        get('ai-recs-result').innerText = recs || "Check back soon!";
        window.openModal('ai-recs-modal');
    } catch(e) {
        showNotification("AI recommendations unavailable");
    }
};

window.aiChat = async (message) => {
    showNotification("🤖 AI is thinking...");
    try {
        const reply = await window.aiChat(message, state.aiHistory || []);
        get('ai-chat-output').innerText = reply;
        state.aiHistory = state.aiHistory || [];
        state.aiHistory.push({ role: 'user', content: message });
        state.aiHistory.push({ role: 'assistant', content: reply });
        window.openModal('ai-chat-modal');
    } catch(e) {
        showNotification("AI chat unavailable");
    }
};

window.saveProfile = () => {
    state.user.name = get('profile-name').value;
    state.user.bio = get('profile-bio').value;
    state.user.home = get('profile-home').value;
    localStorage.setItem('pulse_user', JSON.stringify(state.user));
    updateIdentityUI(); showNotification("✅ Identity Updated!"); renderFeed();
};

window.logout = () => { localStorage.clear(); location.reload(); };

// --- 4. NOTIFICATION CENTER ---

window.openNotifications = () => {
    if (!state.isLoggedIn) { window.openAuth(); return; }
    window.closeModals();
    get('notif-drawer').style.display = 'flex';
    get('notif-dot').style.display = 'none';
    state.hasUnreadNotifs = false;
    renderNotifications();
};

function renderNotifications() {
    const list = get('notif-list'); list.innerHTML = '';
    if (state.notifications.length === 0) { list.innerHTML = '<p style="text-align:center; padding:40px; color:var(--text-gray);">All clear!</p>'; return; }
    state.notifications.forEach(n => {
        const item = document.createElement('div'); item.className = 'action-chip';
        item.style = 'justify-content:flex-start; padding:15px; border-radius:20px; gap:15px; background:rgba(255,255,255,0.03); cursor:pointer;';
        item.onclick = () => { if(n.targetTab) window.switchTab(n.targetTab); window.closeModals(); };
        item.innerHTML = `<div style="width:35px; height:35px; border-radius:10px; background:${n.color}22; color:${n.color}; display:flex; align-items:center; justify-content:center;"><i data-lucide="${n.icon}" size="18"></i></div><div style="flex:1;"><p style="font-size:0.8rem; font-weight:700; line-height:1.3;">${n.text}</p><span style="font-size:0.6rem; color:var(--text-gray);">${n.time}</span></div>`;
        list.appendChild(item);
    });
    lucide.createIcons();
}

window.clearNotifs = () => { state.notifications = []; renderNotifications(); showNotification("✨ Activity cleared!"); };

// --- 5. NAVIGATION & TABS ---

window.switchView = (v) => {
    const isMap = v === 'map';
    const feedContainer = get('feed-container');
    const bountyContainer = get('bounty-container');
    const mapView = get('map-view');
    
    // Toggle visibility
    if (mapView) mapView.style.display = isMap ? 'flex' : 'none';
    if (feedContainer) feedContainer.style.display = !isMap && state.currentTab === 'deals' ? 'flex' : 'none';
    if (bountyContainer) bountyContainer.style.display = !isMap && state.currentTab === 'bounties' ? 'flex' : 'none';
    
    const header = document.querySelector('header');
    if (isMap) { 
        header.style.opacity = '0'; 
        setTimeout(() => header.style.display = 'none', 300); 
    } else { 
        header.style.display = 'block'; 
        setTimeout(() => header.style.opacity = '1', 10); 
    }
    document.querySelectorAll('.nav-pill').forEach(p => { const oc = p.getAttribute('onclick'); if (oc && oc.includes(`'${v}'`)) p.classList.add('active'); else p.classList.remove('active'); });
    
    // Initialize map
    if (isMap) { 
        window.initMap(); 
        setTimeout(() => {
            if (state.map) {
                state.map.invalidateSize();
                state.map.setView([
                    state.userCoords?.lat || 1.3521,
                    state.userCoords?.lng || 103.8198
                ], 14);
            }
        }, 300); 
    }
};

window.switchTab = (tab) => {
    if (!state.isLoggedIn && tab === 'bounties') { window.openAuth(); return; }
    state.currentTab = tab;
    const feedContainer = get('feed-container');
    const bountyContainer = get('bounty-container');
    if (feedContainer) feedContainer.style.display = tab === 'deals' ? 'flex' : 'none';
    if (bountyContainer) bountyContainer.style.display = tab === 'bounties' ? 'flex' : 'none';
    const dBtn = get('tab-deals'); const bBtn = get('tab-bounties');
    if (tab === 'deals') { dBtn.style.background = 'var(--accent-lime)'; dBtn.style.color = '#000'; bBtn.style.background = 'transparent'; bBtn.style.color = 'white'; renderFeed(); }
    else { bBtn.style.background = 'var(--accent-lime)'; bBtn.style.color = '#000'; dBtn.style.background = 'transparent'; dBtn.style.color = 'white'; renderBounties(); }
};

// --- 6. RADAR & ANALYTICS ---

window.showComparison = (id) => {
    if (!state.isLoggedIn) { window.openAuth(); return; }
    const item = state.finds.find(i => i.id === id); if (!item) return;
    state.currentSelectedItem = item; 
    get('analytics-title').innerText = item.name; 
    window.openModal('analytics-modal');
    updateComparisonUI(item);
    get('radius-slider').oninput = (e) => { state.currentRadius = parseInt(e.target.value); get('radius-val').innerText = state.currentRadius + 'km'; updateComparisonUI(item); };
};

function updateComparisonUI(item) {
    get('home-price-val').innerText = `$${item.homePrice.toLocaleString()}`;
    const savings = item.homePrice - item.price; get('savings-val').innerText = (savings >= 0 ? '-' : '+') + `$${Math.abs(savings).toFixed(2)}`; get('savings-val').style.color = savings >= 0 ? 'var(--accent-lime)' : 'var(--accent-pink)';
    const list = get('nearby-pulses-list'); list.innerHTML = '';
    const filtered = state.finds.filter(o => {
        if (o.id === item.id || o.name !== item.name) return false;
        const dist = calculateDistance(item.lat, item.lng, o.lat, o.lng);
        o.tempDist = dist;
        return dist <= state.currentRadius;
    });
    if(filtered.length === 0) list.innerHTML = `<p style="text-align:center; padding:20px; color:var(--text-gray); font-size:0.8rem;">Searching ${state.currentRadius}km...</p>`;
    filtered.sort((a,b)=>a.tempDist - b.tempDist).forEach(c => {
        const row = document.createElement('div'); const isBetter = c.price < item.price; row.className = 'action-chip'; row.style = `display:flex; justify-content:space-between; width:100%; border-radius:20px; padding:15px; background:rgba(255,255,255,0.03); border: 1px solid ${isBetter ? 'var(--accent-lime)' : 'transparent'}; cursor:pointer; margin-bottom:10px;`;
        row.onclick = () => { get('comparison-sub-detail').style.display='block'; get('sub-detail-img').src=c.img; get('sub-detail-shop').innerText=c.loc; get('sub-detail-user').innerText=`@${c.user} SHARED THIS!`; };
        row.innerHTML = `<div style="text-align:left;"><span style="font-weight:800; display:block;">${c.loc}</span><span style="font-size:0.7rem; color:var(--text-gray);">${c.tempDist.toFixed(1)}km away</span></div><div style="text-align:right;"><span style="font-family:'Outfit'; font-weight:900; color:${isBetter ? 'var(--accent-lime)' : 'white'}; font-size:1.1rem;">$${c.price.toLocaleString()}</span></div>`;
        list.appendChild(row);
    });
}

// --- 7. CONTENT RENDERERS (FEED & BOUNTIES) ---

function renderFeed() {
    const container = get('feed-container'); 
    if (!container) {
        console.error('Feed container not found');
        return;
    }
    
    container.innerHTML = '';
    
    // Fallback: render default sample data if state.finds is empty
    let deals = state.finds;
    if (!deals || deals.length === 0) {
        console.log('Using fallback sample data');
        deals = [
            { id: 1, user: "FoodieKing 🍔", name: "The Umami Burger", price: 18.5, loc: "Orchard Road", category: "food", img: "gourmet_burger_find_1777014996371.png", likes: 42, homePrice: 19.20 },
            { id: 2, user: "TechWiz 💻", name: "MacBook Pro M3", price: 3299, loc: "City Hall", category: "electronics", img: "premium_laptop_find_1777015033134.png", likes: 256, homePrice: 3499 },
            { id: 3, user: "StyleIcon ⌚", name: "Elite Watch", price: 1250, loc: "Marina Bay", category: "fashion", img: "luxury_watch_find_1777015121802.png", likes: 112, homePrice: 1350 }
        ];
    }
    
    console.log('Rendering', deals.length, 'deals');
    
    let list = deals;
    
    list.forEach(item => {
        const uName = item.user === "You 🌟" ? state.user.name + " (You)" : item.user;
        const hasLiked = window.hasLiked(item.id);
        const isFav = window.isFavorite(item.id);
        const savings = item.homePrice - item.price;
        const savingsPct = ((savings / item.homePrice) * 100).toFixed(0);
        
        const card = document.createElement('div'); 
        card.className = 'insta-card';
        
        card.innerHTML = `
            <div class="card-header">
                <div class="card-avatar" onclick="window.showUserProfile('${item.user}')">${uName[0]}</div>
                <div class="card-user" onclick="window.showUserProfile('${item.user}')">${uName}</div>
                <div class="card-location">${item.loc}</div>
            </div>
            
            <div class="card-content" onclick="window.showComparison(${item.id})">
                <img src="${item.img}" class="card-image">
                <div class="card-price">$${item.price.toLocaleString()}</div>
            </div>
            
            <div class="card-actions">
                <div class="action-btn ${hasLiked ? 'liked' : ''}" onclick="window.toggleLike(${item.id})">
                    <i data-lucide="heart" size="26" fill="${hasLiked ? 'var(--accent-pink)' : 'none'}"></i>
                </div>
                <div class="action-btn" onclick="window.openComments(${item.id})">
                    <i data-lucide="message-circle" size="26"></i>
                </div>
                <div class="action-btn" onclick="window.sharePulse()">
                    <i data-lucide="send" size="26"></i>
                </div>
                <div style="flex:1;"></div>
                <div class="action-btn" onclick="window.toggleFavorite(${item.id})">
                    <i data-lucide="bookmark" size="26" fill="${isFav ? 'var(--accent-lime)' : 'none'}"></i>
                </div>
            </div>
            
            <div class="card-info">
                <div class="likes-count">${item.likes} likes</div>
                <div class="deal-caption">
                    <span style="font-weight: 600;">${uName}</span> ${item.name}
                    ${item.tagline ? `<span class="deal-tagline">"${item.tagline}"</span>` : ''}
                </div>
                <div class="view-comments" onclick="window.openComments(${item.id})">
                    View all ${(state.comments[item.id] || []).length} comments
                </div>
                <div class="time-posted">${savingsPct}% OFF</div>
            </div>
        `;
        container.appendChild(card);
    });
    
    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📸</div>
                <h3>No deals yet</h3>
                <p>Be the first to share a deal!</p>
            </div>
        `;
    }
    
    lucide.createIcons();
}

function renderBounties() {
    const container = get('bounty-container'); container.innerHTML = '';
    state.bounties.forEach(b => {
        const isAccepted = state.acceptedHunts.includes(b.id);
        const card = document.createElement('div'); card.className = 'card'; card.style = `border-left: 5px solid ${isAccepted ? 'var(--accent-blue)' : 'var(--accent-lime)'};`;
        card.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:15px;"><div><span style="font-size:0.7rem; color:var(--text-gray); font-weight:800;">BOUNTY BY @${b.requester}</span><h2 style="font-size:1.6rem; margin-top:5px;">${b.item}</h2></div><div style="background:var(--accent-lime); color:#000; padding:8px 15px; border-radius:15px; font-weight:900; font-size:0.9rem;">${b.reward}</div></div><p style="color:var(--text-gray); font-size:0.9rem; margin-bottom:20px;">"${b.details}"</p><div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:0.8rem; font-weight:700;">${isAccepted ? '✅ ON THE TRAIL' : `🎯 ${b.applicants} Hunters on the trail`}</span><button class="action-chip" style="background:${isAccepted ? 'rgba(255,255,255,0.05)' : 'var(--accent-blue)'}; color:white; border:none;" onclick="window.huntBounty(${b.id})">${isAccepted ? 'HUNTING...' : 'ACCEPT HUNT'}</button></div>`;
        container.appendChild(card);
    });
}

window.huntBounty = (id) => {
    if (!state.isLoggedIn) { window.openAuth(); return; }
    if (state.acceptedHunts.includes(id)) return;
    state.acceptedHunts.push(id); renderBounties(); showNotification("🎯 Hunt Accepted!");
};

// --- 8. GLOBAL UTILS ---

window.submitForm = async () => {
    if(!state.isLoggedIn) { window.openAuth(); return; }
    const name = get('inp-name').value; const price = get('inp-price').value; const loc = get('inp-loc').value;
    if(!name || !price || !loc) return;
    const form = get('upload-form'); const orig = form.innerHTML;
    form.innerHTML = `<div style="padding:40px 0; text-align:center;"><i data-lucide="scan" class="pulse-anim" size="48" style="color:var(--accent-lime); margin-bottom:20px;"></i><p style="font-weight:800;">AI ANALYZING...</p><div style="width:100%; height:4px; background:rgba(255,255,255,0.1); border-radius:10px; margin-top:20px; overflow:hidden;"><div id="scan-bar" style="width:0%; height:100%; background:var(--accent-lime); transition: width 1.5s linear;"></div></div></div>`;
    lucide.createIcons(); setTimeout(() => get('scan-bar').style.width = '100%', 50);
    
    // AI Auto-categorize
    let category = 'other';
    try {
        category = await window.autoCategorize(name);
    } catch(e) { console.log('Auto-categorize failed, using default'); }
    
    setTimeout(async () => {
        const deal = { 
            id: Date.now(), 
            user: "You 🌟", 
            name, 
            price: parseFloat(price), 
            loc, 
            category,
            img: "https://images.unsplash.com/photo-1512428559083-a400562e445f?auto=format&fit=crop&q=80&w=1000", 
            homePrice: parseFloat(price)*1.1, 
            lat: state.userCoords ? state.userCoords.lat : 1.3, 
            lng: state.userCoords ? state.userCoords.lng : 103.8 
        };
        
        // AI generate description and tagline
        try {
            deal.description = await window.generateDealDescription(name, price, category);
            deal.tagline = await window.generateDealTagline(name, price, deal.homePrice - price);
            deal.bargainScore = await window.getBargainScore(deal);
        } catch(e) { console.log('AI enhancement failed'); }
        
        state.finds.unshift(deal);
        form.innerHTML = orig; renderFeed(); window.closeModals(); window.updateMapMarkers();
        showNotification("🤖 Deal posted with AI insights!");
    }, 800);
};

window.closeModals = () => { 
    document.querySelectorAll('.modal-overlay').forEach(m => {
        m.style.display = 'none';
    }); 
};

window.openModal = (id) => {
    window.closeModals();
    const modal = get(id);
    if (modal) modal.style.display = 'flex';
};

window.sharePulse = () => {
    const item = state.currentSelectedItem; if(!item) return;
    const savings = item.homePrice - item.price;
    const text = `🚀 Pulse Alert! Found ${item.name} for $${item.price.toLocaleString()} at ${item.loc}! That's $${savings.toFixed(2)} cheaper than home! #PricePulse`;
    get('share-text').innerText = text; 
    window.openModal('share-modal');
};

window.openUpload = () => window.openModal('upload-modal');
window.openAuth = () => window.openModal('auth-modal');
window.toggleDrawer = () => { 
    const drawer = get('profile-drawer');
    if (!state.isLoggedIn) { 
        window.openAuth(); 
        return; 
    }
    const isOpen = drawer.style.display === 'flex';
    drawer.style.display = isOpen ? 'none' : 'flex';
};

window.closeProfileDrawer = () => { get('profile-drawer').style.display = 'none'; };
window.openProfileDrawer = () => { window.closeModals(); get('profile-drawer').style.display = 'flex'; };
window.openLikes = () => showNotification("Likes coming soon! ❤️");

window.renderLeaderboard = () => {
    const lb = get('leaderboard'); if(!lb) return;
    const top = [...state.finds].sort((a,b) => b.likes - a.likes).slice(0, 3);
    lb.innerHTML = top.map((u, i) => `<div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05);"><span>${i+1}. @${u.user}</span><span style="color:var(--accent-lime); font-weight:900;">${u.likes} ❤️</span></div>`).join('');
};

function showNotification(msg) {
    const n = document.createElement('div'); 
    n.style = 'position:fixed; bottom: 80px; left: 50%; transform:translateX(-50%); padding: 12px 24px; border-radius: 50px; z-index: 9999; background: var(--text-white); color: var(--bg-dark); font-weight: 600; font-size: 14px;';
    n.innerText = msg; 
    document.body.appendChild(n); 
    setTimeout(() => n.remove(), 2000);
}

// --- PROFILE FUNCTIONS ---
window.openProfile = () => {
    const nameEl = get('profile-name');
    const levelEl = get('profile-level');
    const dealsEl = get('profile-deals');
    const followersEl = get('profile-followers');
    const followingEl = get('profile-following');
    const initialEl = get('profile-initial');
    
    const name = state.user.name || 'Pulse Hunter';
    const level = getLevelFromXP(state.user.xp || 0);
    const xp = state.user.xp || 0;
    
    if (nameEl) nameEl.innerText = name;
    if (levelEl) levelEl.innerText = `Level ${level} • ${xp} XP`;
    if (dealsEl) dealsEl.innerText = state.user.deals || 0;
    if (followersEl) followersEl.innerText = state.user.followers || 0;
    if (followingEl) followingEl.innerText = state.user.following || 0;
    if (initialEl) initialEl.innerText = name[0];
    
    window.openModal('profile-modal');
};

// --- NEW MODAL FUNCTIONS ---
window.openModal = (id) => {
    window.closeModals();
    const modal = get(id);
    if (modal) modal.style.display = 'flex';
    if (id === 'profile-modal') window.openProfile();
    if (id === 'activity-modal') renderActivity();
    lucide.createIcons();
};

window.closeModal = () => {
    document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
};

window.closeModals = window.closeModal;

// --- RENDER ACTIVITY ---
function renderActivity() {
    const list = get('activity-list');
    if (!list) return;
    
    list.innerHTML = '';
    state.notifications.forEach(n => {
        const item = document.createElement('div');
        item.style = 'display: flex; align-items: center; gap: 12px; padding: 12px; border-bottom: 1px solid var(--border-color);';
        item.innerHTML = `
            <div style="width: 36px; height: 36px; border-radius: 50%; background: ${n.color}22; color: ${n.color}; display: flex; align-items: center; justify-content: center;">
                <i data-lucide="${n.icon}" size="18"></i>
            </div>
            <div style="flex: 1;">
                <p style="font-size: 14px;">${n.text}</p>
                <p style="font-size: 12px; color: var(--text-gray);">${n.time}</p>
            </div>
        `;
        list.appendChild(item);
    });
    lucide.createIcons();
}

// --- USER PROFILE VIEW ---
window.showUserProfile = (userName) => {
    const user = state.users.find(u => u.name === userName) || { name: userName, bio: "Hunter", home: "Singapore", xp: 0, deals: 0, followers: 0, following: 0, badges: [] };
    const level = getLevelFromXP(user.xp || 0);
    const isFollowing = window.isFollowing(userName);
    const dealsByUser = state.finds.filter(d => d.user === userName);
    
    get('user-profile-content').innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <div style="width:80px; height:80px; border-radius:50%; background:var(--accent-lime); color:#000; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:2rem; margin:0 auto 15px;">${userName[0]}</div>
            <h2 style="margin-bottom:5px;">${userName}</h2>
            <p style="color:var(--text-gray); font-size:0.9rem; margin-bottom:15px;">${user.bio || 'Hunter'}</p>
            <p style="color:var(--accent-lime); font-weight:700; margin-bottom:20px;">Lv.${level} • ${user.xp || 0} XP</p>
            
            <div style="display:flex; justify-content:center; gap:20px; margin-bottom:20px;">
                <div style="text-align:center;">
                    <div style="font-weight:900; font-size:1.2rem;">${dealsByUser.length}</div>
                    <div style="font-size:0.7rem; color:var(--text-gray);">DEALS</div>
                </div>
                <div style="text-align:center;">
                    <div style="font-weight:900; font-size:1.2rem;">${user.followers || 0}</div>
                    <div style="font-size:0.7rem; color:var(--text-gray);">FOLLOWERS</div>
                </div>
                <div style="text-align:center;">
                    <div style="font-weight:900; font-size:1.2rem;">${user.following || 0}</div>
                    <div style="font-size:0.7rem; color:var(--text-gray);">FOLLOWING</div>
                </div>
            </div>
            
            ${user.badges?.length ? `<div style="display:flex; justify-content:center; gap:5px; margin-bottom:20px; flex-wrap:wrap;">${user.badges.map(b => `<span style="font-size:1.2rem;">${ACHIEVEMENTS.find(a => a.id === b)?.icon || '🏆'}</span>`).join('')}</div>` : ''}
            
            <div style="display:flex; flex-direction:column; gap:10px;">
                ${isFollowing 
                    ? `<button class="btn-fun" style="background:rgba(255,255,255,0.1); color:white;">✓ Following</button>`
                    : `<button class="btn-fun" style="background:var(--accent-lime); color:#000;" onclick="window.followUser('${userName}')">Follow</button>`
                }
                <button class="btn-fun" style="background:transparent; color:white; border:1px solid white;" onclick="closeModals()">Close</button>
            </div>
        </div>
    `;
    window.openModal('user-profile-modal');
};

// Render categories in sidebar
function renderCategories() {
    console.log("Rendering categories...");
    
    // Categories data
    const categories = [
        { id: "all", name: "All Deals" },
        { id: "food", name: "Food 🍔" },
        { id: "electronics", name: "Tech 💻" },
        { id: "fashion", name: "Fashion ⌚" },
        { id: "home", name: "Home 🏠" }
    ];
    
    const container = document.getElementById('categories-sidebar');
    if (!container) {
        console.log("categories-sidebar not found");
        return;
    }
    
    container.innerHTML = categories.map(cat => {
        const isActive = state.activeCategory === cat.id;
        return `<div onclick="filterByCategory('${cat.id}')" style="padding:12px 16px; border-radius:15px; background:${isActive ? 'var(--accent-lime)' : 'rgba(255,255,255,0.05)'}; color:${isActive ? '#000' : 'white'}; font-size:0.85rem; font-weight:700; cursor:pointer; text-align:center;">${cat.name}</div>`;
    }).join('');
    
    console.log("Categories rendered:", categories.length);
}

// --- 9. LIFECYCLE ---

document.addEventListener('DOMContentLoaded', () => { 
    console.log('PricePulse loading...');
    console.log('State finds:', state.finds?.length);
    console.log('Container:', !!get('feed-container'));
    
    updateIdentityUI();
    renderFeed(); 
    lucide.createIcons(); 
    
    // Request real GPS location
    if (navigator.geolocation) {
        const locationStatus = get('current-location-text');
        if (locationStatus) locationStatus.innerText = "📍 Getting location...";
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                state.userCoords = { 
                    lat: position.coords.latitude, 
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                
                if (get('current-location-text')) {
                    get('current-location-text').innerText = "📍 Getting location...";
                    
                    // Reverse geocode to get address
                    const address = await reverseGeocode(position.coords.latitude, position.coords.longitude);
                    state.userLocationName = address;
                    get('current-location-text').innerHTML = `<i data-lucide="map-pin" size="14"></i> ${address}`;
                    lucide.createIcons();
                }
                
                sortFeedByProximity();
                console.log("GPS Location:", state.userCoords, "Address:", state.userLocationName);
            },
            (error) => {
                console.error("Location error:", error.message);
                if (get('current-location-text')) {
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            get('current-location-text').innerText = "❌ Location denied";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            get('current-location-text').innerText = "❌ Location unavailable";
                            break;
                        case error.TIMEOUT:
                            get('current-location-text').innerText = "⏳ Location timeout";
                            break;
                        default:
                            get('current-location-text').innerText = "❌ Location error";
                    }
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
        
        // Also watch position for updates
        navigator.geolocation.watchPosition(
            (position) => {
                state.userCoords = { 
                    lat: position.coords.latitude, 
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                sortFeedByProximity();
            },
            null,
            { enableHighAccuracy: true }
        );
    } else {
        if (get('current-location-text')) {
            get('current-location-text').innerText = "❌ GPS not supported";
        }
    }
});
