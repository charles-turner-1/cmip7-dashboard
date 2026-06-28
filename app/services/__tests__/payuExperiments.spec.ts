import { describe, expect, it } from "vitest";
import {
  formatServiceUnits,
  loadPayuExperiments,
  normalizePayuExperiment,
} from "../payuExperiments";
import type { PayuExperimentRaw } from "../payuExperiments";

const BASE_RAW: PayuExperimentRaw = {
  experiment_name: "test-run",
  experiment_uuid: "abc-123",
  experiment_model_start_time: "0101-01-01T00:00:00",
  experiment_model_current_time: "0275-01-01T00:00:00",
  experiment_service_units_used: 42,
};

describe("formatServiceUnits", () => {
  it("uses experiment_service_units_used when present", () => {
    expect(
      formatServiceUnits({ ...BASE_RAW, experiment_service_units_used: 7 }),
    ).toBe("7");
  });

  it("uses experiment_resources_used_cput when service units are null", () => {
    expect(
      formatServiceUnits({
        ...BASE_RAW,
        experiment_service_units_used: null,
        experiment_resources_used_cput: 99.5,
      }),
    ).toBe("99.5 (CPU-T)");
  });

  it("returns an em-dash when both fields are absent", () => {
    const raw: PayuExperimentRaw = {
      experiment_name: "x",
      experiment_uuid: "y",
      experiment_model_start_time: "0001-01-01T00:00:00",
      experiment_model_current_time: "0002-01-01T00:00:00",
    };
    expect(formatServiceUnits(raw)).toBe("—");
  });
});

describe("normalizePayuExperiment", () => {
  it("maps raw fields to the normalised view model", () => {
    const result = normalizePayuExperiment(BASE_RAW);

    expect(result.name).toBe("test-run");
    expect(result.uuid).toBe("abc-123");
    expect(result.modelStartTime).toBe("0101-01-01T00:00:00");
    expect(result.modelCurrentTime).toBe("0275-01-01T00:00:00");
    expect(result.serviceUnitsDisplay).toBe("42");
  });

  it("includes all raw fields in details for forward compatibility", () => {
    const raw: PayuExperimentRaw = {
      ...BASE_RAW,
      some_future_field: "value",
    };
    const result = normalizePayuExperiment(raw);

    expect(result.details).toMatchObject({ some_future_field: "value" });
  });

  it("details is a copy and does not share a reference with the raw object", () => {
    const raw = { ...BASE_RAW };
    const result = normalizePayuExperiment(raw);

    raw.experiment_name = "mutated";
    expect(result.details["experiment_name"]).toBe("test-run");
  });
});

describe("loadPayuExperiments", () => {
  it("returns a non-empty array of normalised experiments", async () => {
    const experiments = await loadPayuExperiments();

    expect(experiments.length).toBeGreaterThan(0);
  });

  it("returns experiments with the expected normalised shape", async () => {
    const [first] = await loadPayuExperiments();

    expect(first).toHaveProperty("name");
    expect(first).toHaveProperty("uuid");
    expect(first).toHaveProperty("modelStartTime");
    expect(first).toHaveProperty("modelCurrentTime");
    expect(first).toHaveProperty("serviceUnitsDisplay");
    expect(first).toHaveProperty("details");
  });
});
