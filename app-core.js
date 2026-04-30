// app-core.js - Core application logic

// State
const state = {
    finds: [
        { id: 1, user: "FoodieKing 🍔", name: "The Umami Burger", price: 18.5, loc: "Orchard Road", category: "food", img: "gourmet_burger_find_1777014996371.png", likes: 42, shares: 15 },
        { id: 2, user: "TechWiz 💻", name: "MacBook Pro M3", price: 3299, loc: "City Hall", category: "electronics", img: "premium_laptop_find_1777015033134.png", likes: 256, shares: 89 },
        { id: 3, user: "StyleIcon ⌚", name: "Elite Watch", price: 1250, loc: "Marina Bay", category: "fashion", img: "luxury_watch_find_1777015121802.png", likes: 112, shares: 34 }
    ],
    likes: {},
    favorites: [],
    currentModal: null
};

export function createApp() {
    console.log('🚀 PricePulse initializing...');
    
    // Setup event delegation
    document.addEventListener('click', handleClick);
    
    // Render feed
    renderFeed();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        setTimeout(() => {
            lucide.createIcons();
            console.log('✅ Lucide icons rendered');
        }, 100);
    }
    
    console.log('✅ PricePulse ready!');
    
    // Expose for debugging
    window.app = { state, renderFeed, openModal, closeModal, showNotification };
}

function handleClick(e) {
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;
    
    const action = actionEl.dataset.action;
    const dealId = actionEl.dataset.dealId ? parseInt(actionEl.dataset.dealId) : null;
    
    console.log('🖱️ Action:', action, 'Deal:', dealId);
    e.preventDefault();
    
    switch(action) {
        case 'home':
            showNotification('Home');
            break;
        case 'explore':
            showNotification('Explore - Coming soon!');
            break;
        case 'upload':
            openModal('upload');
            break;
        case 'activity':
            showNotification('Activity - Coming soon!');
            break;
        case 'profile':
            openModal('profile');
            break;
        case 'search':
            showNotification('Search - Coming soon!');
            break;
        case 'close-modals':
            closeModal();
            break;
        case 'toggle-like':
            toggleLike(dealId);
            break;
        case 'open-comments':
            openModal('comments');
            break;
        case 'share-deal':
            openModal('share');
            break;
        case 'toggle-favorite':
            toggleFavorite(dealId);
            break;
        case 'login-google':
            showNotification('Google login - Configure Firebase!');
            break;
        case 'login-apple':
            showNotification('Apple login - Configure Firebase!');
            break;
        case 'logout':
            showNotification('Logout');
            closeModal();
            break;
        case 'edit-profile':
            openModal('edit-profile');
            break;
        default:
            console.log('Unknown action:', action);
    }
}

function openModal(type) {
    closeModal();
    
    const container = document.getElementById('modal-container');
    if (!container) {
        console.error('❌ Modal container not found!');
        return;
    }
    
    let html = '';
    
    switch(type) {
        case 'upload':
            html = '<div class="modal-overlay" id="active-modal"><div class="modal-sheet"><div class="modal-header"><div class="modal-title">SHARE A DEAL</div><div class="modal-close" data-action="close-modals">✕</div></div><div class="modal-content"><p style="text-align:center;padding:20px;">Upload form coming soon!</p></div></div></div>';
            break;
        case 'profile':
            html = '<div class="modal-overlay" id="active-modal"><div class="modal-sheet"><div class="modal-header"><div class="modal-title">PROFILE</div><div class="modal-close" data-action="close-modals">✕</div></div><div class="modal-content"><p style="text-align:center;padding:20px;">Profile coming soon!</p><button class="btn-primary" data-action="login-google" style="width:100%;margin:10px 0;">Google Login</button><button class="btn-secondary" data-action="close-modals" style="width:100%;">Close</button></div></div></div>';
            break;
        case 'share':
            html = '<div class="modal-overlay" id="active-modal"><div class="modal-sheet"><div class="modal-header"><div class="modal-title">SHARE DEAL</div><div class="modal-close" data-action="close-modals">✕</div></div><div class="modal-content"><p style="text-align:center;padding:20px;">Share link copied!</p></div></div></div>';
            break;
        case 'comments':
            html = '<div class="modal-overlay" id="active-modal"><div class="modal-sheet"><div class="modal-header"><div class="modal-title">COMMENTS</div><div class="modal-close" data-action="close-modals">✕</div></div><div class="modal-content"><p style="text-align:center;padding:20px;">Comments coming soon!</p></div></div></div>';
            break;
        case 'edit-profile':
            html = '<div class="modal-overlay" id="active-modal"><div class="modal-sheet"><div class="modal-header"><div class="modal-title">EDIT PROFILE</div><div class="modal-close" data-action="close-modals">✕</div></div><div class="modal-content"><p style="text-align:center;padding:20px;">Edit profile coming soon!</p></div></div></div>';
            break;
    }
    
    container.innerHTML = html;
    container.style.display = 'block';
    state.currentModal = type;
    
    console.log('✅ Opened modal:', type);
}

