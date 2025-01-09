#!/usr/bin/env python
"Genuary 2025 Prompt 7:Use software that is not intended to create art or images. "
import sys
import random

from termcolor import colored, cprint

text_colors = ["black", "yellow", "red"]

background_colors = ["on_black", "on_yellow", "on_dark_grey", "on_black"]
attributes = ["dark", "reverse"]
quadrant_blocks = [
    "\u259f",
    "\u25b6",
    "\u25b2",
    "\u25bc",
    "\u25c0",
]
for i in range(5):  # 5 lines of spacing
    print(" ")
height = 60
width = 125
for i in range(height):
    print(end="\n")
    print(end="     ")
    for j in range(width):
        cprint(
            random.choice(quadrant_blocks),
            random.choice(text_colors),
            random.choice(background_colors),
            attrs=[random.choice(attributes)],
            end="",
        )
print(" ")
print("\n     >> 25.7")
for i in range(5):  # 5 lines of spacing
    print(" ")
