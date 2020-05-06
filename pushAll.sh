#!/bin/sh
git fetch

git add --all
git commit -a -m $1
git push -u origin src
cd pages
git add --all
git commit -a -m $1
git push -u origin pages
cd ../docs
git add --all
git commit -a -m $1
git push --force-with-lease origin master
cd ..
