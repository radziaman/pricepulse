// ==========================================
// PRICEPULSE - GOLD MASTER ENGINE 💎🛰️
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

const NOTIFS = [
    { id: 1, type: 'like', text: 'FoodieKing liked your "Umami Burger" find!', time: '2m ago', icon: 'heart', color: 'var(--accent-pink)' },
    { id: 2, type: 'bounty', text: 'New Bounty: "PS5 Slim" requested near you.', time: '15m ago', icon: 'target', color: 'var(--accent-blue)', targetTab: 'bounties' },
    { id: 3, type: 'drop', text: 'Price Drop! "Elite Watch" is now $50 cheaper.', time: '1h ago', icon: 'trending-down', color: 'var(--accent-lime)' }
];

// Initialize state
let state = { 
    finds: [...DATA], 
    bounties: [...BOUNTIES],
    notifications: [...NOTIFS],
    acceptedHunts: [],
    currentTab: 'deals',
    currentRadius: 10,
    userCoords: null,
    isLoggedIn: localStorage.getItem('pulse_auth') === 'true',
    user: JSON.parse(localStorage.getItem('pulse_user')) || { name: "Guest Hunter", bio: "Hunting deals...", home: "Singapore" },
    map: null,
    markers: [],
    hasUnreadNotifs: true,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    alerts: JSON.parse(localStorage.getItem('alerts') || '[]'),
    searchQuery: "",
    activeCategory: "all",
    searchMode: false
};

const get = (id) => document.getElementById(id);

// --- 1. GEOLOCATION & DISTANCE ---

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
            d.category?.toLowerCase().includes(state.searchQuery)
        );
    }
    
    return deals;
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
    get('verification-modal').style.display = 'flex';
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
    showNotification("🧠 AI is analyzing...");
    
    try {
        const analysis = await window.analyzeDealWithAI(item.name, item.price, item.loc);
        get('ai-analysis-result').innerText = analysis || "Analysis complete!";
        get('ai-analysis-modal').style.display = 'flex';
    } catch(e) {
        showNotification("AI analysis unavailable");
    }
};

