// ==========================================
// FIREBASE SERVICE - Complete Datastore 🔥
// ==========================================
// Handles all Firestore operations for social features
// Inspired by Instagram, Twitter, LinkedIn dashboards

// Firebase collections structure:
// - users/{userId} : User profiles, stats, preferences
// - deals/{dealId} : Deal posts with likes, comments, shares
// - notifications/{notifId} : User notifications
// - follows/{followId} : User follow relationships
// - bounties/{bountyId} : Bounty hunting tasks

class FirebaseService {
    constructor() {
        this.db = null;
        this.auth = null;
        this.currentUser = null;
    }

    // Initialize Firebase services
    init(firebaseApp) {
        this.db = getFirestore(firebaseApp);
        this.auth = getAuth(firebaseApp);
        
        // Listen to auth state
        onAuthStateChanged(this.auth, (user) => {
            this.currentUser = user;
        });
    }

    // ========== USER PROFILE OPERATIONS ==========
    
    // Create or update user profile (Instagram-style profile)
    async saveUserProfile(userId, userData) {
        try {
            const userRef = doc(this.db, 'users', userId);
            await setDoc(userRef, {
                ...userData,
                updatedAt: serverTimestamp(),
                // Social stats
                dealsCount: userData.dealsCount || 0,
                followersCount: userData.followersCount || 0,
                followingCount: userData.followingCount || 0,
                totalSavings: userData.totalSavings || 0,
                xp: userData.xp || 0,
                level: userData.level || 1,
                badges: userData.badges || [],
                // Profile info
                displayName: userData.displayName || '',
                bio: userData.bio || '',
                homeLocation: userData.homeLocation || '',
                photoURL: userData.photoURL || '',
                website: userData.website || '',
                // Privacy & settings
                isPublic: userData.isPublic !== false,
                notificationsEnabled: userData.notificationsEnabled !== false
            }, { merge: true });
            return true;
        } catch (error) {
            console.error('Error saving user profile:', error);
            return false;
        }
    }

    // Get user profile with stats
    async getUserProfile(userId) {
        try {
            const userRef = doc(this.db, 'users', userId);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            return null;
        } catch (error) {
            console.error('Error getting user profile:', error);
            return null;
        }
    }

    // Get user's deals (for profile tabs - Instagram style)
    async getUserDeals(userId, limitCount = 20) {
        try {
            const dealsRef = collection(this.db, 'deals');
            const q = query(
                dealsRef,
                where('userId', '==', userId),
                orderBy('createdAt', 'desc'),
                limit(limitCount)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting user deals:', error);
            return [];
        }
    }

    // Get user's liked deals
    async getLikedDeals(userId, limitCount = 20) {
        try {
            const likesRef = collection(this.db, 'likes');
            const q = query(
                likesRef,
                where('userId', '==', userId),
                orderBy('createdAt', 'desc'),
                limit(limitCount)
            );
            const querySnapshot = await getDocs(q);
            const likes = querySnapshot.docs.map(doc => doc.data());
            
            // Fetch actual deals
            const dealPromises = likes.map(like => this.getDeal(like.dealId));
            return (await Promise.all(dealPromises)).filter(deal => deal !== null);
        } catch (error) {
            console.error('Error getting liked deals:', error);
            return [];
        }
    }

    // Get user's saved/bookmarked deals
    async getSavedDeals(userId, limitCount = 20) {
        try {
            const userRef = doc(this.db, 'users', userId);
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) return [];
            
            const savedIds = userSnap.data().savedDeals || [];
            if (savedIds.length === 0) return [];
            
            // Fetch deals
            const dealPromises = savedIds.slice(0, limitCount).map(id => this.getDeal(id));
            return (await Promise.all(dealPromises)).filter(deal => deal !== null);
        } catch {
            console.error('Error getting saved deals');
            return [];
        }
    }

    // ========== DEAL OPERATIONS ==========

    // Create a new deal (with social metadata)
    async createDeal(dealData) {
        try {
            const dealsRef = collection(this.db, 'deals');
            const docRef = await addDoc(dealsRef, {
                ...dealData,
                createdAt: serverTimestamp(),
                likesCount: 0,
                commentsCount: 0,
                sharesCount: 0,
                viewsCount: 0,
                isActive: true,
                // Engagement metrics
                buzzScore: 0, // calculated from likes + comments + shares
                // AI insights
                aiAnalysis: dealData.aiAnalysis || null,
                bargainScore: dealData.bargainScore || 0
            });
            
            // Update user's deal count
            if (dealData.userId) {
                await this.incrementUserStat(dealData.userId, 'dealsCount', 1);
            }
            
            return docRef.id;
        } catch (error) {
            console.error('Error creating deal:', error);
            return null;
        }
    }

