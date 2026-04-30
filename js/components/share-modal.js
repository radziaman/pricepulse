export function ShareModal() {
    return `
    <div id="share-modal" class="modal-overlay">
        <div class="modal-sheet">
            <div class="modal-header">
                <div class="modal-title">SHARE DEAL</div>
                <div class="modal-close" data-action="close-modals">✕</div>
            </div>
            <div class="modal-content">
                <div id="share-text" style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px; font-size: 14px;"></div>
                <button class="btn-primary" data-action="copy-share-link" style="width: 100%;">COPY LINK</button>
            </div>
        </div>
    </div>
    `;
}
