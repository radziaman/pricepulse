// app.js - Main application

// Import components
import { 
    UploadModal, 
    ShareModal, 
    SearchModal, 
    ProfileModal, 
    ExploreModal, 
    EditProfileModal, 
    CommentsModal, 
    AuthModal, 
    ActivityModal 
} from './js/components/index.js';

// Import Firebase services
import { 
    auth, 
    db, 
    loginWithGoogle, 
    loginWithApple, 
    loginWithEmail, 
    logout, 
    saveUserProfile 
} from './firebase-config.js';

import firebaseService from './firebase-service.js';

// App state
const state = {
    finds: [],
    comments: {},
    likes: {},
    favorites: [],
    notifications: [],
    isLoggedIn: false,
    user: null,
    currentModal: null
};

// Initialize app
class PricePulseApp {
    constructor() {
        this.state = state;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('✅ PricePulse initializing...');
        
        // Initialize Firebase listener
        auth.onAuthStateChanged((user) => this.handleAuthState(user));
        
        // Load initial data
        this.loadInitialData();
        
        // Setup event delegation
        this.setupEventDelegation();
        
        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
        
        // Render feed
        this.renderFeed();
        
        console.log('✅ PricePulse ready');
    }

    handleAuthState(user) {
        if (user) {
            this.state.isLoggedIn = true;
            this.state.user = {
                id: user.uid,
                name: user.displayName || user.email?.split('@')[0] || 'User',
                email: user.email,
                photo: user.photoURL
            };
            localStorage.setItem('pulse_auth', 'true');
            localStorage.setItem('pulse_user', JSON.stringify(this.state.user));
        } else {
            this.state.isLoggedIn = false;
            this.state.user = null;
            localStorage.removeItem('pulse_auth');
            localStorage.removeItem('pulse_user');
        }
        this.updateUI();
    }

    loadInitialData() {
        // Load from localStorage
        try {
            state.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            state.likes = JSON.parse(localStorage.getItem('likes')) || {};
        } catch (e) {
            console.warn('Error loading localStorage:', e);
        }

        // Load fallback data
        state.finds = [
            { id: 1, user: "FoodieKing 🍔", name: "The Umami Burger", price: 18.5, loc: "Orchard Road", category: "food", img: "gourmet_burger_find_1777014996371.png", likes: 42, shares: 15 },
            { id: 2, user: "TechWiz 💻", name: "MacBook Pro M3", price: 3299, loc: "City Hall", category: "electronics", img: "premium_laptop_find_1777015033134.png", likes: 256, shares: 89 },
            { id: 3, user: "StyleIcon ⌚", name: "Elite Watch", price: 1250, loc: "Marina Bay", category: "fashion", img: "luxury_watch_find_1777015121802.png", likes: 112, shares: 34 }
        ];

        state.comments = {
            1: [{ user: "BurgerLover", text: "Found this at Somerset! Much cheaper!", time: "2h ago" }],
            2: [{ user: "TechWiz 💻", text: "Best price in SG right now!", time: "1h ago" }]
        };
    }

    setupEventDelegation() {
        document.addEventListener('click', (e) => {
            const actionEl = e.target.closest('[data-action]');
            if (!actionEl) return;
            
            const action = actionEl.dataset.action;
            const dealId = actionEl.dataset.dealId ? parseInt(actionEl.dataset.dealId) : null;
            
            e.preventDefault();
            this.handleAction(action, dealId);
        });
    }

