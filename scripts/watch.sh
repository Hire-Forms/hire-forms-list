#!/bin/sh

node_modules/.bin/watchify src/index.jsx \
  --detect-globals false \
  --extension=.jsx \
  --external classnames \
  --external react \
  --outfile 'derequire > build/index.js' \
  --standalone HireFormsList \
  --transform [ babelify --presets [ es2015 react ] ] \
  --transform brfs \
  --verbose
