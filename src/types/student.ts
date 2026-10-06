// Shape of one student row.
// In HW2 this must match the JSON returned by the real Spring Boot API.
export type StudentStatus = "ACTIVE" | "ON_LEAVE" | "GRADUATED";

export interface Student {
  id: string;
  studentCode: string; // e.g. "STU-2026-001"
  fullName: string;
  email: string;
  grade: number; // 6 to 10
  joinedOn: string; // ISO date "YYYY-MM-DD", formatted on screen
  attendancePercent: number; // 0 to 100
  status: StudentStatus;
}

// Filters the user can change on the list screen
export interface StudentListFilters {
  search: string;
  grade: string; // "" = all grades
  status: StudentStatus | ""; // "" = all statuses
  page: number; // 1-based
}

// One page of results — same shape a paged API would return
export interface StudentListPage {
  items: Student[];
  totalCount: number;
  page: number;
  pageSize: number;
}
