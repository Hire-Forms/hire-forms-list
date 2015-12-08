#!/bin/sh

# Bundle JS libs
node_modules/.bin/browserify \
	--require classnames \
	--require react > examples/libs.js

node_modules/.bin/watchify examples/index.jsx \
  --detect-globals false \
  --extension=.jsx \
  --external classnames \
  --external react \
  --outfile 'derequire > examples/index.js' \
  --standalone HireFormsListExamples \
  --transform [ babelify --plugins object-assign ] \
  --verbose