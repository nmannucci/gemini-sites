# better-baseball-training — Claude Instructions

## Auto-sync to LocalWP after theme edits

Whenever you change ANY file inside `house36-bbt/` (PHP templates, CSS, JS, assets, etc.), you MUST sync the source theme into the LocalWP install before closing out the turn. Do not ask the user to run the sync — run it yourself.

Default sync command (run from this project, no `cd` needed):

```bash
rsync -a "/Users/nico/Gemini/gemini-sites/better-baseball-training/house36-bbt/" "/Users/nico/Local Sites/better-baseball-training-1/app/public/wp-content/themes/house36-bbt/"
```

Rules:
- Run the sync immediately after the last edit to `house36-bbt/`, in the same response.
- WP-CLI is NOT available from the Codex/Claude shell — do not run `wp cache flush` here. If a cache flush is needed, tell the user to run it in the LocalWP site shell.
- After syncing, briefly confirm to the user that the LocalWP copy was updated and they can refresh the Local site to view changes.
- The only time to skip the sync is if the user explicitly says not to sync.

See `AGENTS.md` for the full source-theme → LocalWP → Flywheel workflow.
