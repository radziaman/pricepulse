// ==========================================
// PRICEPULSE AI SERVICE 🤖
// ==========================================
// Uses OpenRouter API for AI features
// Configure your API key in .env file

const AI_CONFIG = {
    model: 'deepseek/deepseek-r1',
    apiKey: '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',
    baseUrl: 'https://openrouter.ai/api/v1'
};

async function callAI(prompt, systemPrompt = null) {
    const messages = systemPrompt 
        ? [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }]
        : [{ role: 'user', content: prompt }];
    
    try {
        const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://pricepulse.app',
                'X-Title': 'PricePulse'
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages,
                max_tokens: 1024,
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'AI response unavailable';
    } catch (error) {
        console.error('AI error:', error);
        return getDemoResponse(prompt);
    }
}

function getDemoResponse() {
    const demos = [
        "Great deal! Historical data shows this is 20-30% below market value. Buy now!",
        "Good price but could drop further. Wait 1-2 weeks for potential sale.",
        "Fair price - not a bargain but solid value. Consider if you need it urgently.",
        "Slightly above market average. Wait for better deal or negotiate.",
        "Excellent price! Limited time offer - grab it before it's gone!"
    ];
    return demos[Math.floor(Math.random() * demos.length)];
}

// Analyze a deal with AI
window.analyzeDealWithAI = async function(name, price, location) {
    const prompt = `Analyze this deal and provide insights:
- Deal: ${name}
- Price: $${price}
- Location: ${location}

Provide: 1) Is it a good price? 2) What's the estimated value? 3) Buy now or wait?`;
    
    return await callAI(prompt);
}

// Get AI recommendations
window.getAIRecommendations = async function(userPreferences) {
    const prompt = `Recommend 3 best deals based on these user preferences:
${JSON.stringify(userPreferences)}

Format as a simple numbered list with deal names and why they're good.`;
    
    return await callAI(prompt, 'You are a friendly shopping assistant that helps find the best deals.');
}

// Smart search with AI
window.smartSearchWithAI = async function(query, deals) {
    const prompt = `Search these deals and find matches for: "${query}"
    
Available deals:
${JSON.stringify(deals)}

Return only exact matches with deal names.`;
    
    return await callAI(prompt);
}

// AI Price prediction
window.predictPriceTrend = async function(itemName) {
    const prompt = `Predict price trend for "${itemName}" over next 30 days.
Answer in one word: RISING, STABLE, or DROPPING.`;
    
    return await callAI(prompt);
}

// AI Chat
window.aiChat = async function(message, history = []) {
    const messages = history.map(h => ({ role: h.role, content: h.content }));
    messages.push({ role: 'user', content: message });
    
    try {
        const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://pricepulse.app',
                'X-Title': 'PricePulse'
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages,
                max_tokens: 2048,
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'AI response unavailable';
    } catch (error) {
        console.error('AI chat error:', error);
        return "I'm having trouble connecting to AI. Please try again.";
    }
}

// Initialize AI (no-op for OpenRouter)
window.initializeAI = function() {
    console.log('🤖 PricePulse AI initialized with', AI_CONFIG.model);
    return true;
};

// --- NEW AI FEATURES ---

// Generate deal description
window.generateDealDescription = async function(name, price, category) {
    const prompt = `Generate a short, engaging description (max 100 chars) for this deal:
- Item: ${name}
- Price: $${price}
- Category: ${category}

Format: Just return the description, no extra text.`;
    
    try {
        return await callAI(prompt);
    } catch {
        return `Great ${name} deal at $${price}!`;
    }
};

// Generate deal tagline
window.generateDealTagline = async function(name, price, savings) {
    const prompt = `Create a catchy tagline for this deal:
- Item: ${name}
- Price: $${price}
- Savings: $${savings}

Max 10 words. Make it exciting!`;
    
    try {
        return await callAI(prompt);
    } catch {
        return savings > 0 ? `Save $${savings} now!` : `Great deal!`;
    }
};

// Smart auto-categorize
window.autoCategorize = async function(name, description = '') {
    const prompt = `Categorize this item. Return only ONE word from: food, electronics, fashion, home, beauty, sports, toys, books, other
Item: ${name}
Description: ${description}`;
    
    try {
        const result = await callAI(prompt);
        return result.toLowerCase().trim() || 'other';
    } catch {
        return 'other';
    }
};

