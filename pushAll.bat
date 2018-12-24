git fetch
cd pages
git add --all
git commit -a -m %1
git push
cd ../docs
git add --all
git commit -a -m %1
git push
cd ..
git add --all
git commit -a -m %1
git push