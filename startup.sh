#!/bin/bash

# Start the server
pm2 start server

# Wait for the server to initialize
sleep 5

# Start the Electron app
pm2 start client