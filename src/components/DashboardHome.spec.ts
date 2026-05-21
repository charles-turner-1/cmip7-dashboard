import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DashboardHome from "./DashboardHome.vue";

describe("DashboardHome", () => {
  it("renders the starter dashboard", () => {
    const wrapper = mount(DashboardHome);

    expect(wrapper.text()).toContain("CMIP7 dashboard scaffold");
    expect(wrapper.text()).toContain("Vue 3");
    expect(wrapper.text()).toContain("Vite 7");
  });
});
