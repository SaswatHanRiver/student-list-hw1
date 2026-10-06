import { Suspense } from "react";
import { StudentListScreen } from "@/features/students/student-list-screen";

// URL: /students/list  ("(main)" is a route group, it does not appear in the URL)
// This is a server component. The screen inside is a client component
// ("use client") because it uses state and events.
// Suspense is required because the screen reads ?state= with useSearchParams.
export default function StudentListPage() {
  return (
    <Suspense>
      <StudentListScreen />
    </Suspense>
  );
}
