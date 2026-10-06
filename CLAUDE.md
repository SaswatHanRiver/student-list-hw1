# Riverside Academy Admin — Frontend (AI Frontend Training, Homework 1)

An admin screen for a school office: staff look up students by name, email or
student ID and filter them by grade and status. Homework 1 uses mock data only;
Homework 2 connects the same screen to a Spring Boot CRUD API.

Stack: Next.js 15 (App Router) · React 19 · TypeScript (strict) · SCSS · Playwright
Backend API: none yet (HW2 will add `NEXT_PUBLIC_API_BASE_URL`)

## Commands
npm run dev              # start the app on localhost:3000 (opens /students/list)
npx tsc --noEmit         # type-check — run after every change
npm run lint             # ESLint
npm run check            # type-check + lint together
npm run build            # production build
npm run test:e2e         # Playwright behaviour tests (list, search, filter, paging, error retry)
npm run qa:responsive    # 10 WM widths x 4 states: no sideways scroll, tap sizes, screenshots/

## Folders
src/app/(main)/students/list/page.tsx   the list page (route group "(main)" is not in the URL)
src/features/students/                  screen-specific components (screen, table, filters, attendance bar)
src/components/                         reusable UI (page heading, state block, skeleton, pagination, status tag, inputs)
src/hooks/                              hooks (mock data hook, debounce)
src/mocks/                              mock data (HW1 only)
src/types/                              TypeScript types
src/constants/                          page size, thresholds, labels, demo states
src/utils/                              formatters (WM date format)
src/styles/                             SCSS, WM file names (_variables, _theme, _mixins, _component, ...)
e2e/                                    Playwright tests
docs/                                   plan, design check, code walkthrough

## Rules
- Follow the style of the file you are editing.
- Reuse components in src/components before making new ones.
- Class names: lowercase-with-hyphens (`student-table-id`), never camelCase or snake_case.
  Use global SCSS classes, not CSS-module camelCase names.
- No hardcoded colours or sizes in components or page SCSS. Colours, spacing, sizes and
  breakpoints come from src/styles/_variables.scss. 1px borders use $border-width.
- Colour variables are named colour + code (`$red-b1`). Every light colour has one dark
  colour with the same name in _theme.scss.
- Media queries use the WM breakpoints via `@include below($bp-768)` etc.
- Dates use the WM English format "May 1, 2016" (utils/format-date.ts).
- Every list screen shows loading, empty, no-results, error and filled states.
  `?state=loading|empty|error` forces a state for review.
- Comment every main block (WM HTML guideline).
- Company rules are in WM (Notion). Fetch them, don't guess.
