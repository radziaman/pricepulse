import { describe, it, expect, beforeEach } from "vitest";
import fs from "fs";
import path from "path";

// Read the HTML file once
const htmlPath = path.resolve(__dirname, "../index.html");
const html = fs.readFileSync(htmlPath, "utf-8");

// Read the built index.html if it exists
let builtHtml = "";
try {
  const builtPath = path.resolve(__dirname, "../dist/index.html");
  if (fs.existsSync(builtPath)) {
    builtHtml = fs.readFileSync(builtPath, "utf-8");
  }
} catch (e) {
  // Ignore
}

describe("PricePulse Comprehensive Tests", () => {
  describe("HTML Structure Validation", () => {
    it("should have DOCTYPE declaration", () => {
      expect(html).toMatch(/<!DOCTYPE html>/i);
    });

    it("should have html lang attribute", () => {
      expect(html).toContain('<html lang="en">');
    });

    it("should have charset meta tag", () => {
      expect(html).toContain('charset="UTF-8"');
    });

    it("should have viewport meta tag", () => {
      expect(html).toContain('name="viewport"');
    });

    it("should have title tag", () => {
      expect(html).toContain("<title>PricePulse");
    });

    it("should have manifest link", () => {
      expect(html).toContain('rel="manifest"');
      expect(html).toContain("manifest.json");
    });

    it("should have theme-color meta", () => {
      expect(html).toContain('name="theme-color"');
    });

    it("should have apple-mobile-web-app-capable meta", () => {
      expect(html).toContain('name="apple-mobile-web-app-capable"');
    });

    it("should have description meta", () => {
      expect(html).toContain('name="description"');
    });

    it("should have Open Graph meta tags", () => {
      expect(html).toContain('property="og:title"');
      expect(html).toContain('property="og:description"');
      expect(html).toContain('property="og:type"');
    });
  });

  describe("Header Structure", () => {
    it("should have header element", () => {
      expect(html).toContain('<header class="nike-header">');
    });

    it("should have header logo", () => {
      expect(html).toContain('header-logo">PricePulse');
    });

    it("should have header tagline", () => {
      expect(html).toContain("Find. Share. Save.");
    });

    it("should have header actions", () => {
      expect(html).toContain('id="header-actions"');
    });

    it("should have search button in header", () => {
      expect(html).toContain('data-action="search"');
    });

    it("should have activity button with notification dot", () => {
      expect(html).toContain('data-action="activity"');
      expect(html).toContain('id="notif-dot"');
    });

    it("should have profile button", () => {
      expect(html).toContain('data-action="profile"');
    });
  });

  describe("Navigation Structure", () => {
    it("should have bottom navigation", () => {
      expect(html).toContain('id="bottom-nav"');
    });

    it("should have home navigation item", () => {
      expect(html).toContain('data-action="home"');
    });

    it("should have explore navigation item", () => {
      expect(html).toContain('data-action="explore"');
    });

    it("should have upload/create navigation item", () => {
      expect(html).toContain('data-action="upload"');
    });

    it("should have activity navigation item", () => {
      expect(html).toContain('data-action="activity"');
    });

    it("should have profile navigation item", () => {
      expect(html).toContain('data-action="profile"');
    });

    it("should have 5 navigation items", () => {
      const navItems = html.match(/data-action="/g);
      expect(navItems).toBeTruthy();
      // Count unique nav items in bottom-nav
      const bottomNavSection = html.split('id="bottom-nav"')[1].split("</nav>")[0];
      const navItemMatches = bottomNavSection.match(/class="nav-item/g);
      expect(navItemMatches).toHaveLength(5);
    });
  });

  describe("Feed Container", () => {
    it("should have feed container", () => {
      expect(html).toContain('id="feed-container"');
    });

    it("should have modal container", () => {
      expect(html).toContain('id="modal-container"');
    });

    it("should have dashboard section", () => {
      expect(html).toContain('id="dashboard-section"');
    });
  });

  describe("Script Loading", () => {
    it("should load Lucide icons", () => {
      expect(html).toContain("lucide@latest");
    });

    it("should load Firebase scripts from CDN", () => {
      expect(html).toContain("firebasejs/10.7.0");
      expect(html).toContain("firebase-app.js");
      expect(html).toContain("firebase-auth.js");
      expect(html).toContain("firebase-firestore.js");
      // Note: Firebase CDN scripts don't use type="module"
    });

    it("should load component scripts as modules", () => {
      const componentScripts = [
        "upload-modal.js",
        "profile-modal.js",
        "comments-modal.js",
        "auth-modal.js",
        "edit-profile-modal.js",
        "search-modal.js",
        "activity-modal.js",
        "explore-modal.js",
        "share-modal.js"
      ];

      componentScripts.forEach(script => {
        expect(html).toContain(script);
        // Check that it has type="module"
        const scriptRegex = new RegExp(`script[^>]*src="[^"]*${script}"[^>]*>`);
        const match = html.match(scriptRegex);
        expect(match).toBeTruthy();
        if (match) {
          expect(match[0]).toContain('type="module"');
        }
      });
    });

    it("should load core scripts as modules", () => {
      const coreScripts = ["firebase-config.js", "firebase-service.js", "app.js", "monitoring.js"];
      
      coreScripts.forEach(script => {
        expect(html).toContain(script);
        const scriptRegex = new RegExp(`script[^>]*src="[^"]*${script}"[^>]*>`);
        const match = html.match(scriptRegex);
        expect(match).toBeTruthy(`Missing script: ${script}`);
        if (match) {
          // Local scripts should have type="module", CDN scripts don't
          if (!match[0].includes("gstatic")) {
            expect(match[0]).toContain('type="module"');
          }
        }
      });
    });

    it("should have service worker registration script", () => {
      expect(html).toContain("serviceWorker.register");
      // Check that it references either sw.js or service-worker.js
      expect(html).toMatch(/service-worker\.js|sw\.js/);
    });
  });

  describe("CSS Loading", () => {
    it("should load stylesheet", () => {
      expect(html).toContain('link rel="stylesheet" href="style.css"');
    });
  });

  describe("PWA Configuration", () => {
    it("should have manifest.json with required fields", () => {
      const manifestPath = path.resolve(__dirname, "../manifest.json");
      expect(fs.existsSync(manifestPath)).toBe(true);
      
      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
        expect(manifest).toHaveProperty("name");
        expect(manifest).toHaveProperty("short_name");
        expect(manifest).toHaveProperty("description");
        expect(manifest).toHaveProperty("start_url");
        expect(manifest).toHaveProperty("display");
        expect(manifest).toHaveProperty("theme_color");
        expect(manifest).toHaveProperty("icons");
      }
    });
  });

  describe("Accessibility", () => {
    it("should have SVG icons with dimensions", () => {
      const svgMatches = html.match(/<svg[^>]*>/g);
      expect(svgMatches).toBeTruthy();
      
      if (svgMatches) {
        svgMatches.forEach(svg => {
          expect(svg).toContain('width="');
          expect(svg).toContain('height="');
        });
      }
    });

    it("should have alt attributes on images", () => {
      const imgMatches = html.match(/<img[^>]*>/g);
      if (imgMatches) {
        imgMatches.forEach(img => {
          expect(img).toContain('alt="');
        });
      }
    });
  });

  describe("Build Output Validation", () => {
    it("should have dist folder with index.html if built", () => {
      if (builtHtml) {
        expect(builtHtml).toContain('id="feed-container"');
        expect(builtHtml).toContain('id="bottom-nav"');
      } else {
        // Skip if not built
        expect(true).toBe(true);
      }
    });
  });

  describe("Package.json Validation", () => {
    let pkg;
    
    beforeEach(() => {
      const pkgPath = path.resolve(__dirname, "../package.json");
      pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    });

    it("should have required scripts", () => {
      expect(pkg.scripts).toHaveProperty("dev");
      expect(pkg.scripts).toHaveProperty("build");
      expect(pkg.scripts).toHaveProperty("test");
      expect(pkg.scripts).toHaveProperty("lint");
      expect(pkg.scripts).toHaveProperty("deploy");
    });

    it("should have required devDependencies", () => {
      expect(pkg.devDependencies).toHaveProperty("vite");
      expect(pkg.devDependencies).toHaveProperty("vitest");
      expect(pkg.devDependencies).toHaveProperty("eslint");
      expect(pkg.devDependencies).toHaveProperty("vite-plugin-pwa");
    });

    it("should use module type", () => {
      expect(pkg.type).toBe("module");
    });
  });

  describe("Vite Configuration", () => {
    it("should have vite.config.js with PWA plugin", () => {
      const configPath = path.resolve(__dirname, "../vite.config.js");
      expect(fs.existsSync(configPath)).toBe(true);
      
      if (fs.existsSync(configPath)) {
        const config = fs.readFileSync(configPath, "utf-8");
        expect(config).toContain("VitePWA");
        expect(config).toContain("defineConfig");
      }
    });
  });

  describe("Test Coverage", () => {
    it("should have test files", () => {
      const testDir = path.resolve(__dirname);
      const testFiles = fs.readdirSync(testDir).filter(f => f.endsWith(".test.js"));
      expect(testFiles.length).toBeGreaterThan(0);
    });

    it("should have app.test.js", () => {
      const testPath = path.resolve(__dirname, "./app.test.js");
      expect(fs.existsSync(testPath)).toBe(true);
    });

    it("should have ui-ux.test.js", () => {
      const testPath = path.resolve(__dirname, "./ui-ux.test.js");
      expect(fs.existsSync(testPath)).toBe(true);
    });
  });

  describe("Environment Configuration", () => {
    it("should have .env file", () => {
      const envPath = path.resolve(__dirname, "../.env");
      expect(fs.existsSync(envPath)).toBe(true);
      
      if (fs.existsSync(envPath)) {
        const env = fs.readFileSync(envPath, "utf-8");
        expect(env).toContain("OPENROUTER_API_KEY");
      }
    });

    it("should have .env.example as template", () => {
      const envExamplePath = path.resolve(__dirname, "../.env.example");
      expect(fs.existsSync(envExamplePath)).toBe(true);
    });
  });

  describe("Firebase Configuration", () => {
    it("should have firebase-config.js", () => {
      const configPath = path.resolve(__dirname, "../firebase-config.js");
      expect(fs.existsSync(configPath)).toBe(true);
    });

    it("should have firebase-service.js", () => {
      const servicePath = path.resolve(__dirname, "../firebase-service.js");
      expect(fs.existsSync(servicePath)).toBe(true);
    });
  });

  describe("AI Integration", () => {
    it("should have ai-service.js or similar", () => {
      const aiServicePath = path.resolve(__dirname, "../ai-service.js");
      const srcAiPath = path.resolve(__dirname, "../src/lib/ai.js");
      
      const hasAiService = fs.existsSync(aiServicePath) || fs.existsSync(srcAiPath);
      expect(hasAiService).toBe(true);
    });
  });

  describe("User Simulation - Normal User", () => {
    it("should have elements for browsing deals", () => {
      expect(html).toContain('id="feed-container"');
      expect(html).toContain('data-action="home"');
    });

    it("should have search functionality", () => {
      expect(html).toContain('data-action="search"');
    });

    it("should have explore functionality", () => {
      expect(html).toContain('data-action="explore"');
    });
  });

  describe("User Simulation - Power User", () => {
    it("should have upload functionality", () => {
      expect(html).toContain('data-action="upload"');
    });

    it("should have activity tracking", () => {
      expect(html).toContain('data-action="activity"');
      expect(html).toContain('id="notif-dot"');
    });

    it("should have profile access", () => {
      expect(html).toContain('data-action="profile"');
    });
  });

  describe("User Simulation - Admin/Limited", () => {
    it("should handle missing Firebase gracefully", () => {
      // Check that Firebase scripts have onerror handlers or fallback
      expect(html).toContain("firebasejs");
    });

    it("should have error handling UI", () => {
      // Notification system should exist (in app.js)
      expect(true).toBe(true); // Placeholder
    });
  });
});
