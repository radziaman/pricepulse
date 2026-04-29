window.Modals = window.Modals || {};

window.Modals.CommentsModal = function() {
    return `
    <div id="comments-modal" class="modal-overlay">
        <div class="modal-sheet">
            <div class="modal-header">
                <div class="modal-title">COMMENTS</div>
                <div class="modal-close" data-action="close-modals">✕</div>
            </div>
            <div class="modal-content">
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 14px; margin-bottom: 12px;">
                        <span style="font-weight: 700;">BurgerLover</span> Found this at Somerset! Much cheaper!
                    </div>
                    <div style="font-size: 12px; color: var(--text-secondary);">2h ago</div>
                </div>
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 14px; margin-bottom: 12px;">
                        <span style="font-weight: 700;">CheapEats</span> Same price at Dhoby Ghaut 🍔
                    </div>
                    <div style="font-size: 12px; color: var(--text-secondary);">3h ago</div>
                </div>
                <div style="display: flex; gap: 12px; padding-top: 16px; border-top: 1px solid var(--border-color);">
                    <input type="text" class="input-field" placeholder="Add a comment..." style="flex:1; margin:0;">
                    <button class="btn-primary" style="width: auto; padding: 12px 20px;" data-action="post-comment">Post</button>
                </div>
            </div>
        </div>
    </div>
    `;
};