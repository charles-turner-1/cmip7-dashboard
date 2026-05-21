<template>
  <main class="mx-auto grid max-w-7xl gap-6 px-6 py-8">
    <section class="grid gap-3">
      <p class="text-sm font-semibold uppercase tracking-wide text-teal-700">
        Climate model intelligence
      </p>
      <h1 class="max-w-3xl text-4xl font-semibold text-slate-950">
        CMIP7 dashboard scaffold
      </h1>
      <p class="max-w-2xl text-base text-slate-600">
        A clean starting point wired with the same Vue, Vite, Tailwind,
        PrimeVue, Pinia, router, Vitest, and climate data dependencies as the
        DWER CSI Streamer app.
      </p>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article
        v-for="item in statusCards"
        :key="item.label"
        class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-sm font-medium text-slate-500">{{ item.label }}</p>
        <p class="mt-2 text-2xl font-semibold text-slate-950">
          {{ item.value }}
        </p>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
const statusCards = [
  { label: "Framework", value: "Vue 3" },
  { label: "Build Tool", value: "Vite 7" },
  { label: "UI Stack", value: "Tailwind + PrimeVue" },
];
</script>