    handleAction(action, dealId) {
        console.log('Action:', action, 'Deal:', dealId);
        
        switch(action) {
            case 'home':
                this.showNotification('Home');
                break;
            case 'explore':
                this.openModal('explore');
                break;
            case 'upload':
                if (!this.state.isLoggedIn) {
                    this.openModal('auth');
                } else {
                    this.openModal('upload');
                }
                break;
            case 'activity':
                this.openModal('activity');
                break;
            case 'profile':
                if (!this.state.isLoggedIn) {
                    this.openModal('auth');
                } else {
                    this.openModal('profile');
                }
                break;
            case 'search':
                this.openModal('search');
                break;
            case 'close-modals':
                this.closeModal();
                break;
            case 'show-comparison':
                this.showNotification('Comparison coming soon!');
                break;
            case 'toggle-like':
                this.toggleLike(dealId);
                break;
            case 'open-comments':
                this.openModal('comments', dealId);
                break;
            case 'share-deal':
                this.openModal('share', dealId);
                break;
            case 'login-google':
                this.handleGoogleLogin();
                break;
            case 'login-apple':
                this.handleAppleLogin();
                break;
            case 'login-email':
                this.handleEmailLogin();
                break;
            case 'logout':
                this.handleLogout();
                break;
            case 'edit-profile':
                this.openModal('edit-profile');
                break;
            case 'toggle-favorite':
                this.toggleFavorite(dealId);
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    // ========== MODAL MANAGEMENT ==========
    
    openModal(type, data = null) {
        this.closeModal();
        
        let modalHtml = '';
        
        switch(type) {
            case 'upload':
                modalHtml = UploadModal();
                break;
            case 'share':
                modalHtml = ShareModal();
                break;
            case 'search':
                modalHtml = SearchModal();
                break;
            case 'profile':
                modalHtml = ProfileModal();
                break;
            case 'explore':
                modalHtml = ExploreModal();
                break;
            case 'edit-profile':
                modalHtml = EditProfileModal();
                break;
            case 'comments':
                modalHtml = CommentsModal();
                break;
            case 'auth':
                modalHtml = AuthModal();
                break;
            case 'activity':
                modalHtml = ActivityModal();
                break;
        }
        
        if (modalHtml) {
            const container = document.getElementById('modal-container');
            if (container) {
                container.innerHTML = modalHtml;
                container.style.display = 'block';
                this.state.currentModal = type;
                
                // Re-initialize Lucide icons for modal
                if (window.lucide) {
                    setTimeout(() => window.lucide.createIcons(), 50);
                }
            }
        }
    }

    closeModal() {
        const container = document.getElementById('modal-container');
        if (container) {
            container.innerHTML = '';
            container.style.display = 'none';
            this.state.currentModal = null;
        }
    }

    // ========== AUTH HANDLERS ==========
    
    async handleGoogleLogin() {
        this.showNotification('Connecting to Google...');
        const result = await loginWithGoogle();
        if (result.success) {
            this.showNotification('✅ Logged in with Google!');
            this.closeModal();
        } else {
            this.showNotification('Error: ' + result.error);
        }
    }

    async handleAppleLogin() {
        this.showNotification('Connecting to Apple...');
        const result = await loginWithApple();
        if (result.success) {
            this.showNotification('✅ Logged in with Apple!');
            this.closeModal();
        } else {
            this.showNotification('Error: ' + result.error);
        }
    }

    async handleEmailLogin() {
        const email = document.getElementById('auth-email')?.value;
        const password = document.getElementById('auth-password')?.value;
        
        if (!email || !password) {
            this.showNotification('Please enter email and password');
            return;
        }
        
        this.showNotification('Signing in...');
        const result = await loginWithEmail(email, password);
        if (result.success) {
            this.showNotification(result.needsVerification ? '📧 Check email for verification!' : '✅ Logged in!');
            this.closeModal();
        } else {
            this.showNotification('Error: ' + result.error);
        }
    }

    async handleLogout() {
        const result = await logout();
        if (result.success) {
            this.showNotification('👋 Logged out');
            this.closeModal();
        }
    }

    // ========== DEAL INTERACTIONS ==========
    
    toggleLike(dealId) {
        if (!this.state.isLoggedIn) {
            this.openModal('auth');
            return;
        }
        
        const deal = this.state.finds.find(d => d.id === dealId);
        if (!deal) return;
        
        if (!this.state.likes[dealId]) {
            this.state.likes[dealId] = [];
        }
        
        const user = this.state.user?.name || 'You';
        const likeIndex = this.state.likes[dealId].indexOf(user);
        
        if (likeIndex > -1) {
            // Unlike
            this.state.likes[dealId].splice(likeIndex, 1);
            deal.likes = Math.max(0, deal.likes - 1);
        } else {
            // Like
            this.state.likes[dealId].push(user);
            deal.likes += 1;
        }
        
        localStorage.setItem('likes', JSON.stringify(this.state.likes));
        this.renderFeed();
    }

    toggleFavorite(dealId) {
        const index = this.state.favorites.indexOf(dealId);
        if (index > -1) {
            this.state.favorites.splice(index, 1);
        } else {
            this.state.favorites.push(dealId);
        }
        localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
        this.renderFeed();
    }

    // ========== RENDERING ==========
    
    renderFeed() {
        const container = document.getElementById('feed-container');
        if (!container) return;
        
        if (!this.state.finds.length) {
            container.innerHTML = '<div class="empty-state"><div class="empty-icon">📸</div><h3>No deals yet</h3><p>Be the first to share!</p></div>';
            return;
        }
        
        container.innerHTML = this.state.finds.map(item => this.renderCard(item)).join('');
        
        // Lazy load images
        this.lazyLoadImages();
        
        // Initialize Lucide icons
        if (window.lucide) {
            setTimeout(() => window.lucide.createIcons(), 50);
        }
    }

    renderCard(item) {
        const uName = item.user;
        const hasLiked = this.state.likes[item.id]?.includes(this.state.user?.name || 'You') || false;
        const isFav = this.state.favorites.includes(item.id);
        
        return '<div class="hybrid-card" data-deal-id="' + item.id + '">' +
            '<div class="card-header">' +
                '<div class="card-avatar">' + uName[0] + '</div>' +
                '<div class="card-user">' + uName + '</div>' +
                '<div class="card-location">' + item.loc + '</div>' +
            '</div>' +
            '<div class="card-content" data-action="show-comparison" data-deal-id="' + item.id + '">' +
                '<img src="' + item.img + '" class="card-image" alt="' + item.name + '">' +
                '<div class="card-price">$' + item.price.toLocaleString() + '</div>' +
            '</div>' +
            '<div class="card-actions">' +
                '<div class="action-btn ' + (hasLiked ? 'liked' : '') + '" data-action="toggle-like" data-deal-id="' + item.id + '">' +
                    '<i data-lucide="heart" size="26" fill="' + (hasLiked ? 'var(--accent-pink)' : 'none') + '"></i>' +
                    '<span class="action-count">' + (item.likes || 0) + '</span>' +
                '</div>' +
                '<div class="action-btn" data-action="open-comments" data-deal-id="' + item.id + '">' +
                    '<i data-lucide="message-circle" size="26"></i>' +
                    '<span class="action-count">' + ((this.state.comments[item.id] || []).length) + '</span>' +
                '</div>' +
                '<div class="action-btn" data-action="share-deal" data-deal-id="' + item.id + '">' +
                    '<i data-lucide="send" size="26"></i>' +
                '</div>' +
                '<div style="flex:1;"></div>' +
                '<div class="action-btn ' + (isFav ? 'saved' : '') + '" data-action="toggle-favorite" data-deal-id="' + item.id + '">' +
                    '<i data-lucide="bookmark" size="26" fill="' + (isFav ? 'var(--accent-lime)' : 'none') + '"></i>' +
                '</div>' +
            '</div>' +
            '<div class="card-info">' +
                '<div class="likes-count">' + (item.likes || 0) + ' likes</div>' +
                '<div class="deal-caption"><span style="font-weight: 600;">' + uName + '</span> ' + item.name + '</div>' +
            '</div>' +
        '</div>';
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            images.forEach(img => observer.observe(img));
        }
    }

    updateUI() {
        // Update profile button, etc.
        console.log('UI updated, logged in:', this.state.isLoggedIn);
    }

    showNotification(msg) {
        const n = document.createElement('div');
        n.style = 'position:fixed; bottom:80px; left:50%; transform:translateX(-50%); padding:12px 24px; border-radius:50px; z-index:9999; background:var(--text-white); color:var(--bg-dark); font-weight:600; font-size:14px; box-shadow:0 4px 12px rgba(0,0,0,0.3); transition: opacity 0.3s;';
        n.innerText = msg;
        document.body.appendChild(n);
        setTimeout(() => { 
            n.style.opacity = '0'; 
            setTimeout(() => n.remove(), 300); 
        }, 2000);
    }
}

// Initialize app
const app = new PricePulseApp();
window.app = app;