window.getAIRecs = async () => {
    showNotification("🧠 Getting recommendations...");
    try {
        const recs = await window.getAIRecommendations(state.user);
        get('ai-recs-result').innerText = recs || "Check back soon!";
        get('ai-recs-modal').style.display = 'flex';
    } catch(e) {
        showNotification("AI recommendations unavailable");
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
    get('map-view').style.display = isMap ? 'block' : 'none';
    get('feed-container').style.display = !isMap && state.currentTab === 'deals' ? 'block' : 'none';
    get('bounty-container').style.display = !isMap && state.currentTab === 'bounties' ? 'block' : 'none';
    const header = document.querySelector('header');
    if (isMap) { header.style.opacity = '0'; setTimeout(() => header.style.display = 'none', 300); }
    else { header.style.display = 'block'; setTimeout(() => header.style.opacity = '1', 10); }
    document.querySelectorAll('.nav-pill').forEach(p => { const oc = p.getAttribute('onclick'); if (oc && oc.includes(`'${v}'`)) p.classList.add('active'); else p.classList.remove('active'); });
    if (isMap) { window.initMap(); setTimeout(() => state.map.invalidateSize(), 100); }
};

window.switchTab = (tab) => {
    if (!state.isLoggedIn && tab === 'bounties') { window.openAuth(); return; }
    state.currentTab = tab;
    get('feed-container').style.display = tab === 'deals' ? 'block' : 'none';
    get('bounty-container').style.display = tab === 'bounties' ? 'block' : 'none';
    const dBtn = get('tab-deals'); const bBtn = get('tab-bounties');
    if (tab === 'deals') { dBtn.style.background = 'var(--accent-lime)'; dBtn.style.color = '#000'; bBtn.style.background = 'transparent'; bBtn.style.color = 'white'; renderFeed(); }
    else { bBtn.style.background = 'var(--accent-lime)'; bBtn.style.color = '#000'; dBtn.style.background = 'transparent'; dBtn.style.color = 'white'; renderBounties(); }
};

// --- 6. RADAR & ANALYTICS ---

window.showComparison = (id) => {
    if (!state.isLoggedIn) { window.openAuth(); return; }
    const item = state.finds.find(i => i.id === id); if (!item) return;
    state.currentSelectedItem = item; get('analytics-title').innerText = item.name; get('analytics-modal').style.display = 'flex';
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
    container.innerHTML = '';
    
    // Get filtered deals
    let list = getFilteredDeals();
    
    // Show favorites only
    if (state.currentTab === 'favorites') {
        list = list.filter(d => state.favorites.includes(d.id));
    }
    
    list = state.isLoggedIn ? list : list.slice(0, 3);
    
    list.forEach(item => {
        const card = document.createElement('div'); 
        card.className = 'card';
        const uName = item.user === "You 🌟" ? state.user.name + " (You)" : item.user;
        const isFav = window.isFavorite(item.id);
        const shares = item.shares || 0;
        
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:40px; height:40px; border-radius:12px; background:var(--accent-lime); color:#000; display:flex; align-items:center; justify-content:center; font-weight:900;">${uName[0]}</div>
                    <span style="font-weight:700;">${uName}</span>
                </div>
                <div style="display:flex; gap:8px;">
                    <div onclick="window.toggleFavorite(${item.id})" style="cursor:pointer; font-size:1.5rem;">${isFav ? '❤️' : '🤍'}</div>
                    <div onclick="window.reportDeal(${item.id})" style="cursor:pointer; color:var(--text-gray);">🚩</div>
                </div>
            </div>
            <div class="price-pill" onclick="window.showComparison(${item.id})">$${item.price.toLocaleString()}</div>
            <h2 style="margin-bottom:10px; font-size:1.6rem;" onclick="window.showComparison(${item.id})">${item.name}</h2>
            <p style="font-size:0.8rem; color:var(--text-gray); margin-bottom:15px;">📍 ${item.loc}</p>
            <img src="${item.img}" class="card-image" onclick="window.showComparison(${item.id})">
            <div style="display:flex; gap:15px; margin:15px 0; font-size:0.8rem; color:var(--text-gray);">
                <span>❤️ ${item.likes}</span>
                <span>🔄 ${shares}</span>
                <span onclick="window.createAlert('${item.name}')" style="cursor:pointer; color:var(--accent-lime);">🔔 Alert</span>
            </div>
            <div class="social-bar">
                <div class="action-chip" style="background:var(--accent-lime); color:#000;" onclick="window.showComparison(${item.id})">RADAR SCAN <i data-lucide="crosshair" size="18"></i></div>
                <div class="action-chip" onclick="window.sharePulse()"><i data-lucide="share-2" size="18"></i></div>
            </div>
        `;
        container.appendChild(card);
    });
    
    if (!state.isLoggedIn && state.finds.length > 3) {
        const cta = document.createElement('div'); cta.className = 'card'; cta.style = 'text-align:center; background:#1a1a24; border: 2px dashed var(--accent-lime); padding: 40px 20px;';
        cta.innerHTML = `<i data-lucide="lock" size="32" style="color:var(--accent-lime); margin-bottom:15px;"></i><h3 style="margin-bottom:10px;">Unlock ${state.finds.length-3} more deals!</h3><button class="btn-fun" onclick="window.openAuth()">Sign Up for Free</button>`;
        container.appendChild(cta);
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

window.submitForm = () => {
    if(!state.isLoggedIn) { window.openAuth(); return; }
    const name = get('inp-name').value; const price = get('inp-price').value; const loc = get('inp-loc').value;
    if(!name || !price || !loc) return;
    const form = get('upload-form'); const orig = form.innerHTML;
    form.innerHTML = `<div style="padding:40px 0; text-align:center;"><i data-lucide="scan" class="pulse-anim" size="48" style="color:var(--accent-lime); margin-bottom:20px;"></i><p style="font-weight:800;">ANALYZING PULSE...</p><div style="width:100%; height:4px; background:rgba(255,255,255,0.1); border-radius:10px; margin-top:20px; overflow:hidden;"><div id="scan-bar" style="width:0%; height:100%; background:var(--accent-lime); transition: width 1.5s linear;"></div></div></div>`;
    lucide.createIcons(); setTimeout(() => get('scan-bar').style.width = '100%', 50);
    setTimeout(() => {
        state.finds.unshift({ id: Date.now(), user: "You 🌟", name, price: parseFloat(price), loc, img: "https://images.unsplash.com/photo-1512428559083-a400562e445f?auto=format&fit=crop&q=80&w=1000", homePrice: parseFloat(price)*1.1, lat: state.userCoords ? state.userCoords.lat : 1.3, lng: state.userCoords ? state.userCoords.lng : 103.8 });
        form.innerHTML = orig; renderFeed(); window.closeModals(); window.updateMapMarkers();
    }, 1600);
};

window.sharePulse = () => {
    const item = state.currentSelectedItem; if(!item) return;
    const savings = item.homePrice - item.price;
    const text = `🚀 Pulse Alert! Found ${item.name} for $${item.price.toLocaleString()} at ${item.loc}! That's $${savings.toFixed(2)} cheaper than home! #PricePulse`;
    get('share-text').innerText = text; get('share-modal').style.display = 'flex';
};

window.openUpload = () => get('upload-modal').style.display = 'flex';
window.closeModals = () => { document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none'); };
window.openAuth = () => get('auth-modal').style.display = 'flex';
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
window.openProfileDrawer = () => { get('profile-drawer').style.display = 'flex'; };
window.openLikes = () => showNotification("Likes coming soon! ❤️");

window.renderLeaderboard = () => {
    const lb = get('leaderboard'); if(!lb) return;
    const top = [...state.finds].sort((a,b) => b.likes - a.likes).slice(0, 3);
    lb.innerHTML = top.map((u, i) => `<div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05);"><span>${i+1}. @${u.user}</span><span style="color:var(--accent-lime); font-weight:900;">${u.likes} ❤️</span></div>`).join('');
};

function showNotification(msg) {
    const n = document.createElement('div'); n.className = 'card'; n.style = 'position:fixed; bottom:120px; left:50%; transform:translateX(-50%); padding:1rem 2rem; border-radius:50px; z-index:9000; background:var(--accent-lime); color:#000; font-weight:900; box-shadow:0 10px 30px rgba(0,0,0,0.5);';
    n.innerText = msg; document.body.appendChild(n); setTimeout(() => n.remove(), 2500);
}

function renderCategories() {
    const container = get('categories-bar');
    const sidebarContainer = get('categories-sidebar');
    
    const html = CATEGORIES.map(cat => {
        const isActive = state.activeCategory === cat.id;
        return `<div onclick="filterByCategory('${cat.id}')" style="padding:12px 16px; border-radius:15px; background:${isActive ? 'var(--accent-lime)' : 'rgba(255,255,255,0.05)'}; color:${isActive ? '#000' : 'white'}; font-size:0.85rem; font-weight:700; cursor:pointer; text-align:center;">${cat.name}</div>`;
    }).join('');
    
    if (container) container.innerHTML = html;
    if (sidebarContainer) sidebarContainer.innerHTML = html;
}

// --- 9. LIFECYCLE ---

document.addEventListener('DOMContentLoaded', () => { 
    updateIdentityUI();
    renderCategories();
    renderFeed(); 
    renderLeaderboard();
    lucide.createIcons(); 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(p => {
            state.userCoords = { lat: p.coords.latitude, lng: p.coords.longitude };
            if(get('current-location-text')) get('current-location-text').innerText = "Nearby detected";
            sortFeedByProximity();
        });
    }
});
