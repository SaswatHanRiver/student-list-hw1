"use client";

import { SearchInput } from "@/components/search-input/search-input";
import { SelectFilter, type SelectOption } from "@/components/select-filter/select-filter";
import { GRADE_OPTIONS, STATUS_LABELS } from "@/constants/student-list";
import type { StudentStatus } from "@/types/student";

const GRADE_SELECT_OPTIONS: SelectOption[] = [
  { value: "", label: "All grades" },
  ...GRADE_OPTIONS.map((grade) => ({ value: String(grade), label: `Grade ${grade}` })),
];

const STATUS_SELECT_OPTIONS: SelectOption[] = [
  { value: "", label: "All statuses" },
  ...(Object.keys(STATUS_LABELS) as StudentStatus[]).map((status) => ({ value: status, label: STATUS_LABELS[status] })),
];

interface StudentFiltersProps {
  search: string;
  grade: string;
  status: string;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

// Search box + grade + status filters + Reset
// It holds no state itself: the parent screen owns the values (props down, events up)
export function StudentFilters(props: StudentFiltersProps) {
  return (
    <div className="student-filters">
      <div className="student-filters-search">
        <SearchInput
          id="student-search"
          label="Search"
          value={props.search}
          placeholder="Name, email or student ID"
          onChange={props.onSearchChange}
        />
      </div>

      <SelectFilter id="student-grade" label="Grade" value={props.grade} options={GRADE_SELECT_OPTIONS} onChange={props.onGradeChange} />

      <SelectFilter id="student-status" label="Status" value={props.status} options={STATUS_SELECT_OPTIONS} onChange={props.onStatusChange} />

      <button type="button" className="btn btn-text" onClick={props.onReset} disabled={!props.hasActiveFilters}>
        Reset
      </button>
    </div>
  );
}
