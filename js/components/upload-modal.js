export function UploadModal() {
    return `
    <div id="upload-modal" class="modal-overlay">
        <div class="modal-sheet">
            <div class="modal-header">
                <div class="modal-title">SHARE A DEAL</div>
                <div class="modal-close" data-action="close-modals">✕</div>
            </div>
            <div class="modal-content">
                <!-- Login Required Notice -->
                <div id="upload-login-required" style="display: none; text-align: center; padding: 20px;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🔒</div>
                    <div style="font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 2px; margin-bottom: 12px;">LOGIN REQUIRED</div>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">Sign in to share deals with the community</p>
                    <button class="btn-primary" data-action="open-auth">SIGN IN TO SHARE</button>
                </div>
                
                <!-- Upload Form -->
                <div id="upload-form-container">
                    <!-- Image Upload -->
                    <div class="input-group">
                        <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">📷 Product Photo *</label>
                        <div style="border: 2px dashed var(--border-color); border-radius: 12px; padding: 30px; text-align: center; cursor: pointer;" data-action="trigger-image-upload">
                            <input type="file" id="inp-image" accept="image/*" style="display: none;" onchange="previewImage(this)">
                            <div id="image-preview">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 12px; display: block; color: var(--text-secondary);"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                <div style="color: var(--text-secondary);">Tap to upload photo</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Product Name -->
                    <div class="input-group">
                        <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">📦 Product Name *</label>
                        <input type="text" class="input-field" id="inp-name" placeholder="e.g., iPhone 15 Pro, Nike Air Max">
                    </div>
                    
                    <!-- Price -->
                    <div class="input-group">
                        <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">💰 Current Price *</label>
                        <input type="number" class="input-field" id="inp-price" placeholder="0.00">
                    </div>
                    
                    <!-- Regular Price -->
                    <div class="input-group">
                        <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">🏷️ Regular Price (Original)</label>
                        <input type="number" class="input-field" id="inp-regular-price" placeholder="0.00">
                    </div>
                    
                    <!-- Location Type -->
                    <div class="input-group">
                        <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">📍 Location Type *</label>
                        <select class="input-field" id="inp-loc-type" style="appearance: none; -webkit-appearance: none; background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238e8e8e8%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 12px center;">
                            <option value="">Select location type...</option>
                            <option value="mall">🛒 Shopping Mall</option>
                            <option value="store">🏪 Retail Store</option>
                            <option value="restaurant">🍔 Restaurant / Food Court</option>
                            <option value="cafe">☕ Cafe / Coffee Shop</option>
                            <option value="street">🚶 Street Vendor / Hawker</option>
                            <option value="online">🌐 Online Store</option>
                            <option value="outlet">🏷️ Outlet / Warehouse</option>
                            <option value="other">📍 Other</option>
                        </select>
                    </div>
                    
                    <!-- Exact Location -->
                    <div class="input-group">
                        <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">🏢 Shop / Mall Name *</label>
                        <input type="text" class="input-field" id="inp-shop-name" placeholder="e.g., Orchard Gateway, FairPrice, McDonald's">
                    </div>
                    
                    <!-- Floor/Unit -->
                    <div class="input-group">
                        <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">📍 Floor / Unit Number</label>
                        <input type="text" class="input-field" id="inp-unit" placeholder="e.g., B1-23, Level 2, Counter 5">
                    </div>
                    
                    <!-- Description -->
                    <div class="input-group">
                        <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">📝 Description (Optional)</label>
                        <textarea class="input-field" id="inp-desc" rows="3" placeholder="Tell us more about this deal..." style="resize: none;"></textarea>
                    </div>
                    
                    <!-- Category -->
                    <div class="input-group">
                        <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">🏷️ Category *</label>
                        <select class="input-field" id="inp-category" style="appearance: none; -webkit-appearance: none; background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238e8e8e8%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 12px center;">
                            <option value="">Select category...</option>
                            <option value="food">🍔 Food & Drinks</option>
                            <option value="electronics">💻 Electronics</option>
                            <option value="fashion">👗 Fashion</option>
                            <option value="beauty">💄 Beauty</option>
                            <option value="home">🏠 Home & Living</option>
                            <option value="sports">⚽ Sports</option>
                            <option value="toys">🎮 Toys & Games</option>
                            <option value="books">📚 Books</option>
                            <option value="other">📦 Other</option>
                        </select>
                    </div>
                    
                    <button class="btn-primary" data-action="submit-deal">SHARE DEAL</button>
                </div>
            </div>
        </div>
    </div>
    `;
}
