#!/bin/bash

# Start the server
bun ./build/index.js &

BUN_PID=$!

# Wait for the server to finish starting
sleep 2

# Start the client
source ./webview/venv/bin/activate
python3 ./webview/main.py

# Kill the server if the client is closed
kill $BUN_PID

# deactivate the virtual environment
deactivate
