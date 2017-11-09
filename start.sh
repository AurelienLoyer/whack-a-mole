#!/bin/bash

# pull force
git fetch --all
git reset --hard origin/master

npm start

/usr/bin/chromium-browser --kiosk --ignore-certificate-errors --disable-restore-session-state "http://localhost:1337/"
