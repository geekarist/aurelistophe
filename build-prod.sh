#/bin/bash

set -eux

cd webpack
webpack -p
cd ..
jekyll build
