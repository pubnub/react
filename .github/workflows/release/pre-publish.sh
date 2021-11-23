#!/usr/bin/env bash
set -e

# Update content of `package-lock.json` to match current dependencies list and versions.
npm install > /dev/null 2>&1
