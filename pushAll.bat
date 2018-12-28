git fetch

echo 'リモートと競合した場合はpullAll.batを同様に実行してみてください。'

git add --all
git commit -a -m %1
git push -u origin src
cd pages
git add --all
git commit -a -m %1
git push -u origin pages
cd ../docs
git add --all
git commit -a -m %1
git push -u origin master
cd ..