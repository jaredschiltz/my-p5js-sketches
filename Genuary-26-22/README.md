#Genuary 2026 - JAN. 22 
Pen plotter ready.

Ran the following steps:
1) pip install vpype vpype-gcode (if not installed)
2) in affinity designer, for SVG output, uncheck "Use Document Resolution" and 
make sure DPI is set to 96 (This keeps the scale 1:1 from pixels to mm)
VERY IMPORTANT!
3) Also, Make sure "set viewbox" is checked. don't need to flatten transforms or use relative coordinates
4) vpype read perlin.svg linesort -t -l 'all' gwrite --profile my_plotter perling.gcode