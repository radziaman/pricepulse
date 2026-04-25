import { describe, it, expect, beforeEach } from "vitest";

const DATA = [
  { id: 1, user: "FoodieKing", name: "The Umami Burger", price: 18.5, loc: "Orchard Road", lat: 1.3048, lng: 103.8318, homePrice: 19.2 },
  { id: 2, user: "TechWiz", name: "MacBook Pro M3", price: 3299, loc: "City Hall", lat: 1.2931, lng: 103.8522, homePrice: 3499 },
  { id: 3, user: "StyleIcon", name: "Elite Watch", price: 1250, loc: "Marina Bay", lat: 1.2823, lng: 103.8584, homePrice: 1350 }
];

let state = {
  finds: [...DATA],
  userCoords: null,
  currentTab: "deals"
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function sortFeedByProximity() {
  if (!state.userCoords) return;
  state.finds.sort((a, b) =>
    calculateDistance(state.userCoords.lat, state.userCoords.lng, a.lat, a.lng) -
    calculateDistance(state.userCoords.lat, state.userCoords.lng, b.lat, b.lng)
  );
}

describe("calculateDistance", () => {
  it("returns 0 for same coordinates", () => {
    const result = calculateDistance(1.3521, 103.8198, 1.3521, 103.8198);
    expect(result).toBe(0);
  });

  it("calculates approximate distance between Orchard Road and City Hall", () => {
    const result = calculateDistance(1.3048, 103.8318, 1.2931, 103.8522);
    expect(result).toBeGreaterThan(1);
    expect(result).toBeLessThan(3);
  });

  it("calculates Singapore to Johor Bahru distance (~20km)", () => {
    const result = calculateDistance(1.3521, 103.8198, 1.5296, 103.8458);
    expect(result).toBeGreaterThan(15);
    expect(result).toBeLessThan(30);
  });
});

describe("sortFeedByProximity", () => {
  beforeEach(() => {
    state.finds = [...DATA];
    state.userCoords = null;
  });

  it("does not sort when userCoords is null", () => {
    state.finds = [...DATA];
    sortFeedByProximity();
    expect(state.finds[0].id).toBe(1);
  });

  it("sorts finds by distance from user location", () => {
    state.finds = [...DATA];
    state.userCoords = { lat: 1.3, lng: 103.84 };
    sortFeedByProximity();
    expect(state.finds[0].loc).toBe("Orchard Road");
  });
});

describe("state management", () => {
  beforeEach(() => {
    state = {
      finds: [...DATA],
      userCoords: null,
      currentTab: "deals"
    };
  });

  it("initializes with default values", () => {
    expect(state.finds.length).toBe(3);
    expect(state.currentTab).toBe("deals");
    expect(state.userCoords).toBeNull();
  });

  it("filters finds by price range", () => {
    const affordable = state.finds.filter((f) => f.price < 1000);
    expect(affordable.length).toBe(1);
    expect(affordable[0].name).toBe("The Umami Burger");
  });

  it("calculates savings between price and homePrice", () => {
    const item = state.finds[0];
    const savings = item.homePrice - item.price;
    expect(savings).toBeCloseTo(0.7, 1);
  });
});