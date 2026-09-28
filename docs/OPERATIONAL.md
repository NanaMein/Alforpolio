# Operational reference

This is a small, descriptive memory aid—not an instruction hierarchy, task tracker, or proof that work was completed. Current human direction takes precedence; source files and fresh checks establish current implementation.

## STANDING

- **Theme build:** This repo declares Bun as its package manager. `package.json` defines the scripts; `gulpfile.js` builds Tailwind, legacy CSS, and JavaScript, and creates the zip under `dist/`. **Verify:** inspect those files and run the relevant Bun script.
- **Stylesheet loading:** `default.hbs` loads `built/screen.css` before selectively loading `built/tailwind.css` for `tag, post, home, page, author, index`. **Verify:** inspect `default.hbs` and the generated assets; do not assume the gate remains unchanged.
- **Ghost integration:** Templates may rely on `{{ghost_head}}`, `{{ghost_foot}}`, `gh-*` / `is-*` hooks, membership attributes, and editor markup. **Verify:** inspect the template, partial, or script whose behavior is being changed.
- **Production boundary:** This theme is deployed to a Ghost VPS with memberships. Repository checks cannot prove production portal, signup, or member-state rendering. **Verify:** test logged-out, free-member, and paid-member states in Ghost when a change affects them.

## DIGEST

Weekly milestones only: at most 1–3 short entries per week, and only when the owner asks for or approves a durable milestone summary. Do not duplicate information already clear from `git log`; do not record individual tasks or conversations.

No weekly milestones recorded yet.
