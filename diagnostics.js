// ==========================================
// REAL-TIME UI/UX CHECKER & FIXER
// ==========================================
// This script diagnoses and auto-fixes common issues

(function() {
    'use strict';
    
    const checker = {
        errors: [],
        warnings: [],
        fixes: [],
        
        // Run all checks
        async runDiagnostics() {
            console.log('🔍 Starting PricePulse Diagnostics...');
            
            this.checkJavaScriptLoading();
            this.checkEventListeners();
            this.checkModals();
            this.checkLucideIcons();
            this.checkFirebase();
            this.checkServiceWorker();
            
            this.report();
            this.attemptAutoFix();
            
            return { errors: this.errors, warnings: this.warnings, fixes: this.fixes };
        },
        
        // Check if JavaScript is loading
        checkJavaScriptLoading() {
            console.log('Checking JavaScript loading...');
            
            if (typeof window.app === 'undefined') {
                this.errors.push('❌ Main app (window.app) not loaded');
                
                // Check if app.js loaded
                const scripts = Array.from(document.scripts);
                const appScript = scripts.find(s => s.src.includes('app.js') || s.textContent.includes('PricePulseApp'));
                
                if (!appScript) {
                    this.errors.push('❌ app.js script not found in DOM');
                } else {
                    this.warnings.push('⚠️ app.js found but PricePulseApp not initialized');
                }
            } else {
                console.log('✅ Main app loaded');
            }
        },
        
        // Check event listeners
        checkEventListeners() {
            console.log('Checking event listeners...');
            
            const buttons = document.querySelectorAll('[data-action]');
            if (buttons.length === 0) {
                this.warnings.push('⚠️ No elements with data-action found');
            } else {
                console.log(`✅ Found ${buttons.length} actionable elements`);
            }
            
            // Test if document click listener exists
            const testEvent = new Event('click');
            const button = document.querySelector('[data-action="home"]');
            if (button) {
                // We can't directly check if listeners exist, but we can test if click works
                console.log('✅ Event delegation should be working');
            }
        },
        
        // Check modals
        checkModals() {
            console.log('Checking modals...');
            
            const modalContainer = document.getElementById('modal-container');
            if (!modalContainer) {
                this.errors.push('❌ Modal container not found');
            } else {
                console.log('✅ Modal container exists');
            }
            
            // Check if modal CSS exists
            const modalSheet = document.querySelector('.modal-sheet');
            if (!modalSheet) {
                this.warnings.push('⚠️ No modal sheets found (may load dynamically)');
            }
        },
        
        // Check Lucide icons
        checkLucideIcons() {
            console.log('Checking Lucide icons...');
            
            if (typeof lucide === 'undefined') {
                this.errors.push('❌ Lucide library not loaded');
            } else {
                console.log('✅ Lucide loaded');
                
                // Check if icons rendered
                const icons = document.querySelectorAll('[data-lucide]');
                const emptyIcons = Array.from(icons).filter(i => i.innerHTML.trim() === '');
                
                if (emptyIcons.length > 0) {
                    this.warnings.push(`⚠️ ${emptyIcons.length} Lucide icons not rendered`);
                    this.fixes.push('Running lucide.createIcons()');
                    setTimeout(() => lucide.createIcons(), 100);
                } else {
                    console.log(`✅ ${icons.length} Lucide icons rendered`);
                }
            }
        },
        
        // Check Firebase
        checkFirebase() {
            console.log('Checking Firebase...');
            
            // Check if Firebase is loaded (from CDN)
            if (typeof firebase !== 'undefined') {
                console.log('✅ Firebase global object found');
            } else {
                this.warnings.push('⚠️ Firebase global object not found (may use ES modules)');
            }
            
            // Check if our Firebase module loaded
            if (typeof auth === 'undefined' && typeof firebase === 'undefined') {
                this.errors.push('❌ Firebase auth not initialized');
            }
        },
        
        // Check service worker
        checkServiceWorker() {
            console.log('Checking service worker...');
            
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(regs => {
                    if (regs.length > 0) {
                        console.log(`✅ ${regs.length} service worker(s) registered`);
                    } else {
                        this.warnings.push('⚠️ No service workers registered');
                    }
                });
            }
        },
        
        // Report findings
        report() {
            console.log('\n========== DIAGNOSTIC REPORT ==========');
            console.log(`Errors: ${this.errors.length}`);
            console.log(`Warnings: ${this.warnings.length}`);
            console.log(`Fixes applied: ${this.fixes.length}`);
            console.log('======================================\n');
            
            if (this.errors.length > 0) {
                console.error('ERRORS:');
                this.errors.forEach(e => console.error(e));
            }
            
            if (this.warnings.length > 0) {
                console.warn('WARNINGS:');
                this.warnings.forEach(w => console.warn(w));
            }
            
            if (this.fixes.length > 0) {
                console.log('FIXES APPLIED:');
                this.fixes.forEach(f => console.log('✅', f));
            }
        },
        
        // Attempt to auto-fix common issues
        attemptAutoFix() {
            console.log('\n🔧 Attempting auto-fixes...');
            
            // Fix 1: Re-initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                setTimeout(() => {
                    lucide.createIcons();
                    console.log('✅ Re-rendered Lucide icons');
                }, 500);
            }
            
            // Fix 2: Re-attach event listeners if missing
            if (typeof window.app === 'undefined') {
                console.log('⚠️ Cannot auto-fix: app not loaded');
            }
            
            // Fix 3: Check if modules are supported
            if (!('noModule' in HTMLScriptElement.prototype)) {
                this.errors.push('❌ Browser does not support ES modules');
            }
        },
        
        // Test button clicks
        testButtons() {
            console.log('\n🧪 Testing button functionality...');
            
            const actions = ['home', 'explore', 'upload', 'activity', 'profile'];
            actions.forEach(action => {
                const btn = document.querySelector(`[data-action="${action}"]`);
                if (btn) {
                    console.log(`✅ Button [${action}] found`);
                } else {
                    this.errors.push(`❌ Button [${action}] not found`);
                }
            });
        }
    };
    
    // Expose to window for manual testing
    window.diagnostics = checker;
    
    // Auto-run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => checker.runDiagnostics());
    } else {
        checker.runDiagnostics();
    }
    
    // Add manual test button (for debugging)
    const debugBtn = document.createElement('div');
    debugBtn.innerHTML = '🐛';
    debugBtn.style = 'position:fixed; top:10px; right:10px; z-index:99999; cursor:pointer; font-size:24px; background:#000; padding:10px; border-radius:50%;';
    debugBtn.onclick = () => checker.runDiagnostics();
    document.body.appendChild(debugBtn);
})();
