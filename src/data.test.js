import { describe, expect, it } from "vitest";
import { fieldData } from "./data.js";

const requiredFields = [
  "field",
  "category",
  "object",
  "type",
  "description",
  "quickbooks",
  "quickbooksParallel",
  "priority",
  "sourceOfTruth",
];

const allowedQuickBooksValues = new Set(["Yes", "Partial", "Maybe", "No", "N/A"]);
const allowedPriorities = new Set(["Phase 1", "Phase 2", "Phase 3"]);

describe("fieldData", () => {
  it("contains a usable field inventory", () => {
    expect(fieldData.length).toBeGreaterThanOrEqual(30);
  });

  it("has all required properties on every field", () => {
    for (const record of fieldData) {
      for (const key of requiredFields) {
        expect(record[key], `${record.field} is missing ${key}`).toBeTruthy();
      }
    }
  });

  it("uses only approved QuickBooks mapping values", () => {
    for (const record of fieldData) {
      expect(allowedQuickBooksValues.has(record.quickbooks), `${record.field} has invalid QuickBooks value`).toBe(true);
    }
  });

  it("uses only approved priority values", () => {
    for (const record of fieldData) {
      expect(allowedPriorities.has(record.priority), `${record.field} has invalid priority`).toBe(true);
    }
  });

  it("includes the expected core categories", () => {
    const categories = new Set(fieldData.map((record) => record.category));
    expect(categories.has("Identity")).toBe(true);
    expect(categories.has("Accounting")).toBe(true);
    expect(categories.has("Integration")).toBe(true);
  });
});
