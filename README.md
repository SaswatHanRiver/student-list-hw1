# Students list — AI Frontend Training, Homework 1

**Author:** Saswat Kumar Sahoo (Backend, Java)
**What it is:** one list screen ("Students") for a school admin, built with mock data,
working from 1920px down to 375px, with loading, empty, no-results, error and filled states.

## What I built
- Students list at `/students/list`: search (name, email, student ID), grade filter,
  status filter, Reset, 10 rows per page with pagination.
- Columns: Student ID, Name + email, Grade, Joined on (WM date format), Attendance (% + bar), Status tag.
- Responsive: full table above 768px; at 768px and below every row becomes a card with labels.
  The page never scrolls sideways (checked automatically at all 10 WM widths).
- States: loading skeleton, empty ("No students yet"), no results (with Clear filters),
  error (with Try again, which recovers), filled.
- All colours, sizes and breakpoints are SCSS variables with WM naming; light and dark mode.

## How to run it
```bash
# Node 20+
npm install
npm run dev                         # http://localhost:3000  -> /students/list

# Force a state for review
#   http://localhost:3000/students/list?state=loading
#   http://localhost:3000/students/list?state=empty
#   http://localhost:3000/students/list?state=error   (Try again then loads the data)

npm run check                       # type-check + lint
npm run build                       # production build
npx playwright install chromium     # once
npm run test:e2e                    # behaviour tests
npm run qa:responsive               # 10 widths x 4 states -> screenshots/
```

## Docs
- `docs/PLAN.md` — the plan written before the code
- `docs/DESIGN-CHECK.md` — the design (spec) and the WM design-check questions
- `docs/CODE-WALKTHROUGH.md` — every file explained: components, props, state

## Prompts and skills used
See my Notion homework page (section 4) for the exact prompts.

## One problem I hit
At 768px the table squeezed its columns, so "Grade 8", dates and emails broke across lines
in the middle of words (`ananya.ghosh@ex` / `ample.com`). Found it in the 768 screenshot from
`npm run qa:responsive`. Fix: cells no longer wrap, and from 768px down the table switches to
the card layout. Re-ran the 40 responsive tests: all pass.
