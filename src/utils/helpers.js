// ==========================================
// UTILS - Utility Functions
// ==========================================

export function formatPrice(price) {
    return `$${Number(price).toLocaleString()}`;
}

export function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

export function formatTime(timeString) {
    return timeString;
}

export function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
    }).format(date);
}

export function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diff = now - past;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return formatDate(past);
}

export function getInitials(name) {
    return name ? name[0].toUpperCase() : '?';
}

export function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

export function debounce(fn, delay = 300) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

export function throttle(fn, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], [shuffled[j]] = [shuffled[j], [shuffled[i]];
    }
    return shuffled;
}

export function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const group = item[key];
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
    }, {});
}

export function uniqBy(array, key) {
    const seen = new Set();
    return array.filter(item => {
        const k = item[key];
        return seen.has(k) ? false : seen.add(k);
    });
}

export default {
    formatPrice,
    formatNumber,
    formatTime,
    formatDate,
    timeAgo,
    getInitials,
    slugify,
    debounce,
    throttle,
    generateId,
    clamp,
    randomItem,
    shuffle,
    groupBy,
    uniqBy
};