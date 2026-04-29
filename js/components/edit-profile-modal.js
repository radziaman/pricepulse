window.Modals = window.Modals || {};

window.Modals.EditProfileModal = function() {
    return `
    <div id="edit-profile-modal" class="modal-overlay">
        <div class="modal-sheet">
            <div class="modal-header">
                <div class="modal-title">EDIT PROFILE</div>
                <div class="modal-close" data-action="close-modals">✕</div>
            </div>
            <div class="modal-content">
                <div class="input-group">
                    <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Username</label>
                    <input type="text" class="input-field" id="profile-name" placeholder="Username">
                </div>
                <div class="input-group">
                    <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Bio</label>
                    <textarea class="input-field" id="profile-bio" rows="3" placeholder="Tell us about yourself..." style="resize: none;"></textarea>
                </div>
                <div class="input-group">
                    <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Location</label>
                    <input type="text" class="input-field" id="profile-home" placeholder="City, Country">
                </div>
                <button class="btn-primary" data-action="save-profile" style="width: 100%;">SAVE CHANGES</button>
            </div>
        </div>
    </div>
    `;
};