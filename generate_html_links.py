#!/usr/bin/env python
import os
import re

""" 
Generate html file links using the files in the current directory.
Output needs to look like this:
    <li><a href="https://jaredschiltz.github.io/my-p5js-sketches/ScrollingCellularAutomata/index.html">Scrolling Cellular Automata</a></li>
    <li><a href="https://jaredschiltz.github.io/my-p5js-sketches/PietMondrianNewYorkCity1942/index.html">Piet Mondrian New York City 1942</a></li>
    <li><a href="https://jaredschiltz.github.io/my-p5js-sketches/TenPrint/index.html">10 Print</a></li>
"""

directories = [f for f in os.listdir() if os.path.isdir(f)]

for dirs in sorted(directories):
    replace_dash_with_space = re.sub("-", " ", dirs)
    ignore_directories = [".git"]
    if dirs not in ignore_directories:
        print(
            f'<li><a href="https://jaredschiltz.github.io/my-p5js-sketches/{dirs}/index.html">{replace_dash_with_space}</a></li>'
        )
