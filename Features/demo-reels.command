#!/bin/bash
# Double-click this file to launch the Discover prototype correctly.
#
# Why this exists: opening discover-feature.html directly (file://) means
# the browser sends no referrer header, and YouTube's embedded player now
# refuses to serve video without one — that's the "Error 153" you saw.
# Serving the same file over http://localhost sidesteps this entirely,
# since a real referrer is sent like on any normal website.

cd "$(dirname "$0")"
PORT=8642

# Start a tiny local web server in the background, quietly.
python3 -m http.server "$PORT" >/dev/null 2>&1 &
SERVER_PID=$!

# Give it a moment to come up, then open the page in the default browser.
sleep 1
open "http://localhost:$PORT/discover-feature.html"

echo "Discover prototype running at http://localhost:$PORT/discover-feature.html"
echo "Leave this window open while you're using the demo."
echo "Press Ctrl+C or close this window to stop the server."

# Keep the script (and server) alive until this window is closed.
wait "$SERVER_PID"
