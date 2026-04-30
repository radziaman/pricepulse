export function SearchModal() {
    return `
    <div id="search-modal" class="modal-overlay">
        <div class="modal-sheet">
            <div class="modal-header">
                <div class="modal-title">EXPLORE</div>
                <div class="modal-close" data-action="close-modals">✕</div>
            </div>
            <div class="modal-content">
                <div class="input-group">
                    <input type="text" class="input-field" id="search-input" placeholder="Search deals, locations..." oninput="window.searchDeals(this.value)">
                </div>
                <div id="search-results"></div>
            </div>
        </div>
    </div>
    `;
}
