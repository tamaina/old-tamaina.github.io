inkscape -f icon.svg -e icon.png -w 700 -h 700
magick convert icon.png -resize 256x256 favicon.ico
inkscape -f thumb.svg -e thumb.png
inkscape -f publisher.svg -e publisher.png