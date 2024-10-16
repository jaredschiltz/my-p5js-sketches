#!/usr/bin/env python
import sys
import os
import re
import shutil

""" 
   Setup a new project.
   1) Copy Default-Template to Project Name
   2) Change the index.html Title to reflect project name
"""

if len(sys.argv) > 1:
    project_name = sys.argv[1]
    # print("First argument:", first_argument)
    if (
        project_name in os.listdir()
    ):  # Skip because this project has already been created
        pass
    else:
        # Copy directory
        shutil.copytree("./Default-Template", "./" + project_name)

        # Change the index.html
        os.chdir("./" + project_name)
        file_name_replace_dashes_with_spaces = re.sub("-", " ", project_name)
        with open("index.html", "r") as f:
            file_contents = f.read()
        modified_file_contents = file_contents.replace(
            "Insert Title Here", file_name_replace_dashes_with_spaces
        )
        with open("index.html", "w") as f:
            f.write(modified_file_contents)
        os.chdir("..")
