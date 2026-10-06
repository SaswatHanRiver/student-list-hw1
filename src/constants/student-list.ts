import type { StudentStatus } from "@/types/student";

// Rows per page in the table
export const STUDENT_PAGE_SIZE = 10;

// Fake network delay for the mock hook, so the loading state is visible
export const MOCK_LOADING_DELAY_MS = 600;

// Wait this long after the user stops typing before searching
export const SEARCH_DEBOUNCE_MS = 300;

// Attendance thresholds that decide the bar colour
export const ATTENDANCE_GOOD_MIN = 90;
export const ATTENDANCE_FAIR_MIN = 75;

export const GRADE_OPTIONS = [6, 7, 8, 9, 10];

export const STATUS_LABELS: Record<StudentStatus, string> = {
  ACTIVE: "Active",
  ON_LEAVE: "On leave",
  GRADUATED: "Graduated",
};

// Demo states the reviewer can force with ?state=... in the URL
export const DEMO_STATES = ["filled", "loading", "empty", "error"] as const;
export type DemoState = (typeof DEMO_STATES)[number];
