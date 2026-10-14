# Product screenshots

Regenerates the homepage images from a real, isolated Arkeep. It never touches `../arkeep/server/arkeep.db`:
server and agent state live in `scripts/screenshots/.demo/` (gitignored), demo sources and repositories in `/tmp/arkeep-demo`, on ports 18080 (HTTP) and 19090 (gRPC).

1. `bash scripts/screenshots/start-demo.sh` builds `../arkeep` (`task build`) and starts the server plus agents
   `web-01`, `db-01`, `nas-01`. Set `SKIP_ARKEEP_BUILD=1` to reuse existing binaries.
2. In another terminal: `node scripts/screenshots/seed.mjs` (fictional admin "Alex Rivera", two destinations,
   three policies, two real backup rounds).
3. `node scripts/screenshots/capture.mjs`
4. Stop the demo with Ctrl+C. Delete `scripts/screenshots/.demo/` for a fresh run (the setup endpoint only
   works for 15 minutes after the server starts).

Output: `src/assets/screens/*-{light,dark}.png`, `src/assets/screens/job-log-poster.png`, `public/media/job-log-loop.webm`.
