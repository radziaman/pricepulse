// ==========================================
// DEALS SERVICE - Deal Operations
// ==========================================
import { appState } from '../state/store.js';

const DealsService = {
    async getAll() {
        return appState.get('finds');
    },

    async getById(id) {
        return appState.get('finds').find(d => d.id === id);
    },

    async getFiltered(category, search) {
        return appState.getFilteredDeals(category, search);
    },

    async create(dealData) {
        const deal = {
            id: Date.now(),
            user: appState.state.user.name,
            ...dealData,
            likes: 0,
            shares: 0,
            homePrice: dealData.price * 1.1,
            lat: appState.state.userCoords?.lat || 1.3,
            lng: appState.state.userCoords?.lng || 103.8
        };

        deal.img = deal.img || "https://images.unsplash.com/photo-1512428559083-a400562e445f?auto=format&fit=crop&q=80&w=1000";

        appState.addDeal(deal);
        appState.addXP(10);
        
        return deal;
    },

    async update(id, data) {
        appState.updateDeal(id, data);
    },

    async delete(id) {
        appState.removeDeal(id);
    },

    async like(id) {
        const userName = appState.state.user.name;
        const isLiked = appState.toggleLike(id, userName);
        appState.addXP(isLiked ? 5 : 0);
        return isLiked;
    },

    async unlike(id) {
        const userName = appState.state.user.name;
        return appState.toggleLike(id, userName);
    },

    async hasLiked(id) {
        const userName = appState.state.user.name;
        return appState.hasLiked(id, userName);
    },

    async favorite(id) {
        appState.toggleFavorite(id);
        return appState.isFavorite(id);
    },

    async isFavorited(id) {
        return appState.isFavorite(id);
    },

    async share(id) {
        const deal = await this.getById(id);
        if (!deal) return null;
        
        const savings = deal.homePrice - deal.price;
        const savingsPct = ((savings / deal.homePrice) * 100).toFixed(0);
        
        return {
            text: `Found ${deal.name} for $${deal.price} at ${deal.loc}! Save $${savings.toFixed(0)} (${savingsPct}%)! #PricePulse`,
            url: `https://pricepulse.app/deal/${id}`
        };
    },

    getSavings(deal) {
        if (!deal) return { amount: 0, pct: 0 };
        const amount = deal.homePrice - deal.price;
        const pct = ((amount / deal.homePrice) * 100).toFixed(0);
        return { amount, pct };
    },

    getBargainScore(deal) {
        const { pct } = this.getSavings(deal);
        if (pct >= 30) return 10;
        if (pct >= 25) return 9;
        if (pct >= 20) return 8;
        if (pct >= 15) return 7;
        if (pct >= 10) return 6;
        if (pct >= 5) return 5;
        return Math.max(1, Math.floor(pct / 2));
    }
};

export default DealsService;