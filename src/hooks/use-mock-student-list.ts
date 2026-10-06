"use client";

import { useCallback, useEffect, useState } from "react";
import { MOCK_STUDENTS } from "@/mocks/students";
import { MOCK_LOADING_DELAY_MS, STUDENT_PAGE_SIZE, type DemoState } from "@/constants/student-list";
import type { Student, StudentListFilters, StudentListPage } from "@/types/student";

interface MockStudentListResult {
  data: StudentListPage | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

// Filter + page the mock array, the same way the backend will do it in HW2
function queryMockStudents(students: Student[], filters: StudentListFilters): StudentListPage {
  const search = filters.search.trim().toLowerCase();

  const matches = students.filter((student) => {
    const matchesSearch =
      search === "" ||
      student.fullName.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search) ||
      student.studentCode.toLowerCase().includes(search);
    const matchesGrade = filters.grade === "" || String(student.grade) === filters.grade;
    const matchesStatus = filters.status === "" || student.status === filters.status;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const start = (filters.page - 1) * STUDENT_PAGE_SIZE;
  return {
    items: matches.slice(start, start + STUDENT_PAGE_SIZE),
    totalCount: matches.length,
    page: filters.page,
    pageSize: STUDENT_PAGE_SIZE,
  };
}

/**
 * Mock data hook for the Students list.
 * Returns { data, isLoading, isError, refetch } — the same shape a
 * TanStack Query hook returns, so in HW2 only this file is swapped
 * for a real useGetStudentList hook and the screen stays the same.
 *
 * demoState lets the reviewer force a state with ?state=loading|empty|error.
 */
export function useMockStudentList(filters: StudentListFilters, demoState: DemoState): MockStudentListResult {
  const [data, setData] = useState<StudentListPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const { search, grade, status, page } = filters;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    // "loading" demo: stay in loading forever
    if (demoState === "loading") {
      return;
    }

    // Fake network delay. The cleanup cancels it if filters change first,
    // so an old slow answer can never overwrite a newer one.
    const timer = setTimeout(() => {
      // "error" demo: fail the first load; "Try again" (reloadKey > 0) then succeeds, to show recovery
      if (demoState === "error" && reloadKey === 0) {
        setData(null);
        setIsError(true);
      } else {
        const source = demoState === "empty" ? [] : MOCK_STUDENTS;
        setData(queryMockStudents(source, { search, grade, status, page }));
      }
      setIsLoading(false);
    }, MOCK_LOADING_DELAY_MS);

    return () => clearTimeout(timer);
  }, [search, grade, status, page, demoState, reloadKey]);

  // "Try again" button calls this to run the effect again
  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { data, isLoading, isError, refetch };
}
