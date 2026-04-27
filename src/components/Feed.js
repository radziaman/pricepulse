// ==========================================
// FEED - Feed Component
// ==========================================
import { createDealCard } from './DealCard.js';
import appState from '../state/store.js';

let feedContainer = null;

export function initFeed(containerSelector) {
    feedContainer = document.querySelector(containerSelector);
    if (feedContainer) {
        renderFeed();
    }
}

export function renderFeed() {
    if (!feedContainer) return;
    
    feedContainer.innerHTML = '';
    
    const deals = appState.getFilteredDeals(
        appState.state.activeCategory,
        appState.state.searchQuery
    );
    
    if (deals.length === 0) {
        feedContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📸</div>
                <h3>No deals yet</h3>
                <p>Be the first to share a deal!</p>
            </div>
        `;
        return;
    }
    
    deals.forEach(deal => {
        const card = createDealCard(deal, {
            onLike: handleLike,
            onComment: handleComment,
            onShare: handleShare,
            onFavorite: handleFavorite,
            onUserClick: handleUserClick,
            onImageClick: handleImageClick
        });
        feedContainer.appendChild(card);
    });
    
    // Re-initialize icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

async function handleLike(id) {
    if (!appState.state.isLoggedIn) {
        window.openAuth?.();
        return;
    }
    
    const userName = appState.state.user.name;
    const wasLiked = appState.toggleLike(id, userName);
    appState.addXP(wasLiked ? 5 : 0);
    renderFeed();
    
    window.showNotification?.(wasLiked ? '❤️ Liked!' : '💔 Unliked');
}

function handleComment(id) {
    window.openComments?.(id);
}

function handleShare(id) {
    window.sharePulse?.();
}

async function handleFavorite(id) {
    appState.toggleFavorite(id);
    const isFav = appState.isFavorite(id);
    renderFeed();
    window.showNotification?.(isFav ? '🔖 Saved!' : '🔖 Removed');
}

function handleUserClick(user) {
    window.showUserProfile?.(user);
}

function handleImageClick(id) {
    window.showComparison?.(id);
}

export function refreshFeed() {
    renderFeed();
}

export function setCategory(category) {
    appState.state.activeCategory = category;
    renderFeed();
}

export function setSearch(query) {
    appState.state.searchQuery = query;
    appState.state.searchMode = query.length > 0;
    renderFeed();
}

export function setSort(sortBy) {
    appState.state.sortBy = sortBy;
    renderFeed();
}

export default {
    initFeed,
    renderFeed,
    refreshFeed,
    setCategory,
    setSearch,
    setSort
};