// Smart price alert
window.checkSmartPriceAlert = async function(deal, userAlerts) {
    const prompt = `Analyze if this deal matches any of the user's price alerts.
Deal: ${deal.name} at $${deal.price}
User alerts: ${JSON.stringify(userAlerts)}

Return: YES if it matches any alert (name or category), NO if not. Just one word.`;
    
    try {
        const result = await callAI(prompt);
        return result.toUpperCase().includes('YES');
    } catch {
        return userAlerts.some(a => deal.name.toLowerCase().includes(a.toLowerCase()));
    }
};

// AI deal matching for user preferences
window.findMatchingDeals = async function(deals, userProfile) {
    const prompt = `From these deals, find the best matches for this user.
User profile: ${JSON.stringify(userProfile)}
Deals: ${JSON.stringify(deals.slice(0, 10))}

Return top 3 matches as a JSON array with deal id and match reason. Format: [{"id": 1, "reason": "..."}]`;
    
    try {
        const result = await callAI(prompt);
        const matches = JSON.parse(result.replace(/```json|```/g, '').trim() || '[]');
        return matches;
    } catch {
        return [];
    }
};

// Generate price insight
window.getPriceInsight = async function(name, currentPrice, historicalPrice) {
    const prompt = `Compare prices and give insight:
- Item: ${name}
- Current Price: $${currentPrice}
- Typical Price: $${historicalPrice}

Give 1 sentence on whether now is a good time to buy.`;
    
    try {
        return await callAI(prompt);
    } catch {
        const diff = ((historicalPrice - currentPrice) / historicalPrice * 100).toFixed(0);
        if (diff > 20) return `Great time to buy! ${diff}% below typical price.`;
        if (diff > 10) return `Good price, ${diff}% below typical.`;
        return `Fair price.`;
    }
};

// AI summarize deal for sharing
window.summarizeDeal = async function(deal) {
    const savings = deal.homePrice - deal.price;
    const savingsPct = ((savings / deal.homePrice) * 100).toFixed(0);
    
    const prompt = `Create a short social media post for this deal (max 280 chars):
Deal: ${deal.name}
Price: $${deal.price}
Location: ${deal.loc}
Savings: $${savings} (${savingsPct}%)

Make it engaging with emoji and #PricePulse hashtag.`;
    
    try {
        return await callAI(prompt);
    } catch {
        return `🚀 Found ${deal.name} for $${deal.price} at ${deal.loc}! Save $${savings.toFixed(0)} (${savingsPct}%)! #PricePulse`;
    }
};

// AI bargain score (1-10)
window.getBargainScore = async function(deal) {
    const savings = ((deal.homePrice - deal.price) / deal.homePrice * 100);
    
    if (savings >= 30) return 10;
    if (savings >= 25) return 9;
    if (savings >= 20) return 8;
    if (savings >= 15) return 7;
    if (savings >= 10) return 6;
    if (savings >= 5) return 5;
    return Math.max(1, Math.floor(savings / 2));
};

// AI suggest related deals
window.suggestRelatedDeals = async function(dealName, allDeals) {
    const prompt = `Find deals related to "${dealName}" from this list:
${JSON.stringify(allDeals.map(d => ({ name: d.name, category: d.category })).slice(0, 15))}

Return related deal names as a comma-separated list.`;
    
    try {
        const result = await callAI(prompt);
        return result.split(',').map(s => s.trim()).filter(Boolean);
    } catch {
        return allDeals
            .filter(d => d.category === deal.category && d.id !== deal.id)
            .slice(0, 3)
            .map(d => d.name);
    }
};

// AI extract location from text
window.extractLocation = async function(text) {
    const prompt = `Extract location from this text. Return just the location name:
"${text}"`;
    
    try {
        return await callAI(prompt);
    } catch {
        return text;
    }
};

// AI validate deal price
window.validateDealPrice = async function(name, price) {
    const prompt = `Is $${price} a reasonable price for "${name}"?
Answer: REASONABLE, TOO_HIGH, or TOO_LOW`;
    
    try {
        const result = await callAI(prompt);
        return result.includes('REASONABLE') ? 'reasonable' : result.includes('TOO_HIGH') ? 'too_high' : 'too_low';
    } catch {
        return 'unknown';
    }
};

// Expose for app use
window.aiComplete = callAI;