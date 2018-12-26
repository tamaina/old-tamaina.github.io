git fetch
cd pages
git add --all
git commit -a -m %1
git push upstream pages
cd ../docs
git add --all
git commit -a -m %1
git push upstream master
cd ..
git add --all
git commit -a -m %1
git push upstream src