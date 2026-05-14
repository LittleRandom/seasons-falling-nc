#!/bin/sh
# Entrypoint for the seasons-falling container.
# Set DEBUG=true (or DEBUG=1) at build time (--build-arg DEBUG=true)
# or at runtime (docker run -e DEBUG=true) to enable connection logging.

if [ "$DEBUG" = "true" ] || [ "$DEBUG" = "1" ]; then
  echo "[entrypoint] $(date -u +%Y-%m-%dT%H:%M:%SZ)  Starting in DEBUG mode — connection logging active"
  exec node server-debug.js
else
  exec node server.js
fi
