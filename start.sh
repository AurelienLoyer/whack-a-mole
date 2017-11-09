#!/bin/bash

git fetch --all
git pull

npm start

/usr/bin/chromium-browser --kiosk --ignore-certificate-errors --disable-restore-session-state "http://localhost:1337/"
