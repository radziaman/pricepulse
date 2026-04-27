// ==========================================
// AUTH SERVICE - Authentication
// ==========================================
import { appState } from '../state/store.js';

const AuthService = {
    isLoggedIn() {
        return localStorage.getItem('pulse_auth') === 'true';
    },

    getCurrentUser() {
        return appState.state.user;
    },

    async loginWithGoogle() {
        appState.login({
            name: "Google User",
            method: 'google',
            photo: ''
        });
        return this.getCurrentUser();
    },

    async loginWithApple() {
        appState.login({
            name: "Apple User", 
            method: 'apple',
            photo: ''
        });
        return this.getCurrentUser();
    },

    async loginWithEmail(email, password) {
        if (!email || !password) {
            throw new Error("Email and password required");
        }
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        }
        
        appState.login({
            name: email.split('@')[0],
            email,
            method: 'email'
        });
        
        return this.getCurrentUser();
    },

    logout() {
        appState.logout();
    },

    updateProfile(data) {
        const user = appState.state.user;
        Object.assign(user, data);
        appState.saveUser();
    },

    getLevel() {
        return appState.getLevelFromXP(appState.state.user.xp || 0);
    },

    getXP() {
        return appState.state.user.xp || 0;
    }
};

export default AuthService;