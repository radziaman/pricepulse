window.Modals = window.Modals || {};

window.Modals.ActivityModal = function() {
    return `
    <div id="activity-modal" class="modal-overlay">
        <div class="modal-sheet">
            <div class="modal-header">
                <div class="modal-title">ACTIVITY</div>
                <div class="modal-close" data-action="close-modals">✕</div>
            </div>
            <div class="modal-content" id="activity-content">
                <!-- Activity items will be rendered here -->
            </div>
        </div>
    </div>
    `;
};