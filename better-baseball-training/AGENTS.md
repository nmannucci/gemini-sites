# better-baseball-training

## Project System

- This project uses a **source theme workflow**.
- The editable source theme lives in:
  `/Users/nico/Gemini/gemini-sites/better-baseball-training/house36-bbt`
- That source folder is the main place where theme code should be changed.
- The WordPress site running inside LocalWP has its **own installed copy** of the theme inside the Local site.
- Changes made in the source theme do **not** automatically update the LocalWP site until the source theme is copied into the LocalWP theme directory.

## Site Setup

- Static source files that the theme was built from live in this project folder.
- The final classic WordPress theme name is `house36-bbt`.
- The site is typically worked on in this order:
  1. Edit the source theme in this project.
  2. Sync the updated theme into LocalWP.
  3. Test in LocalWP.
  4. Push the LocalWP site to Flywheel when ready.

## LocalWP Workflow

- LocalWP is used as the main testing environment before pushing to Flywheel.
- The user opens the site in LocalWP and can use:
  - normal browser preview for visual QA
  - **Open Site Shell** for WP-CLI commands
- LocalWP site shell / WordPress root for this project is:
  `/Users/nico/Local Sites/better-baseball-training-1/app/public`
- When theme files are updated, prefer running the LocalWP sync yourself from Codex instead of asking the user to copy/paste commands manually.
- If sandbox permissions prevent writing to the LocalWP site, request escalation and then complete the sync yourself.
- When mentioning commands for LocalWP theme updates, treat `/Users/nico/Local Sites/better-baseball-training-1/app/public` as the shell location.
- Important: in the Codex shell for this project, WP-CLI is not available, so `wp cache flush` will not work here. From Codex, sync the theme with `rsync` and then tell the user cache flushing would need to happen in the LocalWP site shell if needed.

## Source Theme Location

- Primary theme folder:
  `/Users/nico/Gemini/gemini-sites/better-baseball-training/house36-bbt`
- Important assets and templates live inside that folder.
- When updating design, layout, performance, accessibility, SEO, or template logic, edit the files in this source theme first.

## Installed LocalWP Theme

- The installed LocalWP theme path may vary by machine and site setup.
- Do not hardcode the LocalWP installed theme path if it can be discovered with WP-CLI.
- Use this command in LocalWP to find the installed theme directory:

```bash
wp theme path house36-bbt --dir
```

- Known installed LocalWP site root for this project:
  `/Users/nico/Local Sites/better-baseball-training-1/app/public`
- Typical installed theme target on this machine:
  `/Users/nico/Local Sites/better-baseball-training-1/app/public/wp-content/themes/house36-bbt`

## Required Close-Out After Theme Edits

- If any file inside `house36-bbt/` changes, always sync the updated source theme into the LocalWP install yourself before closing out, unless the user explicitly says not to.
- After syncing, tell the user that the LocalWP copy was updated and include any important testing note if needed.
- Default sync command:
- LocalWP site shell version, when WP-CLI is available:

```bash
THEME_PATH=$(wp theme path house36-bbt --dir)

mkdir -p "$THEME_PATH"
rsync -a "/Users/nico/Gemini/gemini-sites/better-baseball-training/house36-bbt/" "$THEME_PATH/"
wp cache flush
```

- Preferred direct execution flow from Codex for this project:
- Preferred Codex shell flow for this machine:

```bash
rsync -a "/Users/nico/Gemini/gemini-sites/better-baseball-training/house36-bbt/" "/Users/nico/Local Sites/better-baseball-training-1/app/public/wp-content/themes/house36-bbt/"
```

- This is the default command unless the user specifically asks for a smaller file-by-file sync.
- If only a couple of files changed and a narrower command is clearly better, it is fine to provide a targeted copy command instead of the full `rsync`.

## After Syncing To LocalWP

- After the LocalWP sync, the normal next step is:
  1. refresh the Local site
  2. test the affected page or feature
  3. if approved, push from LocalWP to Flywheel

- For theme or frontend changes, prefer validating in LocalWP before telling the user to push live.

## Flywheel Workflow

- Flywheel is the hosted destination.
- The normal deployment path is:
  1. build/update in the source theme
  2. sync to LocalWP
  3. test in LocalWP
  4. push from LocalWP to Flywheel

- Direct Flywheel SSH work can be useful for maintenance or quick fixes, but the preferred workflow for theme development is still LocalWP first.

## Lighthouse / Performance Workflow

- Lighthouse can be run against:
  - the LocalWP URL for local testing
  - the live production URL for real-world checks

- Reports should be saved in:
  `/Users/nico/Gemini/gemini-sites/better-baseball-training/lighthouse-reports`

- If performance changes are made, remind the user they can rerun Lighthouse after syncing the theme into LocalWP.

## Response Expectations

- Whenever theme files are updated, include:
  - a short summary of what changed
  - confirmation that the LocalWP theme copy was synced, or a brief note if permission/escalation blocked the sync
  - any important testing or follow-up note if needed

- Do not assume the user remembers the LocalWP sync process.
- Be explicit about where commands should be run:
  - **Mac Terminal** for Lighthouse CLI or general local tooling
  - **LocalWP site shell** for WP-CLI and theme sync commands

## Forminator Notes

- This project uses Forminator for the homepage lead form.
- Form rendering is wired through the source theme, not page-builder-only styling.
- Prefer styling Forminator forms in:
  `/Users/nico/Gemini/gemini-sites/better-baseball-training/house36-bbt/style.css`
  so the design lives in the source theme and survives workflow syncs.
- Important: Forminator select fields in non-basic designs use a Select2-style UI, not just native `<select>` elements.
- When dropdown text or dropdown menu colors need styling, target both:
  - the native select selectors
  - the Select2 / Forminator dropdown selectors such as `.select2-container`, `.select2-selection--single`, `.select2-dropdown.forminator-select-dropdown`, and `.select2-results__option`
- If a Forminator dropdown looks correct closed but wrong when opened, or vice versa, assume the Select2 layer needs CSS updates.
