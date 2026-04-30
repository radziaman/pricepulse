// app.js - Working version with proper module handling

import { createApp } from './app-core.js';

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => createApp());
} else {
    createApp();
}
