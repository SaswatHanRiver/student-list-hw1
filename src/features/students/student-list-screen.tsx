"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeading } from "@/components/page-heading/page-heading";
import { Pagination } from "@/components/pagination/pagination";
import { StateBlock } from "@/components/state-block/state-block";
import { SEARCH_DEBOUNCE_MS, STUDENT_PAGE_SIZE } from "@/constants/student-list";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useMockStudentList } from "@/hooks/use-mock-student-list";
import { parseDemoState } from "@/utils/demo-state";
import type { StudentStatus } from "@/types/student";
import { StudentFilters } from "./student-filters";
import { StudentTable } from "./student-table";

// The Students list screen: owns the filter state, asks the hook for data,
// and decides which state to show (loading / error / empty / no results / filled).
export function StudentListScreen() {
  // ?state=loading|empty|error forces a state for review; default is "filled"
  const searchParams = useSearchParams();
  const demoState = parseDemoState(searchParams.get("state"));

  // Screen-only state (useState): what the user typed / picked
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [status, setStatus] = useState<StudentStatus | "">("");
  const [page, setPage] = useState(1);

  // Only search after the user stops typing
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);

  const { data, isLoading, isError, refetch } = useMockStudentList(
    { search: debouncedSearch, grade, status, page },
    demoState,
  );

  const hasActiveFilters = search !== "" || grade !== "" || status !== "";

  // Any filter change goes back to page 1
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleGradeChange = (value: string) => {
    setGrade(value);
    setPage(1);
  };
  const handleStatusChange = (value: string) => {
    setStatus(value as StudentStatus | "");
    setPage(1);
  };
  const handleReset = () => {
    setSearch("");
    setGrade("");
    setStatus("");
    setPage(1);
  };

  const students = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;

  // Decide what goes under the filter bar
  const renderBody = () => {
    // 1. Error
    if (isError) {
      return (
        <StateBlock
          variant="error"
          testId="state-error"
          title="Couldn't load students"
          message="The student list didn't load. Check your connection, then try again."
          action={
            <button type="button" className="btn btn-secondary" onClick={refetch}>
              Try again
            </button>
          }
        />
      );
    }

    // 2. Loading, or we have rows -> table (skeleton rows while loading)
    if (isLoading || students.length > 0) {
      return (
        <>
          <StudentTable students={students} isLoading={isLoading} skeletonRows={STUDENT_PAGE_SIZE} />
          {!isLoading && (
            <Pagination page={page} pageSize={STUDENT_PAGE_SIZE} totalCount={totalCount} onPageChange={setPage} />
          )}
        </>
      );
    }

    // 3. No rows because of filters -> "no results"
    if (hasActiveFilters) {
      return (
        <StateBlock
          testId="state-no-results"
          title="No students match these filters"
          message={debouncedSearch ? `Nothing found for "${debouncedSearch}". Check the spelling or clear the filters.` : "Try another grade or status, or clear the filters."}
          action={
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Clear filters
            </button>
          }
        />
      );
    }

    // 4. No rows at all -> empty
    return (
      <StateBlock
        testId="state-empty"
        title="No students yet"
        message="Students appear here once they are enrolled. Enrolment opens in the next release."
      />
    );
  };

  return (
    <main className="page-container">
      <PageHeading title="Students" description="Find a student by name, email or student ID, and filter by grade or status." />

      <section className="surface-card" aria-label="Student list">
        <StudentFilters
          search={search}
          grade={grade}
          status={status}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={handleSearchChange}
          onGradeChange={handleGradeChange}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />
        {renderBody()}
      </section>
    </main>
  );
}
