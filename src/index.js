// ==========================================
// PRICEPULSE - Main Entry Point
// Social Deals Finder & Hunter App
// ==========================================

// Export all modules
export { default as appState } from './state/store.js';
export { default as DealsService } from './services/deals.js';
export { default as AuthService } from './services/auth.js';
export * from './utils/helpers.js';
export { createDealCard, renderDealCard } from './components/DealCard.js';
export { initFeed, renderFeed, refreshFeed, setCategory, setSearch, setSort } from './components/Feed.js';

// Global initialization
export function initializeApp() {
    console.log('⚡ PricePulse initializing...');
    
    // Initialize feed if container exists
    const feedContainer = document.getElementById('feed-container');
    if (feedContainer) {
        initFeed('#feed-container');
    }
    
    // Render initial state
    renderFeed();
    
    console.log('⚡ PricePulse ready!');
    return true;
}

// Auto-initialize on DOM ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

export default {
    initializeApp,
    appState: import('./state/store.js'),
    deals: import('./services/deals.js'),
    auth: import('./services/auth.js'),
    utils: import('./utils/helpers.js'),
    components: {
        DealCard: import('./components/DealCard.js'),
        Feed: import('./components/Feed.js')
    }
};