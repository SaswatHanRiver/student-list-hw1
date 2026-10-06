# Draft for my Notion homework page (HW1) — fill the [brackets], then paste

## 1. What I built
- **Screen:** Riverside Academy Admin -> **Students** list (`/students/list`): search by name / email / student ID, grade and status filters, Reset, 10 rows per page with pagination, attendance % with a coloured bar, status tags. Mock data (24 students). States: loading skeleton, empty, no results (Clear filters), error (Try again, recovers), filled. `?state=loading|empty|error` pins each state. Light and dark mode.
- **Design:** designed myself; spec + reference renders in `docs/DESIGN-CHECK.md` and `screenshots/filled/filled-1920.png`, `filled-375.png`. Plan written before code: `docs/PLAN.md`.
- **Design-check questions I wrote down** (full checklist in `docs/DESIGN-CHECK.md`):
  - Is a 10-row page right, or should staff pick 10 / 25 / 50?
  - Should search also match guardian name or phone?
  - Attendance colour thresholds 90 / 75 — the school's real rules?
  - At 768px and below the table becomes cards — OK, or a sideways-scrolling table?
  - Hide "Graduated" students by default?
  - Any required sort order?
  - Which browsers must be supported?
  - Dark mode follows the system — manual toggle needed?
  - Date format: I used "May 1, 2016" (WM English) — confirm?

## 2. Links
- **Demo link:** [Vercel URL]  (or: live demo on the review call)
- **Repo / branch:** [https://github.com/SaswatHanRiver/<repo>] — branch `main`
- **Screenshots at WM widths:** `npm run qa:responsive` writes `screenshots/` — 10 widths x 4 states (filled, loading, empty, error) = 40 PNGs. Each run also checks no sideways scroll and every control at least 24x24px. [attach filled-1920 and filled-375 here]

## 3. How to run it
```
npm install
npm run dev                       # http://localhost:3000 -> /students/list
# pin a state: /students/list?state=loading | ?state=empty | ?state=error
npm run check                     # tsc --noEmit + eslint
npm run build
npx playwright install chromium   # once
npm run test:e2e                  # 6 behaviour tests
npm run qa:responsive             # 40 tests, writes screenshots/
```

## 4. Prompts and skills I used — exact text, copy-pasted
**Skills used:** Claude (claude.ai) with the Notion and Slack connectors to read the training page, my homework page, Sandip's page as reference, and the WM Date format + HTML development guideline pages; Claude's `frontend-design` skill; Playwright. [add any Claude Code prompts/skills you run locally]

**Main prompts:**
```
https://app.notion.com/p/divii/Saswat-Kumar-Sahoo-3f0326b2d5fb81468261d56a766e2066
https://divii.slack.com/archives/C02MUBR6R19/p1790844738538219
can you please read this thread and the notion of my homework and can you do it for me and tell me if you have any doubt....
```
**Follow-up prompts:**
```
can you continue

can you first complete the home work 1 and then tell me we will then proceed to hw2
https://app.notion.com/p/divii/Sandip-Mondal-3f0326b2d5fb815ca71dc64c50a11044...
Like this you can take a reference how a team member completed this and you give me the codebase may be i can upload in github ...not sure do what ever is best for me
[add every prompt you type in Claude Code from here on]
```

## 5. One problem I hit and how I solved it
- **Ugly wrapping on tablet.** The first 768px screenshot showed the table squeezing its columns: "Grade 8", dates and emails broke across lines in the middle of words (`ananya.ghosh@ex` / `ample.com`). WM checklist item 5 (text line breaks in responsive).
- **Fix:** table cells no longer wrap (`white-space: nowrap`), and at 768px and below each row becomes a card (header hidden, each cell shows its label from `data-label`, name moved to the top with `order: -1`). Long emails may break only inside a card, so they never widen the page.
- **Second, smaller one:** a Playwright test failed with "strict mode violation" because `getByRole('button', { name: 'Next' })` also matched the Next.js dev-tools button. Scoped the locator to the Pagination `nav` with `exact: true`, and turned off the dev indicator so it no longer shows in screenshots.

## 6. Check results (paste the real output FROM YOUR MACHINE)
```
npx tsc --noEmit -> [paste]
npm run lint -> [paste]
npm run test:e2e -> [paste]
npm run qa:responsive -> [paste]
```

## 7. Before you submit — check
- [x] CLAUDE.md is in the repo
- [ ] Type-check and lint are clean (output pasted above)  <- after you run them
- [x] Loading, empty and filled states all work (plus no results and error)
- [x] No sideways scroll at any width from 1920 to 375 (asserted at all 10 widths)
- [x] WM naming followed, no hardcoded colours or numbers
- [ ] I can explain the components, props and state in my screen  <- after reading docs/CODE-WALKTHROUGH.md
- [ ] HW1 status set to Submitted and HW1 submitted on filled in at the top
