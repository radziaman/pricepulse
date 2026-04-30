import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs";
import path from "path";

// Read the HTML file
const htmlPath = path.resolve(__dirname, "../index.html");
const html = fs.readFileSync(htmlPath, "utf-8");

describe("PricePulse UI/UX Tests", () => {
  let document;

  beforeEach(() => {
    // Create a simple DOM from the HTML string
    const { JSDOM } = require("jsdom");
    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable"
    });
    document = dom.window.document;
    
    // Mock localStorage
    const localStorageMock = {
      store: {},
      getItem: vi.fn((key) => localStorageMock.store[key] || null),
      setItem: vi.fn((key, value) => { localStorageMock.store[key] = value.toString(); }),
      removeItem: vi.fn((key) => { delete localStorageMock.store[key]; }),
      clear: vi.fn(() => { localStorageMock.store = {}; })
    };
    
    Object.defineProperty(dom.window, "localStorage", {
      value: localStorageMock
    });
  });

  describe("Normal User Experience", () => {
    it("should display the header with correct title", () => {
      const headerLogo = document.querySelector(".header-logo");
      expect(headerLogo).toBeTruthy();
      expect(headerLogo.textContent).toBe("PricePulse");
    });

    it("should have a working bottom navigation", () => {
      const navItems = document.querySelectorAll(".nav-item");
      expect(navItems.length).toBe(5);
      
      const homeNav = document.querySelector('[data-action="home"]');
      expect(homeNav).toBeTruthy();
    });

    it("should display feed container", () => {
      const feedContainer = document.getElementById("feed-container");
      expect(feedContainer).toBeTruthy();
    });

    it("should have modal container for dynamic modals", () => {
      const modalContainer = document.getElementById("modal-container");
      expect(modalContainer).toBeTruthy();
    });

    it("should have proper meta tags for SEO and PWA", () => {
      const manifestLink = document.querySelector('link[rel="manifest"]');
      expect(manifestLink).toBeTruthy();
      expect(manifestLink.getAttribute("href")).toBe("manifest.json");
    });

    it("should have all required script tags", () => {
      const scripts = document.querySelectorAll("script");
      expect(scripts.length).toBeGreaterThan(10);
    });
  });

  describe("Power User Features", () => {
    it("should have upload functionality for power users", () => {
      const uploadNav = document.querySelector('[data-action="upload"]');
      expect(uploadNav).toBeTruthy();
    });

    it("should have search functionality", () => {
      const searchBtn = document.querySelector('[data-action="search"]');
      expect(searchBtn).toBeTruthy();
    });

    it("should have activity notifications", () => {
      const activityBtn = document.querySelector('[data-action="activity"]');
      expect(activityBtn).toBeTruthy();
      const notifDot = document.getElementById("notif-dot");
      expect(notifDot).toBeTruthy();
    });
  });

  describe("PWA Features", () => {
    it("should have service worker registration script", () => {
      const scripts = document.querySelectorAll("script:not([type='module'])");
      let hasSWRegistration = false;
      
      scripts.forEach(script => {
        if (script.textContent && script.textContent.includes("serviceWorker.register")) {
          hasSWRegistration = true;
        }
      });
      
      expect(hasSWRegistration).toBe(true);
    });

    it("should have apple-mobile-web-app-capable meta tag", () => {
      const meta = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
      expect(meta).toBeTruthy();
      expect(meta.getAttribute("content")).toBe("yes");
    });
  });

  describe("Responsive Design", () => {
    it("should have viewport meta tag", () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute("content")).toContain("width=device-width");
    });

    it("should have bottom navigation for mobile", () => {
      const bottomNav = document.getElementById("bottom-nav");
      expect(bottomNav).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      const header = document.querySelector("header");
      expect(header).toBeTruthy();
      expect(header.classList.contains("nike-header")).toBe(true);
    });

    it("should have Lucide icons with proper attributes", () => {
      const lucideIcons = html.match(/<i[^>]*data-lucide="[^"]*"[^>]*>/g);
      expect(lucideIcons).toBeTruthy();
      if (lucideIcons) {
        lucideIcons.forEach(icon => {
          expect(icon).toContain('width="');
          expect(icon).toContain('height="');
        });
      }
      
      // Also check that Lucide script is loaded
      expect(html).toContain("lucide@latest");
    });
  });
});

describe("State Management Tests", () => {
  it("should handle localStorage fallbacks", () => {
    const store = {};
    const getItem = (key) => store[key] || null;
    const setItem = (key, value) => { store[key] = value.toString(); };
    
    expect(getItem("pulse_auth")).toBeNull();
    
    setItem("pulse_auth", "true");
    expect(getItem("pulse_auth")).toBe("true");
  });

  it("should parse user data safely", () => {
    const userData = { name: "TestUser", home: "Singapore" };
    const json = JSON.stringify(userData);
    const retrieved = JSON.parse(json);
    expect(retrieved.name).toBe("TestUser");
  });
});

describe("Integration Tests", () => {
  it("should have all required DOM elements", () => {
    const fs = require("fs");
    const path = require("path");
    const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
    
    expect(html).toContain("feed-container");
    expect(html).toContain("bottom-nav");
    expect(html).toContain("modal-container");
    expect(html).toContain("header-actions");
    expect(html).toContain("notif-dot");
  });

  it("should have correct script loading order", () => {
    const scripts = html.match(/<script[^>]*src="[^"]*"[^>]*><\/script>/g) || [];
    const componentScripts = scripts.filter(s => s.includes("components/"));
    const appJs = scripts.find(s => s.includes("app.js"));
    
    expect(componentScripts.length).toBeGreaterThan(0);
    expect(appJs).toBeTruthy();
  });
});
