window.Modals = window.Modals || {};

window.Modals.ProfileModal = function() {
    return `
    <div id="profile-modal" class="modal-overlay">
        <div class="modal-sheet" style="max-width: 500px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header">
                <div class="modal-title">PROFILE</div>
                <div class="modal-close" data-action="close-modals">✕</div>
            </div>
            <div id="profile-content" style="padding: 20px;">
                <!-- Profile Header -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <div id="profile-avatar" class="card-avatar" style="width: 100px; height: 100px; font-size: 40px; margin: 0 auto 16px; border: 3px solid var(--accent-lime);">P</div>
                    <div id="profile-username" style="font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px;">PULSE HUNTER</div>
                    <div id="profile-level" style="color: var(--accent-energy); font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Level 1 Hunter • 0 XP</div>
                    <div id="profile-bio" style="color: var(--text-secondary); font-size: 14px; margin-bottom: 8px;">No bio yet</div>
                    <div id="profile-location" style="color: var(--text-secondary); font-size: 12px;">📍 Not set</div>
                </div>
                
                <!-- Stats Row -->
                <div class="profile-stats">
                    <div class="stat-item">
                        <div id="profile-deals-count" class="stat-value">0</div>
                        <div class="stat-label">Deals</div>
                    </div>
                    <div class="stat-item">
                        <div id="profile-followers-count" class="stat-value">0</div>
                        <div class="stat-label">Followers</div>
                    </div>
                    <div class="stat-item">
                        <div id="profile-following-count" class="stat-value">0</div>
                        <div class="stat-label">Following</div>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 12px; margin-top: 20px;">
                    <button id="btn-edit-profile" class="btn-primary" style="flex:1;" data-action="edit-profile">Edit Profile</button>
                    <button id="btn-logout" class="btn-secondary" style="flex:1;" data-action="logout">Logout</button>
                </div>
                
                <!-- Activity Tabs -->
                <div style="display: flex; border-bottom: 1px solid var(--border-color); margin-top: 24px;">
                    <div class="profile-tab active" data-tab="deals" data-action="switch-profile-tab">
                        <span style="font-size: 20px;">📦</span> My Deals
                    </div>
                    <div class="profile-tab" data-tab="liked" data-action="switch-profile-tab">
                        <span style="font-size: 20px;">❤️</span> Liked
                    </div>
                    <div class="profile-tab" data-tab="saved" data-action="switch-profile-tab">
                        <span style="font-size: 20px;">🔖</span> Saved
                    </div>
                </div>
                
                <!-- Activity Content -->
                <div id="profile-activity" style="padding: 16px 0;">
                    <div id="profile-empty" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                        <div style="font-size: 48px; margin-bottom: 16px;">📦</div>
                        <div>No deals yet</div>
                        <div style="font-size: 12px; margin-top: 8px;">Share your first deal to get started!</div>
                    </div>
                    <div id="profile-deals-list"></div>
                </div>
            </div>
        </div>
    </div>
    `;
};