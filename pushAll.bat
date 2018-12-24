git fetch
cd pages
git add --all
git commit -a -m %1
git push -u origin pages
cd ../docs
git add --all
git commit -a -m %1
git push -u origin master
cd ..
git add --all
git commit -a -m %1
git push