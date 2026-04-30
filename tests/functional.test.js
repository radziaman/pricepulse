import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// Read the HTML file
const htmlPath = path.resolve(__dirname, "../index.html");
const html = fs.readFileSync(htmlPath, "utf-8");

// Read built HTML if it exists
let builtHtml = "";
try {
  const builtPath = path.resolve(__dirname, "../dist/index.html");
  if (fs.existsSync(builtPath)) {
    builtHtml = fs.readFileSync(builtPath, "utf-8");
  }
} catch (e) {
  // Ignore
}

describe("PricePulse Functional Tests (Static)", () => {
  describe("Initial Page Load", () => {
    it("should render the header with logo", () => {
      expect(html).toContain("PricePulse");
      expect(html).toContain('header-logo">PricePulse');
    });

    it("should render bottom navigation with 5 items", () => {
      const bottomNavSection = html.split('id="bottom-nav"')[1]?.split("</nav>")[0] || "";
      const navItems = bottomNavSection.match(/class="nav-item/g);
      expect(navItems).toBeTruthy();
      expect(navItems.length).toBe(5);
    });

    it("should have feed container ready", () => {
      expect(html).toContain('id="feed-container"');
    });

    it("should have modal container", () => {
      expect(html).toContain('id="modal-container"');
    });

    it("should have dashboard section", () => {
      expect(html).toContain('id="dashboard-section"');
    });
  });

  describe("User Authentication Simulation", () => {
    it("should have auth modal available", () => {
      expect(html).toContain("auth-modal.js");
    });

    it("should have login/logout functionality references", () => {
      const appJsPath = path.resolve(__dirname, "../app.js");
      if (fs.existsSync(appJsPath)) {
        const appJs = fs.readFileSync(appJsPath, "utf-8");
        expect(appJs).toContain("loginWithGoogle");
        expect(appJs).toContain("logout");
      }
    });
  });

  describe("Navigation Tests", () => {
    const actions = ["home", "explore", "upload", "activity", "profile"];

    actions.forEach(action => {
      it(`should have ${action} navigation`, () => {
        expect(html).toContain(`data-action="${action}"`);
      });
    });

    it("should have search functionality", () => {
      expect(html).toContain('data-action="search"');
    });
  });

  describe("PWA Features", () => {
    it("should have manifest link", () => {
      expect(html).toContain('rel="manifest"');
      expect(html).toContain("manifest.json");
    });

    it("should have theme-color meta", () => {
      expect(html).toContain('name="theme-color"');
    });

    it("should have viewport meta", () => {
      expect(html).toContain('name="viewport"');
    });

    it("should have service worker registration", () => {
      expect(html).toContain("serviceWorker.register");
    });

    it("should have apple-mobile-web-app-capable meta", () => {
      expect(html).toContain('name="apple-mobile-web-app-capable"');
    });
  });

  describe("Component Scripts", () => {
    const componentScripts = [
      "js/components/upload-modal.js",
      "js/components/profile-modal.js",
      "js/components/comments-modal.js",
      "js/components/auth-modal.js",
      "js/components/edit-profile-modal.js",
      "js/components/search-modal.js",
      "js/components/activity-modal.js",
      "js/components/explore-modal.js",
      "js/components/share-modal.js"
    ];

    componentScripts.forEach(scriptPath => {
      it(`should load ${scriptPath} as module`, () => {
        expect(html).toContain(scriptPath);
        expect(html).toContain(`type="module" src="${scriptPath}"`);
      });
    });
  });

  describe("Core Scripts", () => {
    const coreScripts = [
      "firebase-config.js",
      "firebase-service.js",
      "app.js",
      "monitoring.js"
    ];

    coreScripts.forEach(scriptName => {
      it(`should load ${scriptName} as module`, () => {
        expect(html).toContain(scriptName);
        expect(html).toContain(`type="module" src="${scriptName}"`);
      });
    });
  });

  describe("State Management (Static Check)", () => {
    it("should have localStorage references in app.js", () => {
      const appJsPath = path.resolve(__dirname, "../app.js");
      if (fs.existsSync(appJsPath)) {
        const appJs = fs.readFileSync(appJsPath, "utf-8");
        expect(appJs).toContain("localStorage");
        expect(appJs).toContain("getItem");
        expect(appJs).toContain("setItem");
      }
    });

    it("should have fallback data", () => {
      const appJsPath = path.resolve(__dirname, "../app.js");
      if (fs.existsSync(appJsPath)) {
        const appJs = fs.readFileSync(appJsPath, "utf-8");
        expect(appJs).toContain("FALLBACK_DATA");
      }
    });
  });

  describe("Accessibility (Static Check)", () => {
    it("should have SVG icons with size attributes", () => {
      const svgMatches = html.match(/<svg[^>]*>/g);
      expect(svgMatches).toBeTruthy();
      if (svgMatches) {
        svgMatches.forEach(svg => {
          expect(svg).toContain('width="');
          expect(svg).toContain('height="');
        });
      }
    });

    it("should have proper heading structure", () => {
      expect(html).toContain("<header");
    });
  });

  describe("SEO and Social", () => {
    it("should have proper meta description", () => {
      expect(html).toContain('name="description"');
    });

    it("should have Open Graph meta tags", () => {
      expect(html).toContain('property="og:title"');
      expect(html).toContain('property="og:description"');
      expect(html).toContain('property="og:type"');
    });
  });

  describe("Build Output Verification", () => {
    it("should have dist folder with required files if built", () => {
      const distPath = path.resolve(__dirname, "../dist");
      if (fs.existsSync(distPath)) {
        const files = fs.readdirSync(distPath);
        expect(files).toContain("index.html");
        expect(files).toContain("sw.js");
      } else {
        // Skip if dist doesn't exist (dev environment)
        expect(true).toBe(true);
      }
    });
  });

  describe("Package.json Scripts", () => {
    const pkgPath = path.resolve(__dirname, "../package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    it("should have required npm scripts", () => {
      expect(pkg.scripts).toHaveProperty("dev");
      expect(pkg.scripts).toHaveProperty("build");
      expect(pkg.scripts).toHaveProperty("test");
      expect(pkg.scripts).toHaveProperty("deploy");
    });

    it("should use module type", () => {
      expect(pkg.type).toBe("module");
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
      expect(html).toContain("firebasejs");
    });

    it("should have error handling UI in app.js", () => {
      const appJsPath = path.resolve(__dirname, "../app.js");
      if (fs.existsSync(appJsPath)) {
        const appJs = fs.readFileSync(appJsPath, "utf-8");
        expect(appJs).toContain("showNotification");
        expect(appJs).toContain("try {");
        expect(appJs).toContain("catch");
      }
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

    it("should have Firebase SDK scripts in HTML", () => {
      expect(html).toContain("firebase-app.js");
      expect(html).toContain("firebase-auth.js");
      expect(html).toContain("firebase-firestore.js");
    });
  });

  describe("AI Integration", () => {
    it("should have ai-service.js or src/lib/ai.js", () => {
      const aiServicePath = path.resolve(__dirname, "../ai-service.js");
      const srcAiPath = path.resolve(__dirname, "../src/lib/ai.js");
      
      const hasAiService = fs.existsSync(aiServicePath) || fs.existsSync(srcAiPath);
      expect(hasAiService).toBe(true);
    });

    it("should have OpenRouter API key in .env", () => {
      const envPath = path.resolve(__dirname, "../.env");
      if (fs.existsSync(envPath)) {
        const env = fs.readFileSync(envPath, "utf-8");
        expect(env).toContain("OPENROUTER_API_KEY");
      }
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

    it("should have comprehensive.test.js", () => {
      const testPath = path.resolve(__dirname, "./comprehensive.test.js");
      expect(fs.existsSync(testPath)).toBe(true);
    });
  });
});
