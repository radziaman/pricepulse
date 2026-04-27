// ==========================================
// STATE - Application State Management
// ==========================================
import { DATA, USERS, BOUNTIES, NOTIFS, DEFAULT_USER } from '../config/constants.js';

class StateManager {
    constructor() {
        this.state = {
            finds: [...DATA],
            users: [...USERS],
            bounties: [...BOUNTIES],
            notifications: [...NOTIFS],
            acceptedHunts: [],
            likes: {},
            following: [],
            comments: {},
            xp: 0,
            streak: 0,
            lastPostDate: null,
            achievements: [],
            currentTab: 'deals',
            currentRadius: 10,
            userCoords: null,
            userLocationName: null,
            user: this.loadUser(),
            map: null,
            markers: [],
            hasUnreadNotifs: true,
            favorites: this.loadFavorites(),
            alerts: this.loadAlerts(),
            searchQuery: "",
            activeCategory: "all",
            searchMode: false,
            activeFilter: "hot",
            sortBy: "hot"
        };
    }

    loadUser() {
        const stored = localStorage.getItem('pulse_user');
        return stored ? JSON.parse(stored) : { ...DEFAULT_USER };
    }

    loadFavorites() {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    }

    loadAlerts() {
        const stored = localStorage.getItem('alerts');
        return stored ? JSON.parse(stored) : [];
    }

    saveUser() {
        localStorage.setItem('pulse_user', JSON.stringify(this.state.user));
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
    }

    saveAlerts() {
        localStorage.setItem('alerts', JSON.stringify(this.state.alerts));
    }

    get(key) {
        return this.state[key];
    }

    set(key, value) {
        this.state[key] = value;
    }

    update(key, value) {
        this.state[key] = value;
    }

    addDeal(deal) {
        this.state.finds.unshift(deal);
    }

    updateDeal(id, data) {
        const idx = this.state.finds.findIndex(d => d.id === id);
        if (idx >= 0) {
            this.state.finds[idx] = { ...this.state.finds[idx], ...data };
        }
    }

    removeDeal(id) {
        this.state.finds = this.state.finds.filter(d => d.id !== id);
    }

    addNotification(notif) {
        this.state.notifications.unshift(notif);
    }

    toggleLike(dealId, userName) {
        if (!this.state.likes[dealId]) {
            this.state.likes[dealId] = [];
        }
        const idx = this.state.likes[dealId].indexOf(userName);
        if (idx >= 0) {
            this.state.likes[dealId].splice(idx, 1);
            const deal = this.state.finds.find(d => d.id === dealId);
            if (deal) deal.likes = Math.max(0, deal.likes - 1);
            return false;
        } else {
            this.state.likes[dealId].push(userName);
            const deal = this.state.finds.find(d => d.id === dealId);
            if (deal) deal.likes = (deal.likes || 0) + 1;
            return true;
        }
    }

    hasLiked(dealId, userName) {
        return this.state.likes[dealId]?.includes(userName) || false;
    }

    toggleFavorite(id) {
        const idx = this.state.favorites.indexOf(id);
        if (idx >= 0) {
            this.state.favorites.splice(idx, 1);
        } else {
            this.state.favorites.push(id);
        }
        this.saveFavorites();
    }

    isFavorite(id) {
        return this.state.favorites.includes(id);
    }

    toggleFollow(userName) {
        if (userName === this.state.user.name) return false;
        const idx = this.state.following.indexOf(userName);
        if (idx >= 0) {
            this.state.following.splice(idx, 1);
            this.state.user.following = (this.state.user.following || 0) - 1;
        } else {
            this.state.following.push(userName);
            this.state.user.following = (this.state.user.following || 0) + 1;
        }
        this.saveUser();
    }

    isFollowing(userName) {
        return this.state.following.includes(userName);
    }

    addXP(amount) {
        this.state.user.xp = (this.state.user.xp || 0) + amount;
        const today = new Date().toDateString();
        if (this.state.lastPostDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (this.state.lastPostDate === yesterday.toDateString()) {
                this.state.streak++;
            } else {
                this.state.streak = 1;
            }
            this.state.lastPostDate = today;
        }
        this.saveUser();
    }

    login(user) {
        this.state.isLoggedIn = true;
        this.state.user = { ...this.state.user, ...user };
        localStorage.setItem('pulse_auth', 'true');
        this.saveUser();
    }

    logout() {
        this.state.isLoggedIn = false;
        this.state.user = { ...DEFAULT_USER };
        localStorage.removeItem('pulse_auth');
        localStorage.removeItem('pulse_user');
    }

    getFilteredDeals(category = "all", search = "") {
        let deals = [...this.state.finds];
        
        if (category !== "all") {
            deals = deals.filter(d => d.category === category);
        }
        
        if (search) {
            const q = search.toLowerCase();
            deals = deals.filter(d => 
                d.name.toLowerCase().includes(q) ||
                d.loc.toLowerCase().includes(q) ||
                d.category?.toLowerCase().includes(q) ||
                d.user?.toLowerCase().includes(q)
            );
        }
        
        return this.sortDeals(deals);
    }

    sortDeals(deals) {
        const sorted = [...deals];
        
        switch(this.state.sortBy) {
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
                sorted.sort((a, b) => {
                    const scoreA = (a.likes || 0) * 2 + (a.homePrice - a.price);
                    const scoreB = (b.likes || 0) * 2 + (b.homePrice - b.price);
                    return scoreB - scoreA;
                });
        }
        
        return sorted;
    }

    getLevelFromXP(xp) {
        if (xp >= 5000) return 5;
        if (xp >= 2500) return 4;
        if (xp >= 1000) return 3;
        if (xp >= 500) return 2;
        return 1;
    }
}

export const appState = new StateManager();
export default appState;