// ==========================================
// GEMINI AI SERVICE 💎🧠
// ==========================================
// Uses Firebase AI (Vertex AI) for Gemini integration
// Configure in Firebase Console: AI Agents / Vertex AI

const aiConfig = {
    // Vertex AI location (update with your location)
    location: 'us-central1',
    model: 'gem-2.0-flash-001'
};

// Gemini AI Functions
let generativeModel = null;

// Initialize Gemini
async function initializeGemini() {
    try {
        // Check if Firebase AI is available
        if (typeof window.vertexAI === 'undefined' && typeof firebase === 'undefined') {
            console.warn('AI not available - using fallback');
            return false;
        }
        
        // Try to use Firebase Genkit or Vertex AI
        if (firebase?.ai?.generativeModel) {
            generativeModel = firebase.ai.generativeModel(aiConfig.model);
            console.log('✅ Gemini AI initialized');
            return true;
        }
        
        console.log('ℹ️ Using demo AI mode');
        return false;
    } catch (error) {
        console.error('AI init failed:', error);
        return false;
    }
}

// Analyze deal with AI
async function analyzeDealWithAI(dealName, price, location) {
    if (!generativeModel) {
        // Demo fallback
        return getDemoAnalysis(dealName, price, location);
    }
    
    try {
        const prompt = `Analyze this deal and provide insights:
- Deal: ${dealName}
- Price: $${price}
- Location: ${location}

Provide: 1) Is it a good price? 2) What's the estimated value? 3) Buy now or wait?`;

        const result = await generativeModel.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error('AI analysis failed:', error);
        return getDemoAnalysis(dealName, price, location);
    }
}

function getDemoAnalysis(name, price, location) {
    const assessments = [
        "Great price! Historical data suggests this is 20-30% below market value. Buy now!",
        "Good price but could drop further. Wait 1-2 weeks for potential sale.",
        "Fair price - not a bargain but solid value. Consider if you need it urgently.",
        "Slightly above market average. Wait for better deal or negotiate.",
        "Excellent price! Limited time offer - grab it before it's gone!"
    ];
    return assessments[Math.floor(Math.random() * assessments.length)];
}

// Get AI recommendations
async function getAIRecommendations(userPreferences) {
    if (!generativeModel) {
        return getDemoRecommendations();
    }
    
    try {
        const prompt = `Recommend 3 best deals based on these preferences:
${JSON.stringify(userPreferences)}

Format as a simple numbered list with deal names and why they're good.`;

        const result = await generativeModel.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        return getDemoRecommendations();
    }
}

function getDemoRecommendations() {
    return `1. The Umami Burger at Orchard Road - Currently 4% below average! 🍔
2. MacBook Pro M3 at City Hall - Best price in 30 days! 💻
3. Elite Watch at Marina Bay - Rare find at this price! ⌚`;
}

// Smart search with AI
async function smartSearchWithAI(query) {
    if (!generativeModel) {
        return filterDealsDemo(query);
    }
    
    try {
        const prompt = `Search these deals and find matches for: "${query}"
        
Available deals:
${JSON.stringify(state.finds)}
        
Return only exact matches with deal names.`;

        const result = await generativeModel.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        return filterDealsDemo(query);
    }
}

function filterDealsDemo(query) {
    const q = query.toLowerCase();
    const matches = state.finds.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.loc.toLowerCase().includes(q)
    );
    return matches.length > 0 
        ? `Found: ${matches.map(m => m.name).join(', ')}`
        : 'No exact matches found. Try different keywords.';
}

// AI Price prediction
async function predictPriceTrend(itemName) {
    if (!generativeModel) {
        const trends = ['📈 Rising - Buy now!', '📊 Stable', '📉 Dropping - Wait'];
        return trends[Math.floor(Math.random() * trends.length)];
    }
    
    try {
        const prompt = `Predict price trend for "${itemName}" over next 30 days. 
Answer in one word: RISING, STABLE, or DROPPING.`;

        const result = await generativeModel.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        return '📊 Stable';
    }
}

// Expose to window
window.analyzeDealWithAI = analyzeDealWithAI;
window.getAIRecommendations = getAIRecommendations;
window.smartSearchWithAI = smartSearchWithAI;
window.predictPriceTrend = predictPriceTrend;
window.initializeGemini = initializeGemini;