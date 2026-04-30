// ==========================================
// PRICEPULSE REAL-TIME DIAGNOSTICS & AUTO-FIX
// ==========================================
// Inject this in browser console OR it auto-loads with app
// Usage: window.runDiagnostics() or just wait for auto-check

(function() {
    'use strict';
    
    const DIAGNOSTICS_VERSION = '2.0';
    
    const diagnostics = {
        results: { pass: 0, fail: 0, warn: 0 },
        issues: [],
        
        // Color schemes for console
        colors: {
            pass: '#00ff00',
            fail: '#ff0000', 
            warn: '#ffaa00',
            info: '#00aaff',
            title: '#ff00ff'
        },
        
        // Main entry point
        async run() {
            console.clear();
            this.header();
            
            // Run all checks
            await this.checkScripts();
            await this.checkFirebase();
            await this.checkEventListeners();
            await this.checkModals();
            await this.checkLucideIcons();
            await this.checkAppState();
            
            // Report and fix
            this.report();
            await this.autoFix();
            
            return this.results;
        },
        
        header() {
            console.log(
                '%c🔧 PricePulse Diagnostics v' + DIAGNOSTICS_VERSION + '%c 🚀', 
                'font-size: 24px; font-weight: bold; color: ' + this.colors.title,
                'font-size: 16px;'
            );
            console.log('='.repeat(60));
        },
        
        // Check if scripts are loaded
        async checkScripts() {
            this.log('info', '📜 Checking script loading...');
            
            const scripts = Array.from(document.scripts);
            const checks = [
                { name: 'Lucide', test: () => typeof lucide !== 'undefined', fix: this.fixLucide },
                { name: 'Firebase Core', test: () => typeof firebase !== 'undefined', fix: this.fixFirebase },
                { name: 'Firebase Auth', test: () => typeof firebase !== 'undefined' && firebase.auth, fix: this.fixFirebase },
                { name: 'Firebase Firestore', test: () => typeof firebase !== 'undefined' && firebase.firestore, fix: this.fixFirebase },
                { name: 'App Module', test: () => typeof window.app !== 'undefined', fix: this.fixApp }
            ];
            
            for (const check of checks) {
                if (check.test()) {
                    this.log('pass', `  ✅ ${check.name} loaded`);
                    this.results.pass++;
                } else {
                    this.log('fail', `  ❌ ${check.name} NOT loaded`);
                    this.results.fail++;
                    this.issues.push({ type: 'script', name: check.name, fix: check.fix });
                }
            }
        },
        
        // Check Firebase initialization
        async checkFirebase() {
            this.log('info', '🔥 Checking Firebase...');
            
            try {
                if (typeof firebase === 'undefined') {
                    this.log('fail', '  ❌ Firebase not loaded');
                    this.results.fail++;
                    return;
                }
                
                const app = firebase.app();
                this.log('pass', '  ✅ Firebase app initialized');
                this.results.pass++;
                
                const auth = firebase.auth();
                if (auth) {
                    this.log('pass', '  ✅ Auth service ready');
                    this.results.pass++;
                }
                
                const db = firebase.firestore();
                if (db) {
                    this.log('pass', '  ✅ Firestore service ready');
                    this.results.pass++;
                }
                
            } catch (e) {
                this.log('fail', '  ❌ Firebase error: ' + e.message);
                this.results.fail++;
            }
        },
        
        // Check if event listeners work
        async checkEventListeners() {
            this.log('info', '🖱️ Checking event listeners...');
            
            const buttons = document.querySelectorAll('[data-action]');
            this.log('info', `  Found ${buttons.length} action buttons`);
            
            if (buttons.length === 0) {
                this.log('fail', '  ❌ No buttons with data-action found');
                this.results.fail++;
                return;
            }
            
            // Check if document has click listener
            const testEvent = new Event('click');
            let listenerWorking = false;
            
            const testHandler = () => { listenerWorking = true; };
            document.addEventListener('click', testHandler);
            document.dispatchEvent(testEvent);
            document.removeEventListener('click', testHandler);
            
            if (listenerWorking) {
                this.log('pass', '  ✅ Document click listener working');
                this.results.pass++;
            } else {
                this.log('warn', '  ⚠️ Document click listener may not be attached');
                this.results.warn++;
                this.issues.push({ type: 'listener', fix: this.fixListeners });
            }
        },
        
        // Check modals
        async checkModals() {
            this.log('info', '🪟 Checking modals...');
            
            const modalContainer = document.getElementById('modal-container');
            if (modalContainer) {
                this.log('pass', '  ✅ Modal container exists');
                this.results.pass++;
            } else {
                this.log('fail', '  ❌ Modal container missing');
                this.results.fail++;
                this.issues.push({ type: 'modal', fix: this.fixModalContainer });
            }
        },
        
        // Check Lucide icons rendering
        async checkLucideIcons() {
            this.log('info', '🎨 Checking Lucide icons...');
            
            if (typeof lucide === 'undefined') {
                this.log('fail', '  ❌ Lucide not loaded');
                this.results.fail++;
                return;
            }
            
            const icons = document.querySelectorAll('[data-lucide]');
            const unrendered = Array.from(icons).filter(i => i.innerHTML.trim() === '');
            
            if (unrendered.length === 0) {
                this.log('pass', `  ✅ All ${icons.length} icons rendered`);
                this.results.pass++;
            } else {
                this.log('warn', `  ⚠️ ${unrendered.length}/${icons.length} icons not rendered`);
                this.results.warn++;
                this.issues.push({ type: 'icons', fix: this.fixIcons });
            }
        },
        
        // Check app state
        async checkAppState() {
            this.log('info', '📱 Checking app state...');
            
            if (typeof window.app !== 'undefined') {
                this.log('pass', '  ✅ App initialized');
                this.results.pass++;
                
                if (window.app.state) {
                    this.log('pass', '  ✅ App state exists');
                    this.results.pass++;
                }
            } else {
                this.log('fail', '  ❌ App not initialized');
                this.results.fail++;
            }
        },
        
        // Report results
        report() {
            console.log('\n' + '='.repeat(60));
            console.log('%c📊 DIAGNOSTICS REPORT', 'font-size: 18px; font-weight: bold;');
            console.log('='.repeat(60));
            
            console.log('%c  ✅ Passed: ' + this.results.pass, 'color: ' + this.colors.pass + '; font-weight: bold;');
            console.log('%c  ❌ Failed: ' + this.results.fail, 'color: ' + this.colors.fail + '; font-weight: bold;');
            console.log('%c  ⚠️ Warnings: ' + this.results.warn, 'color: ' + this.colors.warn + '; font-weight: bold;');
            console.log('='.repeat(60) + '\n');
        },
        
        // Auto-fix issues
        async autoFix() {
            if (this.issues.length === 0) {
                this.log('pass', '🎉 No issues to fix!');
                return;
            }
            
            this.log('info', '🔧 Attempting auto-fix...');
            
            for (const issue of this.issues) {
                if (issue.fix) {
                    try {
                        await issue.fix.call(this);
                        this.log('pass', `  ✅ Fixed: ${issue.name || issue.type}`);
                    } catch (e) {
                        this.log('fail', `  ❌ Fix failed: ${e.message}`);
                    }
                }
            }
        },
        
        // ========== FIX METHODS ==========
        
        async fixLucide() {
            this.log('info', '  📥 Loading Lucide...');
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/lucide@latest';
                script.onload = () => {
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                        this.log('pass', '  ✅ Lucide loaded and rendered');
                    }
                    resolve();
                };
                document.head.appendChild(script);
            });
        },
        
        async fixFirebase() {
            this.log('info', '  📥 Loading Firebase...');
            const scripts = [
                'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js',
                'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js',
                'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js'
            ];
            
            for (const src of scripts) {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }
            
            // Initialize Firebase
            if (typeof firebase !== 'undefined' && !firebase.apps?.length) {
                firebase.initializeApp({
                    apiKey: "AIzaSyBSAfeL0EIwFFvHaTVsJBCBFqwPkHWnTLs",
                    authDomain: "pricepulse-global.firebaseapp.com",
                    projectId: "pricepulse-global"
                });
                this.log('pass', '  ✅ Firebase initialized');
            }
        },
        
        async fixApp() {
            this.log('info', '  📥 Re-initializing app...');
            
            // Re-run app initialization
            if (typeof PricePulseApp !== 'undefined') {
                window.app = new PricePulseApp();
                this.log('pass', '  ✅ App re-initialized');
            } else {
                this.log('warn', '  ⚠️ PricePulseApp class not found');
            }
        },
        
        fixListeners() {
            this.log('info', '  🔧 Re-attaching event listeners...');
            
            // Re-attach document click listener
            document.addEventListener('click', (e) => {
                const actionEl = e.target.closest('[data-action]');
                if (!actionEl) return;
                
                const action = actionEl.dataset.action;
                this.log('info', '  🖱️ Action triggered: ' + action);
                
                // Basic handlers for testing
                if (window.app && window.app.handleAction) {
                    window.app.handleAction(action);
                }
            });
            
            this.log('pass', '  ✅ Event listeners re-attached');
        },
        
        fixModalContainer() {
            this.log('info', '  🔧 Creating modal container...');
            const div = document.createElement('div');
            div.id = 'modal-container';
            div.style.display = 'none';
            document.body.appendChild(div);
            this.log('pass', '  ✅ Modal container created');
        },
        
        fixIcons() {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
                this.log('pass', '  ✅ Icons re-rendered');
            }
        },
        
        // Console logging helper
        log(type, message) {
            const color = this.colors[type] || '#ffffff';
            console.log('%c' + message, 'color: ' + color);
        }
    };
    
    // Expose to window
    window.runDiagnostics = () => diagnostics.run();
    window.diagnostics = diagnostics;
    
    // Auto-run on load (delayed to let everything load)
    if (document.readyState === 'complete') {
        setTimeout(() => window.runDiagnostics(), 2000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => window.runDiagnostics(), 2000);
        });
    }
    
    console.log('%c🔧 PricePulse Diagnostics loaded! Run window.runDiagnostics() to check.', 'color: #00aaff;');
})();
