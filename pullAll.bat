git fetch

echo '「merge conflict」した場合は競合を解決しましょう。'

git add --all
git commit -a -m %1
git pull -u origin pages
cd pages
git add --all
git commit -a -m %1
git pull -u origin pages
cd ../docs
git add --all
git commit -a -m %1
git pull -u origin master
cd ..