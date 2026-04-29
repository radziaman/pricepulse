window.Modals = window.Modals || {};

window.Modals.AuthModal = function() {
    return `
    <div id="auth-modal" class="modal-overlay">
        <div class="modal-sheet">
            <div class="modal-header">
                <div class="modal-title">SIGN IN</div>
                <div class="modal-close" data-action="close-modals">✕</div>
            </div>
            <div class="modal-content" style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
                <div style="font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 2px; margin-bottom: 24px;">JOIN THE HUNT</div>
                <div class="input-group">
                    <input type="email" class="input-field" id="auth-email" placeholder="Email">
                </div>
                <div class="input-group">
                    <input type="password" class="input-field" id="auth-password" placeholder="Password" autocomplete="current-password">
                </div>
                <button class="btn-primary" data-action="login-email" style="width: 100%; margin-bottom: 16px; padding: 16px; font-size: 16px;">SIGN IN / REGISTER</button>
                <button class="btn-google" data-action="login-google" style="width: 100%; margin-bottom: 12px; padding: 16px; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 12px; background: #fff; color: #000; border: none; border-radius: 24px; font-weight: 700; cursor: pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.62l-3.56-2.77c-.98.66-2.23 1.05-3.72 1.05-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.97 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.13c-.22-.66-.35-1.37-.35-2.13s.13-1.47.35-2.13V7.03H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 5.03l2.66-2.06z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.97 3.47 2.18 7.03l3.66 2.84c.87-2.6 3.3-4.49 6.16-4.49z" fill="#EA4335"/></svg>
                    Continue with Google
                </button>
                <button class="btn-apple" data-action="login-apple" style="width: 100%; padding: 16px; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 12px; background: #000; color: #fff; border: none; border-radius: 24px; font-weight: 700; cursor: pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.01-1.09-.8-2.07-.82-3.08 0-1.23 1.24-2.9 1.02-3.08-.01-1.22 1.24-2.9.99-3.08 0-.16 1.56.99 2.96 3.08 3.08 1.12.12 2.3-.99 3.08-3.08.18-1.01 1.56-.99 3.08 0 .18 1.56.99 2.96 3.08 3.08 1.12.12 2.3-.99 3.08-3.08zM12 13.97c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>
                    Continue with Apple
                </button>
            </div>
        </div>
    </div>
    `;
};