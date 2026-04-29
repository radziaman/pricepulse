// ==========================================
// MONITORING - Web Vitals & Error Tracking
// ==========================================
// Inspired by Meta's internal monitoring stack

(function() {
    'use strict';
    
    // Web Vitals tracking (like Meta's performance monitoring)
    function sendToAnalytics(metric) {
        // Send to Firebase Analytics if available, otherwise console
        if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
                metric_name: metric.name,
                metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value)
            });
        } else {
            console.log('Web Vital:', metric.name, metric.value);
        }
    }
    
    // Load Web Vitals library dynamically
    function loadWebVitals() {
        if ('performance' in window) {
            import('https://unpkg.com/web-vitals@3?module').then(({ getCLS, getFCP, getLCP, getTTFB, getFID }) => {
                getCLS(sendToAnalytics);
                getFCP(sendToAnalytics);
                getLCP(sendToAnalytics);
                getTTFB(sendToAnalytics);
                getFID(sendToAnalytics);
            }).catch(() => {
                console.warn('Web Vitals failed to load');
            });
        }
    }
    
    // Error tracking (similar to Sentry)
    window.addEventListener('error', (event) => {
        const errorData = {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error?.stack,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };
        
        console.error('Global error tracked:', errorData);
        // In production, send to error tracking service
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
    });
    
    // Performance observer for long tasks (Meta-style monitoring)
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.duration > 50) {
                        console.log('Long task detected:', entry.duration + 'ms');
                    }
                });
            });
            observer.observe({ entryTypes: ['longtask'] });
        } catch {
            console.warn('PerformanceObserver not supported');
        }
    }
    
    // Initialize monitoring when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadWebVitals);
    } else {
        loadWebVitals();
    }
})();
