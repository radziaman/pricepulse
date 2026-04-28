// ==========================================
// DASHBOARD - Social Media Style User Dashboard
// ==========================================
// Features inspired by: Instagram, Twitter, LinkedIn, TikTok
import firebaseService from '../../firebase-service.js';
import { formatPrice, formatNumber } from '../../utils/helpers.js';

let dashboardContainer = null;
let currentDashboardTab = 'deals';

export function initDashboard(containerSelector) {
    dashboardContainer = document.querySelector(containerSelector);
    if (dashboardContainer) {
        renderDashboard();
    }
}

export async function renderDashboard(userId = null) {
    if (!dashboardContainer) return;
    
    const targetUserId = userId || firebaseService.currentUser?.uid;
    if (!targetUserId) {
        dashboardContainer.innerHTML = '<div class="empty-state"><h3>Please log in</h3></div>';
        return;
    }
    
    // Show loading state
    dashboardContainer.innerHTML = `
        <div class="dashboard-loading">
            <div class="pulse-animation"></div>
            <p>Loading dashboard...</p>
        </div>
    `;
    
    try {
        // Fetch user data, stats, and analytics in parallel
        const [profile, stats, analytics, isOwnProfile] = await Promise.all([
            firebaseService.getUserProfile(targetUserId),
            firebaseService.getUserProfile(targetUserId), // contains stats
            firebaseService.getUserAnalytics(targetUserId),
            Promise.resolve(targetUserId === firebaseService.currentUser?.uid)
        ]);
        
        renderDashboardUI(profile, stats, analytics, isOwnProfile, targetUserId);
    } catch (error) {
        console.error('Dashboard error:', error);
        dashboardContainer.innerHTML = '<div class="empty-state"><h3>Error loading dashboard</h3></div>';
    }
}

