#!/usr/bin/env bash
set -e


# Compiled resource path.
RELEASE_INFO_SEARCH_PATH="$1/.github/.release"
RELEASE_ARTIFACTS="$RELEASE_INFO_SEARCH_PATH/artifacts"
COMPILED_REACT_PATH="$1/dist"


# Find product release information file.
RELEASE_INFO_PATH="$(find "$RELEASE_INFO_SEARCH_PATH" -name 'release*.json')"
if [[ -z "$RELEASE_INFO_PATH" ]]; then
  echo "Release information not available. Terminate deployment."
  exit 1
fi

# Extract product release version.
[[ "$(cat "$RELEASE_INFO_PATH")" =~ \"version\":\"(.+)\"} ]] && RELEASE_VERSION="${BASH_REMATCH[1]}"
if [[ -z "$RELEASE_VERSION" ]]; then
  echo "Unable extract product release version."
  exit 2
fi

# Install required dependencies.
npm ci

# Build distribution package.
if ! build_out="$(npm run build 2>&1)"; then
  echo "Build failed"
  echo "Error: $build_out"
  exit 3
fi

# Compress results to artifacts folder (it will be used later by automated part to upload it to GitHub release).
tar -zcf "$RELEASE_ARTIFACTS/pubnub.$RELEASE_VERSION.tar.gz" -C "$COMPILED_REACT_PATH/" "." > /dev/null 2>&1