function closeModal() {
    const container = document.getElementById('modal-container');
    if (container) {
        container.innerHTML = '';
        container.style.display = 'none';
        state.currentModal = null;
        console.log('✅ Modal closed');
    }
}

function toggleLike(dealId) {
    console.log('❤️ Toggle like:', dealId);
    const deal = state.finds.find(d => d.id === dealId);
    if (!deal) return;
    
    if (!state.likes[dealId]) state.likes[dealId] = [];
    
    const user = 'You';
    const idx = state.likes[dealId].indexOf(user);
    
    if (idx > -1) {
        state.likes[dealId].splice(idx, 1);
        deal.likes = Math.max(0, deal.likes - 1);
        showNotification('💔 Unliked');
    } else {
        state.likes[dealId].push(user);
        deal.likes += 1;
        showNotification('❤️ Liked!');
    }
    
    renderFeed();
}

function toggleFavorite(dealId) {
    console.log('🔖 Toggle favorite:', dealId);
    const idx = state.favorites.indexOf(dealId);
    if (idx > -1) {
        state.favorites.splice(idx, 1);
        showNotification('Removed from favorites');
    } else {
        state.favorites.push(dealId);
        showNotification('🔖 Added to favorites!');
    }
    renderFeed();
}

function renderFeed() {
    const container = document.getElementById('feed-container');
    if (!container) {
        console.error('❌ Feed container not found!');
        return;
    }
    
    container.innerHTML = state.finds.map(item => {
        const hasLiked = state.likes[item.id] && state.likes[item.id].includes('You');
        const isFav = state.favorites.includes(item.id);
        
        return '<div class="hybrid-card" data-deal-id="' + item.id + '">' +
            '<div class="card-header">' +
                '<div class="card-avatar">' + item.user[0] + '</div>' +
                '<div class="card-user">' + item.user + '</div>' +
                '<div class="card-location">' + item.loc + '</div>' +
            '</div>' +
            '<div class="card-content">' +
                '<img src="' + item.img + '" class="card-image" alt="' + item.name + '" onerror="this.style.display=\'none\'">' +
                '<div class="card-price">$' + item.price.toLocaleString() + '</div>' +
            '</div>' +
            '<div class="card-actions">' +
                '<div class="action-btn ' + (hasLiked ? 'liked' : '') + '" data-action="toggle-like" data-deal-id="' + item.id + '">' +
                    '<svg width="26" height="26" viewBox="0 0 24 24" fill="' + (hasLiked ? 'var(--accent-pink)' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
                    '<span class="action-count">' + (item.likes || 0) + '</span>' +
                '</div>' +
                '<div class="action-btn" data-action="open-comments" data-deal-id="' + item.id + '">' +
                    '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
                    '<span class="action-count">0</span>' +
                '</div>' +
                '<div class="action-btn" data-action="share-deal" data-deal-id="' + item.id + '">' +
                    '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="3" x2="9.218" y2="10.783"/><polygon points="16 3 22 3 22 9"/><line x1="4" y1="21" x2="16.783" y2="9.217"/></svg>' +
                '</div>' +
                '<div style="flex:1;"></div>' +
                '<div class="action-btn ' + (isFav ? 'saved' : '') + '" data-action="toggle-favorite" data-deal-id="' + item.id + '">' +
                    '<svg width="26" height="26" viewBox="0 0 24 24" fill="' + (isFav ? 'var(--accent-lime)' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
                '</div>' +
            '</div>' +
            '<div class="card-info">' +
                '<div class="likes-count">' + (item.likes || 0) + ' likes</div>' +
                '<div class="deal-caption"><span style="font-weight:600;">' + item.user + '</span> ' + item.name + '</div>' +
            '</div>' +
        '</div>';
    }).join('');
    
    console.log('✅ Feed rendered:', state.finds.length, 'deals');
}

function showNotification(msg) {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    const n = document.createElement('div');
    n.className = 'notification-toast';
    n.style = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:50px;z-index:9999;background:var(--text-white);color:var(--bg-dark);font-weight:600;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:opacity 0.3s;';
    n.innerText = msg;
    document.body.appendChild(n);
    
    setTimeout(() => { 
        n.style.opacity = '0'; 
        setTimeout(() => n.remove(), 300); 
    }, 2000);
}