function renderDashboardUI(profile, stats, analytics, isOwnProfile, userId) {
    if (!dashboardContainer) return;
    
    const level = getLevelFromXP(stats?.xp || 0);
    const isFollowing = false; // TODO: check if current user follows this user
    
    dashboardContainer.innerHTML = `
        <!-- Dashboard Header (Instagram/LinkedIn style) -->
        <div class="dashboard-header">
            <div class="dashboard-cover">
                <div class="dashboard-cover-gradient"></div>
            </div>
            
            <div class="dashboard-profile-section">
                <div class="dashboard-avatar-large">
                    ${profile?.photoURL 
                        ? `<img src="${profile.photoURL}" alt="${profile.displayName}">` 
                        : `<div class="avatar-placeholder-large">${(profile?.displayName || 'U')[0].toUpperCase()}</div>`
                    }
                    ${isOwnProfile ? `<button class="btn-edit-avatar" onclick="window.openEditProfile()">📷</button>` : ''}
                </div>
                
                <div class="dashboard-profile-info">
                    <div class="dashboard-name-row">
                        <h1 class="dashboard-name">${profile?.displayName || 'User'}</h1>
                        ${isOwnProfile 
                            ? `<button class="btn-secondary" onclick="window.openEditProfile()">Edit Profile</button>`
                            : `<button class="btn-primary" onclick="window.toggleFollow('${userId}')">
                                ${isFollowing ? 'Following' : 'Follow'}
                               </button>`
                        }
                    </div>
                    
                    <p class="dashboard-bio">${profile?.bio || 'Price hunter on PricePulse'}</p>
                    
                    <div class="dashboard-meta">
                        ${profile?.homeLocation ? `<span>📍 ${profile.homeLocation}</span>` : ''}
                        ${profile?.website ? `<span>🔗 <a href="${profile.website}" target="_blank">${profile.website}</a></span>` : ''}
                        <span>🏆 Level ${level}</span>
                        <span>⭐ ${stats?.xp || 0} XP</span>
                    </div>
                    
                    <!-- Stats Row (Instagram style) -->
                    <div class="dashboard-stats-row">
                        <div class="stat-item" onclick="window.showUserDeals('${userId}')">
                            <span class="stat-value">${formatNumber(stats?.dealsCount || 0)}</span>
                            <span class="stat-label">Deals</span>
                        </div>
                        <div class="stat-item" onclick="window.showFollowers('${userId}')">
                            <span class="stat-value">${formatNumber(stats?.followersCount || 0)}</span>
                            <span class="stat-label">Followers</span>
                        </div>
                        <div class="stat-item" onclick="window.showFollowing('${userId}')">
                            <span class="stat-value">${formatNumber(stats?.followingCount || 0)}</span>
                            <span class="stat-label">Following</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${formatPrice(stats?.totalSavings || 0)}</span>
                            <span class="stat-label">Total Saved</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Badges (LinkedIn style achievements) -->
            ${stats?.badges?.length ? `
                <div class="dashboard-badges">
                    <h3>🏆 Badges</h3>
                    <div class="badges-grid">
                        ${stats.badges.map(badge => `
                            <div class="badge-item" title="${badge}">
                                <span class="badge-icon">🏆</span>
                                <span class="badge-name">${badge}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
        
        <!-- Analytics Section (LinkedIn style) -->
        ${isOwnProfile && analytics ? `
            <div class="dashboard-analytics">
                <h2>📊 Your Analytics</h2>
                <div class="analytics-grid">
                    <div class="analytics-card">
                        <div class="analytics-icon">❤️</div>
                        <div class="analytics-value">${formatNumber(analytics.totalLikes || 0)}</div>
                        <div class="analytics-label">Total Likes Received</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-icon">💬</div>
                        <div class="analytics-value">${formatNumber(analytics.totalComments || 0)}</div>
                        <div class="analytics-label">Total Comments</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-icon">🔄</div>
                        <div class="analytics-value">${formatNumber(analytics.totalShares || 0)}</div>
                        <div class="analytics-label">Total Shares</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-icon">👀</div>
                        <div class="analytics-value">${formatNumber(analytics.totalViews || 0)}</div>
                        <div class="analytics-label">Total Views</div>
                    </div>
                    <div class="analytics-card highlight">
                        <div class="analytics-icon">💰</div>
                        <div class="analytics-value">${formatPrice(analytics.totalSavings || 0)}</div>
                        <div class="analytics-label">Community Savings</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-icon">📈</div>
                        <div class="analytics-value">${analytics.avgBuzzScore?.toFixed(1) || '0.0'}</div>
                        <div class="analytics-label">Avg Buzz Score</div>
                    </div>
                </div>
            </div>
        ` : ''}
        
        <!-- Dashboard Tabs (Instagram/Twitter style) -->
        <div class="dashboard-tabs">
            <button class="dashboard-tab ${currentDashboardTab === 'deals' ? 'active' : ''}" 
                    onclick="window.switchDashboardTab('deals', '${userId}')">
                <i data-lucide="grid-3x3"></i> Deals
            </button>
            <button class="dashboard-tab ${currentDashboardTab === 'liked' ? 'active' : ''}" 
                    onclick="window.switchDashboardTab('liked', '${userId}')">
                <i data-lucide="heart"></i> Liked
            </button>
            <button class="dashboard-tab ${currentDashboardTab === 'saved' ? 'active' : ''}" 
                    onclick="window.switchDashboardTab('saved', '${userId}')">
                <i data-lucide="bookmark"></i> Saved
            </button>
            ${isOwnProfile ? `
                <button class="dashboard-tab ${currentDashboardTab === 'activity' ? 'active' : ''}" 
                        onclick="window.switchDashboardTab('activity', '${userId}')">
                    <i data-lucide="activity"></i> Activity
                </button>
            ` : ''}
        </div>
        
        <!-- Tab Content -->
        <div class="dashboard-content" id="dashboard-content">
            ${renderTabContent(userId)}
        </div>
    `;
    
    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function renderTabContent() {
    switch(currentDashboardTab) {
        case 'deals':
            return '<div class="tab-loading">Loading deals...</div>';
        case 'liked':
            return '<div class="tab-loading">Loading liked deals...</div>';
        case 'saved':
            return '<div class="tab-loading">Loading saved deals...</div>';
        case 'activity':
            return '<div class="tab-loading">Loading activity...</div>';
        default:
            return '<div class="empty-state"><p>No content</p></div>';
    }
}

export async function switchDashboardTab(tab, userId) {
    currentDashboardTab = tab;
    const contentEl = document.getElementById('dashboard-content');
    if (!contentEl) return;
    
    contentEl.innerHTML = '<div class="tab-loading">Loading...</div>';
    
    try {
        const targetUserId = userId || firebaseService.currentUser?.uid;
        let items = [];
        switch(tab) {
            case 'deals':
                items = await firebaseService.getUserDeals(targetUserId);
                break;
            case 'liked':
                items = await firebaseService.getLikedDeals(targetUserId);
                break;
            case 'saved':
                items = await firebaseService.getSavedDeals(targetUserId);
                break;
            case 'activity':
                items = await firebaseService.getNotifications(targetUserId, 50);
                break;
        }
        
        renderTabItems(items, tab);
    } catch (error) {
        console.error('Tab switch error:', error);
        contentEl.innerHTML = '<div class="empty-state"><p>Error loading content</p></div>';
    }
}

function renderTabItems(items, tab) {
    const contentEl = document.getElementById('dashboard-content');
    if (!contentEl) return;
    
    if (items.length === 0) {
        contentEl.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <h3>No ${tab} yet</h3>
                <p>${tab === 'deals' ? 'Share your first deal!' : tab === 'liked' ? 'Like some deals!' : tab === 'saved' ? 'Save deals for later!' : 'No activity yet'}</p>
            </div>
        `;
        return;
    }
    
    switch(tab) {
        case 'deals':
        case 'liked':
        case 'saved':
            contentEl.innerHTML = `
                <div class="dashboard-deals-grid">
                    ${items.map(deal => `
                        <div class="dashboard-deal-card" onclick="window.showComparison('${deal.id}')">
                            <img src="${deal.img}" alt="${deal.name}" loading="lazy">
                            <div class="dashboard-deal-overlay">
                                <div class="dashboard-deal-stats">
                                    <span>❤️ ${deal.likesCount || 0}</span>
                                    <span>💬 ${deal.commentsCount || 0}</span>
                                </div>
                                <div class="dashboard-deal-price">${formatPrice(deal.price)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
        case 'activity':
            contentEl.innerHTML = `
                <div class="dashboard-activity-list">
                    ${items.map(notif => `
                        <div class="activity-item ${notif.read ? '' : 'unread'}">
                            <div class="activity-icon" style="background: ${notif.color || 'var(--accent-lime)'}22; color: ${notif.color || 'var(--accent-lime)'}">
                                <i data-lucide="${notif.icon || 'bell'}"></i>
                            </div>
                            <div class="activity-content">
                                <p>${notif.text}</p>
                                <span class="activity-time">${formatTime(notif.createdAt)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
    }
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Helper functions
function getLevelFromXP(xp) {
    if (xp >= 5000) return 5;
    if (xp >= 2500) return 4;
    if (xp >= 1000) return 3;
    if (xp >= 500) return 2;
    return 1;
}

function formatTime(timestamp) {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

// Export functions for global access
window.switchDashboardTab = switchDashboardTab;
window.showUserDeals = (userId) => {
    currentDashboardTab = 'deals';
    switchDashboardTab('deals', userId);
};
window.showFollowers = async (userId) => {
    const followers = await firebaseService.getFollowers(userId);
    // TODO: Render followers modal
    console.log('Followers:', followers);
};
window.showFollowing = async (userId) => {
    const following = await firebaseService.getFollowing(userId);
    // TODO: Render following modal
    console.log('Following:', following);
};
window.toggleFollow = async (userId) => {
    const currentUserId = firebaseService.currentUser?.uid;
    if (!currentUserId) return;
    await firebaseService.toggleFollow(userId, currentUserId);
    renderDashboard(userId);
};

export default {
    initDashboard,
    renderDashboard,
    switchDashboardTab
};
