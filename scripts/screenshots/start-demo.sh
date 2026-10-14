#!/usr/bin/env bash
# Starts an isolated Arkeep (server + 3 agents) for screenshots. Ctrl+C stops everything.
# Never touches ../arkeep/server/arkeep.db: all state lives in scripts/screenshots/.demo/.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ARKEEP="${ARKEEP_REPO:-$HERE/../../../arkeep}"
DEMO="$HERE/.demo"
mkdir -p "$DEMO"/{server,agents,repos,sources}

if [ -z "${SKIP_ARKEEP_BUILD:-}" ]; then
  (cd "$ARKEEP" && task build)   # builds GUI, embeds it, builds server + agent into bin/
fi

SECRET=demo-agent-secret
export ARKEEP_SECRET_KEY=demo-secret-key-0000000000000000 ARKEEP_AGENT_SECRET=$SECRET ARKEEP_TELEMETRY=false
"$ARKEEP/bin/arkeep-server" \
  --db-dsn "$DEMO/server/arkeep.db" --data-dir "$DEMO/server/data" \
  --http-addr 127.0.0.1:18080 --grpc-addr 127.0.0.1:19090 \
  --grpc-insecure > "$DEMO/server.log" 2>&1 &
PIDS=($!)
trap 'kill "${PIDS[@]}" 2>/dev/null' INT TERM EXIT
sleep 3

for host in web-01 db-01 nas-01; do
  mkdir -p "$DEMO/sources/$host"
  "$ARKEEP/bin/arkeep-agent" \
    --server-addr 127.0.0.1:19090 --agent-secret $SECRET \
    --state-dir "$DEMO/agents/$host" --hostname "$host" --grpc-insecure > "$DEMO/agent-$host.log" 2>&1 &
  PIDS+=($!)
done

echo "Arkeep demo on http://127.0.0.1:18080. Now run: node scripts/screenshots/seed.mjs"
wait