    // Get a single deal
    async getDeal(dealId) {
        try {
            const dealRef = doc(this.db, 'deals', dealId);
            const docSnap = await getDoc(dealRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            return null;
        } catch {
            console.error('Error getting deal');
            return null;
        }
    }

    // Get feed deals (Twitter-style timeline)
    async getFeedDeals(userId = null, limitCount = 50) {
        try {
            const dealsRef = collection(this.db, 'deals');
            let q;
            
            if (userId) {
                // Get deals from followed users
                const following = await this.getFollowing(userId);
                const followingIds = following.map(u => u.id);
                followingIds.push(userId); // Include own deals
                
                q = query(
                    dealsRef,
                    where('userId', 'in', followingIds),
                    where('isActive', '==', true),
                    orderBy('createdAt', 'desc'),
                    limit(limitCount)
                );
            } else {
                // Public feed
                q = query(
                    dealsRef,
                    where('isActive', '==', true),
                    orderBy('createdAt', 'desc'),
                    limit(limitCount)
                );
            }
            
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting feed deals:', error);
            return [];
        }
    }

    // ========== SOCIAL INTERACTIONS ==========

    // Like/Unlike a deal (Twitter heart style)
    async toggleLike(dealId, userId) {
        try {
            const likeRef = doc(this.db, 'likes', `${userId}_${dealId}`);
            const likeSnap = await getDoc(likeRef);
            
            if (likeSnap.exists()) {
                // Unlike
                await deleteDoc(likeRef);
                await this.incrementDealStat(dealId, 'likesCount', -1);
                return false; // unliked
            } else {
                // Like
                await setDoc(likeRef, {
                    dealId,
                    userId,
                    createdAt: serverTimestamp()
                });
                await this.incrementDealStat(dealId, 'likesCount', 1);
                
                // Add notification to deal owner
                const deal = await this.getDeal(dealId);
                if (deal && deal.userId !== userId) {
                    await this.addNotification(deal.userId, {
                        type: 'like',
                        fromUserId: userId,
                        dealId,
                        text: 'liked your deal',
                        read: false
                    });
                }
                
                return true; // liked
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            return null;
        }
    }

    // Check if user liked a deal
    async hasLiked(dealId, userId) {
        try {
            const likeRef = doc(this.db, 'likes', `${userId}_${dealId}`);
            const likeSnap = await getDoc(likeRef);
            return likeSnap.exists();
        } catch {
            return false;
        }
    }

    // Save/Unsave deal (bookmark)
    async toggleSave(dealId, userId) {
        try {
            const userRef = doc(this.db, 'users', userId);
            const userSnap = await getDoc(userRef);
            
            if (!userSnap.exists()) return false;
            
            const savedDeals = userSnap.data().savedDeals || [];
            
            if (savedDeals.includes(dealId)) {
                await updateDoc(userRef, {
                    savedDeals: arrayRemove(dealId)
                });
                return false; // unsaved
            } else {
                await updateDoc(userRef, {
                    savedDeals: arrayUnion(dealId)
                });
                return true; // saved
            }
        } catch (error) {
            console.error('Error toggling save:', error);
            return null;
        }
    }

    // ========== COMMENTS ==========

    // Add comment (Instagram-style)
    async addComment(dealId, userId, text) {
        try {
            const commentsRef = collection(this.db, 'comments');
            const docRef = await addDoc(commentsRef, {
                dealId,
                userId,
                text,
                createdAt: serverTimestamp(),
                likes: 0
            });
            
            // Update deal's comment count
            await this.incrementDealStat(dealId, 'commentsCount', 1);
            
            // Notify deal owner
            const deal = await this.getDeal(dealId);
            if (deal && deal.userId !== userId) {
                await this.addNotification(deal.userId, {
                    type: 'comment',
                    fromUserId: userId,
                    dealId,
                    commentId: docRef.id,
                    text: 'commented on your deal',
                    read: false
                });
            }
            
            return docRef.id;
        } catch (error) {
            console.error('Error adding comment:', error);
            return null;
        }
    }

    // Get comments for a deal
    async getComments(dealId, limitCount = 50) {
        try {
            const commentsRef = collection(this.db, 'comments');
            const q = query(
                commentsRef,
                where('dealId', '==', dealId),
                orderBy('createdAt', 'desc'),
                limit(limitCount)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting comments:', error);
            return [];
        }
    }

    // ========== FOLLOWS ==========

    // Follow/Unfollow user (Twitter/LinkedIn style)
    async toggleFollow(targetUserId, currentUserId) {
        try {
            const followRef = doc(this.db, 'follows', `${currentUserId}_${targetUserId}`);
            const followSnap = await getDoc(followRef);
            
            if (followSnap.exists()) {
                // Unfollow
                await deleteDoc(followRef);
                await this.incrementUserStat(targetUserId, 'followersCount', -1);
                await this.incrementUserStat(currentUserId, 'followingCount', -1);
                return false; // unfollowed
            } else {
                // Follow
                await setDoc(followRef, {
                    followerId: currentUserId,
                    followingId: targetUserId,
                    createdAt: serverTimestamp()
                });
                await this.incrementUserStat(targetUserId, 'followersCount', 1);
                await this.incrementUserStat(currentUserId, 'followingCount', 1);
                
                // Notify followed user
                await this.addNotification(targetUserId, {
                    type: 'follow',
                    fromUserId: currentUserId,
                    text: 'started following you',
                    read: false
                });
                
                return true; // followed
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
            return null;
        }
    }

    // Get followers
    async getFollowers(userId, limitCount = 50) {
        try {
            const followsRef = collection(this.db, 'follows');
            const q = query(
                followsRef,
                where('followingId', '==', userId),
                limit(limitCount)
            );
            const querySnapshot = await getDocs(q);
            const followerIds = querySnapshot.docs.map(doc => doc.data().followerId);
            
            // Get user profiles
            const userPromises = followerIds.map(id => this.getUserProfile(id));
            return (await Promise.all(userPromises)).filter(u => u !== null);
        } catch (error) {
            console.error('Error getting followers:', error);
            return [];
        }
    }

    // Get following
    async getFollowing(userId, limitCount = 50) {
        try {
            const followsRef = collection(this.db, 'follows');
            const q = query(
                followsRef,
                where('followerId', '==', userId),
                limit(limitCount)
            );
            const querySnapshot = await getDocs(q);
            const followingIds = querySnapshot.docs.map(doc => doc.data().followingId);
            
            // Get user profiles
            const userPromises = followingIds.map(id => this.getUserProfile(id));
            return (await Promise.all(userPromises)).filter(u => u !== null);
        } catch (error) {
            console.error('Error getting following:', error);
            return [];
        }
    }

    // ========== NOTIFICATIONS ==========

    // Add notification (Instagram/Twitter style)
    async addNotification(userId, notification) {
        try {
            const notifsRef = collection(this.db, 'notifications');
            await addDoc(notifsRef, {
                userId,
                ...notification,
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error adding notification:', error);
        }
    }

    // Get user notifications
    async getNotifications(userId, limitCount = 50) {
        try {
            const notifsRef = collection(this.db, 'notifications');
            const q = query(
                notifsRef,
                where('userId', '==', userId),
                orderBy('createdAt', 'desc'),
                limit(limitCount)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting notifications:', error);
            return [];
        }
    }

    // Mark notification as read
    async markNotificationRead(notificationId) {
        try {
            const notifRef = doc(this.db, 'notifications', notificationId);
            await updateDoc(notifRef, { read: true });
        } catch (error) {
            console.error('Error marking notification read:', error);
        }
    }

    // ========== ANALYTICS ==========

    // Get user stats for dashboard (LinkedIn-style analytics)
    async getUserAnalytics(userId) {
        try {
            const deals = await this.getUserDeals(userId, 100);
            const likes = await this.getLikedDeals(userId, 100);
            const saved = await this.getSavedDeals(userId, 100);
            
            // Calculate analytics
            const totalLikes = deals.reduce((sum, deal) => sum + (deal.likesCount || 0), 0);
            const totalComments = deals.reduce((sum, deal) => sum + (deal.commentsCount || 0), 0);
            const totalShares = deals.reduce((sum, deal) => sum + (deal.sharesCount || 0), 0);
            const totalViews = deals.reduce((sum, deal) => sum + (deal.viewsCount || 0), 0);
            const totalSavings = deals.reduce((sum, deal) => {
                return sum + ((deal.homePrice - deal.price) || 0);
            }, 0);
            
            return {
                dealsCount: deals.length,
                totalLikes,
                totalComments,
                totalShares,
                totalViews,
                totalSavings,
                likedDeals: likes.length,
                savedDeals: saved.length,
                avgBuzzScore: deals.length > 0 
                    ? deals.reduce((sum, d) => sum + (d.buzzScore || 0), 0) / deals.length 
                    : 0
            };
        } catch (error) {
            console.error('Error getting analytics:', error);
            return null;
        }
    }

    // ========== HELPER METHODS ==========

    async incrementUserStat(userId, stat, amount) {
        try {
            const userRef = doc(this.db, 'users', userId);
            await updateDoc(userRef, {
                [stat]: increment(amount)
            });
        } catch (error) {
            console.error('Error incrementing user stat:', error);
        }
    }

    async incrementDealStat(dealId, stat, amount) {
        try {
            const dealRef = doc(this.db, 'deals', dealId);
            await updateDoc(dealRef, {
                [stat]: increment(amount)
            });
        } catch (error) {
            console.error('Error incrementing deal stat:', error);
        }
    }
}

// Export singleton instance
const firebaseService = new FirebaseService();
export default firebaseService;
