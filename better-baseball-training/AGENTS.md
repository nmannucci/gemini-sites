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
- When giving commands for LocalWP theme updates, always tell the user to run them in the **LocalWP site shell**, not the normal Mac Terminal.

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

## Required Close-Out After Theme Edits

- If any file inside `house36-bbt/` changes, always end the task by giving the user the LocalWP site shell command needed to sync the updated source theme into the LocalWP install.
- Default sync command:

```bash
THEME_PATH=$(wp theme path house36-bbt --dir)

mkdir -p "$THEME_PATH"
rsync -a "/Users/nico/Gemini/gemini-sites/better-baseball-training/house36-bbt/" "$THEME_PATH/"
wp cache flush
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
  - the LocalWP site shell command to sync the theme
  - any important testing or follow-up note if needed

- Do not assume the user remembers the LocalWP sync process.
- Be explicit about where commands should be run:
  - **Mac Terminal** for Lighthouse CLI or general local tooling
  - **LocalWP site shell** for WP-CLI and theme sync commands
