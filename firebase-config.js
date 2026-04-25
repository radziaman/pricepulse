// ==========================================
// FIREBASE CONFIGURATION 💎🔥
// ==========================================
// 
// To use with your Firebase project:
// 1. Create a project at https://console.firebase.google.com
// 2. Enable Authentication (Google, Apple, Email/Password)
// 3. Enable Firestore Database
// 4. Copy your web app config and replace below
//
// For now, this works in demo mode with local fallback.
// Replace with your actual Firebase config for production.

const firebaseConfig = {
    apiKey: "AIzaSyBSAfeL0EIwFFvHaTVsJBCBFqwPkHWnTLs",
    authDomain: "pricepulse-global.firebaseapp.com",
    projectId: "pricepulse-global",
    storageBucket: "pricepulse-global.firebasestorage.app",
    messagingSenderId: "947199643162",
    appId: "1:947199643162:web:c9908bc5dd5b3a0e224ba3",
    measurementId: "G-HDNV2SL7KF"
};

// Firebase services (initialized after DOM)
let firebaseAuth = null;
let firebaseDb = null;
let authInitialized = false;
let db = null;

// Initialize Firebase
function initializeFirebase() {
    try {
        // Check if Firebase SDK is loaded
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK not loaded - using local fallback');
            return false;
        }
        
        // Initialize Firebase app
        const app = firebase.initializeApp(firebaseConfig);
        
        // Initialize services
        firebaseAuth = firebase.auth();
        db = firebase.firestore();
        
        // Enable persistence
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        
        authInitialized = true;
        console.log('✅ Firebase initialized with pricepulse-global');
        
        // Set up auth state listener
        firebaseAuth.onAuthStateChanged(handleAuthStateChange);
        
        return true;
    } catch (error) {
        console.error('Firebase init failed:', error);
        return false;
    }
}

// Handle auth state changes
function handleAuthStateChange(user) {
    if (user) {
        // User is signed in
        state.isLoggedIn = true;
        state.user = {
            uid: user.uid,
            name: user.displayName || user.email?.split('@')[0] || 'User',
            email: user.email,
            photo: user.photoURL,
            emailVerified: user.emailVerified,
            method: user.providerData[0]?.providerId || 'firebase',
            bio: "Price Hunter",
            home: "Singapore"
        };
        localStorage.setItem('pulse_auth', 'true');
        localStorage.setItem('pulse_user', JSON.stringify(state.user));
        updateIdentityUI();
        renderFeed();
    } else {
        // User is signed out
        // Don't clear UI immediately to avoid flash
    }
}

// Login with Google
async function loginWithGoogleFirebase() {
    if (!firebaseAuth) {
        showNotification("Firebase not ready - try again");
        return;
    }
    
    const provider = new firebase.auth.GoogleAuthProvider();
    
    try {
        showNotification("🔄 Connecting to Google...");
        const result = await firebaseAuth.signInWithPopup(provider);
        showNotification("✅ Logged in with Google!");
    } catch (error) {
        console.error('Google login error:', error);
        showNotification("Error: " + error.message);
    }
}

// Login with Apple
async function loginWithAppleFirebase() {
    if (!firebaseAuth) {
        showNotification("Firebase not ready - try again");
        return;
    }
    
    const provider = new firebase.auth.OAuthProvider('apple.com');
    
    try {
        showNotification("🔄 Connecting to Apple...");
        const result = await firebaseAuth.signInWithPopup(provider);
        showNotification("✅ Logged in with Apple!");
    } catch (error) {
        console.error('Apple login error:', error);
        showNotification("Error: " + error.message);
    }
}

// Register/Login with Email
async function loginWithEmailFirebase() {
    if (!firebaseAuth) {
        showNotification("Firebase not ready - try again");
        return;
    }
    
    const email = get('auth-email')?.value;
    const password = get('auth-password')?.value;
    
    if (!email || !password) {
        showNotification("Please enter email and password");
        return;
    }
    
    if (password.length < 6) {
        showNotification("Password must be at least 6 characters");
        return;
    }
    
    try {
        showNotification("🔄 Creating account...");
        
        // Try to sign in first
        const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
        showNotification("✅ Logged in!");
    } catch (signInError) {
        if (signInError.code === 'auth/user-not-found') {
            // User doesn't exist, create new account
            try {
                const result = await firebaseAuth.createUserWithEmailAndPassword(email, password);
                
                // Send verification email
                await result.user.sendEmailVerification();
                showNotification("📧 Verification email sent!");
                
                // Show verification prompt
                get('auth-modal').style.display = 'none';
                get('verification-prompt-modal').style.display = 'flex';
            } catch (createError) {
                showNotification("Error: " + createError.message);
            }
        } else if (signInError.code === 'auth/wrong-password') {
            showNotification("Incorrect password");
        } else {
            showNotification("Error: " + signInError.message);
        }
    }
}

// Send verification email
async function sendVerificationEmailFirebase() {
    if (!firebaseAuth?.currentUser) return;
    
    try {
        await firebaseAuth.currentUser.sendEmailVerification();
        showNotification("📧 Verification email sent!");
    } catch (error) {
        showNotification("Error: " + error.message);
    }
}

// Verify email (check if verified)
async function checkEmailVerificationFirebase() {
    if (!firebaseAuth?.currentUser) return;
    
    await firebaseAuth.currentUser.reload();
    const user = firebaseAuth.currentUser;
    
    if (user.emailVerified) {
        state.user.emailVerified = true;
        localStorage.setItem('pulse_user', JSON.stringify(state.user));
        closeModals();
        showNotification("✅ Email verified!");
    } else {
        showNotification("Please verify your email first - check inbox");
    }
}

// Logout
async function logoutFirebase() {
    if (!firebaseAuth) return;
    
    try {
        await firebaseAuth.signOut();
        state.isLoggedIn = false;
        state.user = { name: "Guest", bio: "Browsing...", home: "" };
        localStorage.removeItem('pulse_auth');
        localStorage.removeItem('pulse_user');
        updateIdentityUI();
        renderFeed();
        showNotification("👋 Logged out");
    } catch (error) {
        showNotification("Error: " + error.message);
    }
}

// Save user profile to Firestore
async function saveProfileToFirestore() {
    if (!firebaseDb || !firebaseAuth?.currentUser) return;
    
    const userData = {
        name: get('profile-name').value,
        bio: get('profile-bio').value,
        home: get('profile-home').value,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        await firebaseDb.collection('users').doc(firebaseAuth.currentUser.uid).set(userData, { merge: true });
        state.user = { ...state.user, ...userData };
        localStorage.setItem('pulse_user', JSON.stringify(state.user));
        updateIdentityUI();
        showNotification("✅ Profile saved!");
    } catch (error) {
        console.error('Profile save error:', error);
    }
}

// Add functions to window for HTML access
window.loginWithGoogleFirebase = loginWithGoogleFirebase;
window.loginWithAppleFirebase = loginWithAppleFirebase;
window.loginWithEmailFirebase = loginWithEmailFirebase;
window.sendVerificationEmailFirebase = sendVerificationEmailFirebase;
window.checkEmailVerificationFirebase = checkEmailVerificationFirebase;
window.logoutFirebase = logoutFirebase;
window.saveProfileToFirestore = saveProfileToFirestore;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeFirebase();
});