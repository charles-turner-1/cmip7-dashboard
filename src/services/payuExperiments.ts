/** Raw shape produced by the Payu experiment API / CLI output. */
export interface PayuExperimentRaw {
  experiment_name: string;
  experiment_uuid: string;
  experiment_model_start_time: string;
  experiment_model_current_time: string;
  /** Direct service-units figure; may be absent while a run is in progress. */
  experiment_service_units_used?: number | null;
  /** Fallback CPU-time value used when service units are not yet calculated. */
  experiment_resources_used_cput?: number | null;
  /** Any additional fields forwarded transparently to the UI. */
  [key: string]: unknown;
}

/** Normalised view model consumed by the accordion component. */
export interface PayuExperiment {
  name: string;
  uuid: string;
  modelStartTime: string;
  modelCurrentTime: string;
  serviceUnitsDisplay: string;
  /** All original key/value pairs for the expanded details panel. */
  details: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Normalisation helpers
// ---------------------------------------------------------------------------

/**
 * Produces a human-readable service-units string. Isolating this logic means
 * the calculation strategy can be updated in one place without touching the
 * component.
 */
export function formatServiceUnits(raw: PayuExperimentRaw): string {
  if (raw.experiment_service_units_used != null) {
    return String(raw.experiment_service_units_used);
  }
  if (raw.experiment_resources_used_cput != null) {
    return `${raw.experiment_resources_used_cput} (CPU-T)`;
  }
  return "—";
}

export function normalizePayuExperiment(
  raw: PayuExperimentRaw,
): PayuExperiment {
  return {
    name: raw.experiment_name,
    uuid: raw.experiment_uuid,
    modelStartTime: raw.experiment_model_start_time,
    modelCurrentTime: raw.experiment_model_current_time,
    serviceUnitsDisplay: formatServiceUnits(raw),
    details: { ...raw },
  };
}

// ---------------------------------------------------------------------------
// Static mock data (first iteration; replace with real fetch when ready)
// ---------------------------------------------------------------------------

const MOCK_PAYU_EXPERIMENTS: PayuExperimentRaw[] = [
  {
    experiment_name: "Ndep2-PI-CNP-concentrations",
    experiment_uuid: "e523e199-80f6-4ca6-b84a-e513a16f2029",
    experiment_model_start_time: "0101-01-01T00:00:00",
    experiment_model_current_time: "0275-01-01T00:00:00",
    experiment_service_units_used: 1,
  },
  {
    experiment_name: "historical-1pctCO2-nudged",
    experiment_uuid: "a1b2c3d4-1234-5678-abcd-ef0123456789",
    experiment_model_start_time: "1850-01-01T00:00:00",
    experiment_model_current_time: "1920-06-01T00:00:00",
    experiment_service_units_used: null,
    experiment_resources_used_cput: 342.5,
  },
  {
    experiment_name: "piControl-spun-up",
    experiment_uuid: "f9e8d7c6-fedc-ba98-7654-321012345678",
    experiment_model_start_time: "0001-01-01T00:00:00",
    experiment_model_current_time: "0050-01-01T00:00:00",
    experiment_service_units_used: 0,
  },
];

// ---------------------------------------------------------------------------
// Loader (async interface preserved for future API migration)
// ---------------------------------------------------------------------------

export async function loadPayuExperiments(): Promise<PayuExperiment[]> {
  return MOCK_PAYU_EXPERIMENTS.map(normalizePayuExperiment);
}
