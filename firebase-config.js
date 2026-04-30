// ==========================================
// FIREBASE CONFIGURATION - Proper ES Module
// ==========================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    OAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { 
    getFirestore, 
    setDoc, 
    doc, 
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyBSAfeL0EIwFFvHaTVsJBCBFqwPkHWnTLs",
    authDomain: "pricepulse-global.firebaseapp.com",
    projectId: "pricepulse-global",
    storageBucket: "pricepulse-global.firebasestorage.app",
    messagingSenderId: "947199643162",
    appId: "1:947199643162:web:c9908bc5dd5b3a0e224ba3",
    measurementId: "G-HDNV2SL7KF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth state handler
let authStateCallback = null;

export function onAuthState(handler) {
    authStateCallback = handler;
    onAuthStateChanged(auth, (user) => {
        if (handler) handler(user);
    });
}

// Google Login
export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return { success: true, user: result.user };
    } catch (error) {
        console.error('Google login error:', error);
        return { success: false, error: error.message };
    }
}

// Apple Login
export async function loginWithApple() {
    const provider = new OAuthProvider('apple.com');
    try {
        const result = await signInWithPopup(auth, provider);
        return { success: true, user: result.user };
    } catch (error) {
        console.error('Apple login error:', error);
        return { success: false, error: error.message };
    }
}

// Email/Password Login or Register
export async function loginWithEmail(email, password) {
    try {
        // Try sign in first
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: result.user };
        } catch (signInError) {
            if (signInError.code === 'auth/user-not-found') {
                // Create new account
                const result = await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(result.user);
                return { success: true, user: result.user, needsVerification: true };
            }
            throw signInError;
        }
    } catch (error) {
        console.error('Email login error:', error);
        return { success: false, error: error.message };
    }
}

// Logout
export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
}

// Save user profile
export async function saveUserProfile(userId, userData) {
    try {
        await setDoc(doc(db, 'users', userId), {
            ...userData,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return { success: true };
    } catch (error) {
        console.error('Save profile error:', error);
        return { success: false, error: error.message };
    }
}

console.log('✅ Firebase module loaded');
