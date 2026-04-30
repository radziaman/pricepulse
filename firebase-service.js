// ==========================================
// FIREBASE SERVICE - ES Module
// ==========================================
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    query, 
    where, 
    orderBy, 
    limit, 
    updateDoc,
    deleteDoc,
    arrayUnion, 
    arrayRemove, 
    increment,
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

import { auth, db } from './firebase-config.js';

class FirebaseService {
    constructor() {
        this.db = db;
        this.auth = auth;
        this.currentUser = null;
        this.listeners = [];
    }

    init() {
        // Auth state is handled in firebase-config.js
        console.log('✅ FirebaseService initialized');
    }

    destroy() {
        this.listeners.forEach(unsub => unsub());
        this.listeners = [];
    }

    // ========== USER PROFILE ==========
    
    async saveUserProfile(userId, userData) {
        try {
            await setDoc(doc(this.db, 'users', userId), {
                ...userData,
                updatedAt: serverTimestamp()
            }, { merge: true });
            return { success: true };
        } catch (error) {
            console.error('Error saving profile:', error);
            return { success: false, error: error.message };
        }
    }

    async getUserProfile(userId) {
        try {
            const docSnap = await getDoc(doc(this.db, 'users', userId));
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            return null;
        } catch (error) {
            console.error('Error getting profile:', error);
            return null;
        }
    }

    // ========== DEALS ==========
    
    async createDeal(dealData) {
        try {
            const docRef = doc(collection(this.db, 'deals'));
            await setDoc(docRef, {
                ...dealData,
                id: docRef.id,
                createdAt: serverTimestamp(),
                likesCount: 0,
                commentsCount: 0,
                sharesCount: 0,
                isActive: true
            });
            return { success: true, dealId: docRef.id };
        } catch (error) {
            console.error('Error creating deal:', error);
            return { success: false, error: error.message };
        }
    }

    async getDeal(dealId) {
        try {
            const docSnap = await getDoc(doc(this.db, 'deals', dealId));
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            return null;
        } catch (error) {
            console.error('Error getting deal:', error);
            return null;
        }
    }

    async getFeedDeals(limitCount = 50) {
        try {
            const q = query(
                collection(this.db, 'deals'),
                where('isActive', '==', true),
                orderBy('createdAt', 'desc'),
                limit(limitCount)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting feed:', error);
            return [];
        }
    }

    // ========== LIKES ==========
    
    async toggleLike(dealId, userId) {
        try {
            const likeRef = doc(this.db, 'likes', `${userId}_${dealId}`);
            const likeSnap = await getDoc(likeRef);
            
            if (likeSnap.exists()) {
                // Unlike
                await deleteDoc(likeRef);
                await updateDoc(doc(this.db, 'deals', dealId), {
                    likesCount: increment(-1)
                });
                return { success: true, liked: false };
            } else {
                // Like
                await setDoc(likeRef, {
                    dealId,
                    userId,
                    createdAt: serverTimestamp()
                });
                await updateDoc(doc(this.db, 'deals', dealId), {
                    likesCount: increment(1)
                });
                return { success: true, liked: true };
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            return { success: false, error: error.message };
        }
    }

    // ========== COMMENTS ==========
    
    async addComment(dealId, userId, text) {
        try {
            const docRef = doc(collection(this.db, 'comments'));
            await setDoc(docRef, {
                id: docRef.id,
                dealId,
                userId,
                text,
                createdAt: serverTimestamp()
            });
            
            // Update comment count
            await updateDoc(doc(this.db, 'deals', dealId), {
                commentsCount: increment(1)
            });
            
            return { success: true, commentId: docRef.id };
        } catch (error) {
            console.error('Error adding comment:', error);
            return { success: false, error: error.message };
        }
    }

    async getComments(dealId) {
        try {
            const q = query(
                collection(this.db, 'comments'),
                where('dealId', '==', dealId),
                orderBy('createdAt', 'desc'),
                limit(50)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting comments:', error);
            return [];
        }
    }

    // ========== SAVED DEALS ==========
    
    async toggleSave(dealId, userId) {
        try {
            const userRef = doc(this.db, 'users', userId);
            const userSnap = await getDoc(userRef);
            
            if (!userSnap.exists()) return { success: false, error: 'User not found' };
            
            const savedDeals = userSnap.data().savedDeals || [];
            
            if (savedDeals.includes(dealId)) {
                await updateDoc(userRef, {
                    savedDeals: arrayRemove(dealId)
                });
                return { success: true, saved: false };
            } else {
                await updateDoc(userRef, {
                    savedDeals: arrayUnion(dealId)
                });
                return { success: true, saved: true };
            }
        } catch (error) {
            console.error('Error toggling save:', error);
            return { success: false, error: error.message };
        }
    }

    // ========== NOTIFICATIONS ==========
    
    async addNotification(userId, notification) {
        try {
            const docRef = doc(collection(this.db, 'notifications'));
            await setDoc(docRef, {
                id: docRef.id,
                userId,
                ...notification,
                createdAt: serverTimestamp(),
                read: false
            });
            return { success: true };
        } catch (error) {
            console.error('Error adding notification:', error);
            return { success: false, error: error.message };
        }
    }

    async getNotifications(userId) {
        try {
            const q = query(
                collection(this.db, 'notifications'),
                where('userId', '==', userId),
                orderBy('createdAt', 'desc'),
                limit(20)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting notifications:', error);
            return [];
        }
    }
}

export default new FirebaseService();
