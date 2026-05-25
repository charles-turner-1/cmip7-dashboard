<template>
  <section
    class="mx-auto mb-12 max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-sm"
    aria-label="Payu experiment runs"
  >
    <div class="border-b border-gray-100 px-5 py-4">
      <h2 class="text-sm font-semibold uppercase text-gray-700">
        Experiment runs
      </h2>
    </div>

    <!-- Loading state -->
    <div
      v-if="loading"
      data-test="payu-loading"
      class="px-5 py-8 text-center text-sm text-gray-400"
    >
      Loading experiments…
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      data-test="payu-error"
      class="px-5 py-6 text-sm text-red-600"
    >
      {{ error }}
    </div>

    <!-- Empty state -->
    <div
      v-else-if="experiments.length === 0"
      data-test="payu-empty"
      class="px-5 py-8 text-center text-sm text-gray-400"
    >
      {{ emptyMessage }}
    </div>

    <!-- Accordion list -->
    <Accordion
      v-else
      v-model:value="openPanels"
      multiple
      data-test="payu-accordion"
    >
      <AccordionPanel
        v-for="experiment in experiments"
        :key="experiment.uuid"
        :value="experiment.uuid"
        data-test="accordion-item"
      >
        <AccordionHeader data-test="accordion-trigger">
          <div class="flex min-w-0 flex-1 items-center gap-4">
            <span
              class="min-w-0 flex-1 truncate text-sm font-medium text-gray-800"
            >
              {{ experiment.name }}
            </span>
            <span class="shrink-0 text-xs text-gray-400">
              {{ experiment.modelCurrentTime }}
            </span>
            <span
              class="shrink-0 rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
            >
              {{ experiment.serviceUnitsDisplay }} SU
            </span>
          </div>
        </AccordionHeader>

        <AccordionContent data-test="accordion-content">
          <dl class="grid grid-cols-1 gap-y-2 px-1 py-2 sm:grid-cols-2">
            <template
              v-for="[key, value] in Object.entries(experiment.details)"
              :key="key"
            >
              <div class="min-w-0">
                <dt class="text-xs font-semibold uppercase text-gray-400">
                  {{ formatKey(key) }}
                </dt>
                <dd class="mt-0.5 break-all text-sm text-gray-700">
                  {{ formatValue(value) }}
                </dd>
              </div>
            </template>
          </dl>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import type { PayuExperiment } from "@/services/payuExperiments";

const props = withDefaults(
  defineProps<{
    experiments: PayuExperiment[];
    loading?: boolean;
    error?: string | null;
    emptyMessage?: string;
  }>(),
  {
    loading: false,
    error: null,
    emptyMessage: "No experiment runs found.",
  },
);

// Track open panel UUIDs; multiple open at once is always allowed.
const openPanels = ref<string[]>([]);

// Expose for testing
defineExpose({ openPanels });

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function formatKey(key: string): string {
  return key.replaceAll("_", " ");
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  return String(value);
}
</script>
