import { DEMO_STATES, type DemoState } from "@/constants/student-list";

// Turns the ?state= query value into a known demo state (default "filled")
export function parseDemoState(value: string | null): DemoState {
  return DEMO_STATES.find((state) => state === value) ?? "filled";
}
