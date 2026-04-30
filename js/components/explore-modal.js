export function ExploreModal() {
    return `
    <div id="explore-modal" class="modal-overlay">
        <div class="modal-sheet">
            <div class="modal-header">
                <div class="modal-title">EXPLORE MAP</div>
                <div class="modal-close" data-action="close-modals">✕</div>
            </div>
            <div class="modal-content">
                <div id="explore-map" style="height: 400px; background: var(--bg-secondary); border-radius: 12px;"></div>
            </div>
        </div>
    </div>
    `;
}
