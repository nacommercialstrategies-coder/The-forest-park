#!/bin/bash
# Download an OpenArt CDN URL via the GCS bucket host. Usage: oa_dl.sh <cdn-url> <out-file>
u="${1/https:\/\/cdn.openart.ai\//https://storage.googleapis.com/cdn.openart.ai/}"
curl -sSL --retry 3 -o "$2" "$u" && echo "ok $2 $(stat -c%s "$2")"
