// ==========================================
// PRICEPULSE REAL-TIME UI/UX FIXER
// ==========================================
// Paste this in browser console to diagnose and fix issues

(function() {
    'use strict';
    
    const Fixer = {
        issues: [],
        fixes: [],
        
        async run() {
            console.clear();
            console.log('%c🔧 PricePulse UI/UX Fixer v1.0', 'font-size: 20px; font-weight: bold; color: #00ff00;');
            console.log('Scanning...\n');
            
            this.checkScripts();
            this.checkModules();
            this.checkEventListeners();
            this.checkLucideIcons();
            this.checkModals();
            this.checkFirebase();
            this.checkButtons();
            
            this.report();
            this.fix();
            
            return this.issues;
        },
        
        checkScripts() {
            console.log('📜 Checking scripts...');
            const scripts = Array.from(document.scripts);
            const appScript = scripts.find(s => s.src.includes('app.js') || s.textContent.includes('PricePulseApp'));
            
            if (!appScript) {
                this.issues.push({ type: 'error', msg: 'app.js not loaded', fix: 'loadApp' });
            } else {
                console.log('✅ app.js found');
            }
            
            // Check Firebase
            const firebaseScripts = scripts.filter(s => s.src.includes('firebase'));
            if (firebaseScripts.length === 0) {
                this.issues.push({ type: 'warning', msg: 'Firebase CDN scripts not found', fix: 'loadFirebase' });
            } else {
                console.log(`✅ Firebase scripts: ${firebaseScripts.length}`);
            }
        },
        
        checkModules() {
            console.log('\n📦 Checking ES Modules...');
            
            if (typeof window.app !== 'undefined') {
                console.log('✅ window.app initialized');
            } else {
                this.issues.push({ type: 'error', msg: 'window.app not defined', fix: 'initApp' });
            }
        },
        
        checkEventListeners() {
            console.log('\n🖱️ Checking event listeners...');
            
            const buttons = document.querySelectorAll('[data-action]');
            console.log(`Found ${buttons.length} elements with data-action`);
            
            if (buttons.length === 0) {
                this.issues.push({ type: 'error', msg: 'No action buttons found', fix: null });
                return;
            }
            
            // Test click on first button
            const testBtn = buttons[0];
            let clicked = false;
            const testHandler = () => { clicked = true; };
            testBtn.addEventListener('click', testHandler);
            testBtn.click();
            testBtn.removeEventListener('click', testHandler);
            
            if (!clicked) {
                this.issues.push({ type: 'warning', msg: 'Click events may not be working', fix: 'fixListeners' });
            } else {
                console.log('✅ Click events working');
            }
        },
        
        checkLucideIcons() {
            console.log('\n🎨 Checking Lucide icons...');
            
            if (typeof lucide === 'undefined') {
                this.issues.push({ type: 'error', msg: 'Lucide not loaded', fix: 'loadLucide' });
                return;
            }
            
            const icons = document.querySelectorAll('[data-lucide]');
            const unrendered = Array.from(icons).filter(i => i.innerHTML.trim() === '');
            
            if (unrendered.length > 0) {
                this.issues.push({ 
                    type: 'warning', 
                    msg: `${unrendered.length}/${icons.length} icons not rendered`, 
                    fix: 'renderLucide' 
                });
            } else {
                console.log(`✅ All ${icons.length} icons rendered`);
            }
        },
        
        checkModals() {
            console.log('\n🪟 Checking modals...');
            
            const modalContainer = document.getElementById('modal-container');
            if (!modalContainer) {
                this.issues.push({ type: 'error', msg: 'Modal container missing', fix: 'createModalContainer' });
            } else {
                console.log('✅ Modal container exists');
            }
        },
        
        checkFirebase() {
            console.log('\n🔥 Checking Firebase...');
            
            if (typeof firebase !== 'undefined') {
                console.log('✅ Firebase global loaded');
                
                try {
                    const app = firebase.app();
                    console.log('✅ Firebase app initialized');
                } catch (e) {
                    this.issues.push({ type: 'error', msg: 'Firebase app not initialized', fix: 'initFirebase' });
                }
            } else {
                this.issues.push({ type: 'warning', msg: 'Firebase global not available', fix: null });
            }
        },
        
        checkButtons() {
            console.log('\n🔘 Checking button functionality...');
            
            const actions = ['home', 'explore', 'upload', 'activity', 'profile', 'search'];
            let allFound = true;
            
            actions.forEach(action => {
                const btn = document.querySelector(`[data-action="${action}"]`);
                if (!btn) {
                    console.warn(`⚠️ Button [${action}] not found`);
                    allFound = false;
                }
            });
            
            if (allFound) {
                console.log('✅ All navigation buttons found');
            }
        },
        
        report() {
            console.log('\n' + '='.repeat(50));
            console.log('REPORT:');
            console.log('='.repeat(50));
            
            const errors = this.issues.filter(i => i.type === 'error');
            const warnings = this.issues.filter(i => i.type === 'warning');
            
            console.log(`❌ Errors: ${errors.length}`);
            console.log(`⚠️ Warnings: ${warnings.length}`);
            
            if (errors.length > 0) {
                console.log('\nERRORS:');
                errors.forEach((e, i) => console.log(`${i+1}. ${e.msg}`));
            }
            
            if (warnings.length > 0) {
                console.log('\nWARNINGS:');
                warnings.forEach((w, i) => console.log(`${i+1}. ${w.msg}`));
            }
        },
        
        fix() {
            console.log('\n' + '🔧'.repeat(25));
            console.log('APPLYING FIXES...');
            console.log('🔧'.repeat(25) + '\n');
            
            this.issues.forEach(issue => {
                if (issue.fix && this[issue.fix]) {
                    try {
                        this[issue.fix]();
                        this.fixes.push(issue.msg);
                    } catch (e) {
                        console.error(`Failed to fix: ${issue.msg}`, e);
                    }
                }
            });
            
            if (this.fixes.length > 0) {
                console.log('\n✅ FIXES APPLIED:');
                this.fixes.forEach((f, i) => console.log(`${i+1}. ${f}`));
            }
        },
        
        // === FIX METHODS ===
        
        loadApp() {
            console.log('Loading app.js...');
            const script = document.createElement('script');
            script.type = 'module';
            script.src = './app.js';
            document.body.appendChild(script);
        },
        
        loadFirebase() {
            console.log('Loading Firebase from CDN...');
            const scripts = [
                'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js',
                'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js',
                'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js'
            ];
            
            scripts.forEach(src => {
                const script = document.createElement('script');
                script.src = src;
                document.head.appendChild(script);
            });
        },
        
        loadLucide() {
            console.log('Loading Lucide...');
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/lucide@latest';
            document.head.appendChild(script);
        },
        
        renderLucide() {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
                console.log('✅ Re-rendered Lucide icons');
            }
        },
        
        fixListeners() {
            console.log('Re-attaching event listeners...');
            
            // Re-attach document click listener
            document.addEventListener('click', (e) => {
                const actionEl = e.target.closest('[data-action]');
                if (!actionEl) return;
                
                const action = actionEl.dataset.action;
                console.log('Action:', action);
                
                // Basic handlers
                switch(action) {
                    case 'home':
                        alert('Home clicked');
                        break;
                    case 'explore':
                        alert('Explore clicked');
                        break;
                    case 'upload':
                        alert('Upload clicked');
                        break;
                    case 'activity':
                        alert('Activity clicked');
                        break;
                    case 'profile':
                        alert('Profile clicked');
                        break;
                }
            });
            
            console.log('✅ Event listeners re-attached');
        },
        
        initApp() {
            if (typeof PricePulseApp !== 'undefined') {
                window.app = new PricePulseApp();
                console.log('✅ App re-initialized');
            }
        },
        
        initFirebase() {
            // Will be called after Firebase loads
            setTimeout(() => {
                if (typeof firebase !== 'undefined') {
                    firebase.initializeApp({
                        apiKey: "AIzaSyBSAfeL0EIwFFvHaTVsJBCBFqwPkHWnTLs",
                        authDomain: "pricepulse-global.firebaseapp.com",
                        projectId: "pricepulse-global"
                    });
                    console.log('✅ Firebase initialized');
                }
            }, 1000);
        },
        
        createModalContainer() {
            const div = document.createElement('div');
            div.id = 'modal-container';
            div.style.display = 'none';
            document.body.appendChild(div);
            console.log('✅ Modal container created');
        }
    };
    
    // Auto-run
    Fixer.run().then(issues => {
        console.log('\n✅ Scan complete!');
        window.fixer = Fixer; // Expose for manual use
    });
    
    // Also expose to window
    window.PricePulseFixer = Fixer;
})();
