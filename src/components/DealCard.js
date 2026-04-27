// ==========================================
// DEAL CARD - Instagram-style Card Component
// ==========================================
import { formatPrice } from '../../utils/helpers.js';
import appState from '../../state/store.js';

export function createDealCard(deal, options = {}) {
    const { onLike, onComment, onShare, onFavorite, onUserClick, onImageClick } = options;
    
    const uName = deal.user === appState.state.user.name ? appState.state.user.name + " (You)" : deal.user;
    const hasLiked = appState.hasLiked(deal.id, appState.state.user.name);
    const isFavorited = appState.isFavorite(deal.id);
    const savings = deal.homePrice - deal.price;
    const savingsPct = ((savings / deal.homePrice) * 100).toFixed(0);
    const commentCount = (appState.state.comments[deal.id] || []).length;

    const card = document.createElement('div');
    card.className = 'insta-card';
    card.dataset.id = deal.id;

    card.innerHTML = `
        <div class="card-header">
            <div class="card-avatar" data-user="${deal.user}">${uName[0]}</div>
            <div class="card-user" data-user="${deal.user}">${uName}</div>
            <div class="card-location">${deal.loc}</div>
        </div>
        
        <div class="card-content" data-image="${deal.id}">
            <img src="${deal.img}" class="card-image" alt="${deal.name}" loading="lazy">
            <div class="card-price">${formatPrice(deal.price)}</div>
        </div>
        
        <div class="card-actions">
            <div class="action-btn ${hasLiked ? 'liked' : ''}" data-like="${deal.id}">
                <i data-lucide="heart" size="26" fill="${hasLiked ? 'var(--accent-pink)' : 'none'}"></i>
            </div>
            <div class="action-btn" data-comment="${deal.id}">
                <i data-lucide="message-circle" size="26"></i>
            </div>
            <div class="action-btn" data-share="${deal.id}">
                <i data-lucide="send" size="26"></i>
            </div>
            <div style="flex:1;"></div>
            <div class="action-btn" data-favorite="${deal.id}">
                <i data-lucide="bookmark" size="26" fill="${isFavorited ? 'var(--accent-lime)' : 'none'}"></i>
            </div>
        </div>
        
        <div class="card-info">
            <div class="likes-count">${deal.likes} likes</div>
            <div class="deal-caption">
                <span style="font-weight: 600;">${uName}</span> ${deal.name}
            </div>
            <div class="view-comments" data-comments="${deal.id}">
                View all ${commentCount} comments
            </div>
            <div class="time-posted">${savingsPct}% OFF</div>
        </div>
    `;

    // Attach event listeners
    if (onLike) {
        card.querySelector('[data-like]')?.addEventListener('click', () => onLike(deal.id));
    }
    if (onComment) {
        card.querySelector('[data-comment]')?.addEventListener('click', () => onComment(deal.id));
        card.querySelector('[data-comments]')?.addEventListener('click', () => onComment(deal.id));
    }
    if (onShare) {
        card.querySelector('[data-share]')?.addEventListener('click', () => onShare(deal.id));
    }
    if (onFavorite) {
        card.querySelector('[data-favorite]')?.addEventListener('click', () => onFavorite(deal.id));
    }
    if (onUserClick) {
        card.querySelector('.card-avatar')?.addEventListener('click', () => onUserClick(deal.user));
        card.querySelector('.card-user')?.addEventListener('click', () => onUserClick(deal.user));
    }
    if (onImageClick) {
        card.querySelector('.card-content')?.addEventListener('click', () => onImageClick(deal.id));
    }

    return card;
}

export function renderDealCard(deal) {
    const card = createDealCard(deal, {
        onLike: async (id) => {
            const isLiked = await import('../../services/deals.js').then(m => m.default.like(id));
            if (isLiked !== undefined) renderFeed();
        },
        onComment: (id) => window.openComments?.(id),
        onShare: (id) => window.sharePulse?.(),
        onFavorite: async (id) => {
            await import('../../services/deals.js').then(m => m.default.favorite(id));
            renderFeed();
        },
        onUserClick: (user) => window.showUserProfile?.(user),
        onImageClick: (id) => window.showComparison?.(id)
    });
    
    return card;
}

export default createDealCard;