**Introduction and Purpose**
This website is a recreation of the artwork: South Wind, Clear Dawn from the Thirty-six views of Mt. Fuji by Katsushika Hokusai.

My reference for this image came from a book titled *Hokusai* by Gian Carlo Canza (Calza, Gian Carlo. Hokusai. Phaidon Press, 2003., pg. 262)

This piece of art was created around 1830 using the medium of woodblock print. The woodblock style is created by first drawing an image, then carving it into wood and applying ink into the reliefs, then pressing that against another sheet of paper to apply the color. This means that the whole image has a slight wooden texture, and a slight lack of precision in the lines due to the carving process.

When I thought of an art piece that I wanted to recreate, this style instantly came to mind due to how complex the paitings are with respect to carving, and how nice the colors look. While I originally wanted to do *The Great Wave off Kanagawa*, Hokusai's most famous view of Mt. Fuji, the waves gave me too many issues so I refocused on *South Wind, Clear Dawn*

**Cool Design Notes**


**Folder/File Contents**
- *example images:* This folder includes pictures of the original images used for color and shape reference, as well as two generations of my drawing per color. The subfolders also contain some images of the progress of inventing pieces of the art
- *helpers*
 - *AffineTransform2D.js:* Contains math for storing and computing matrix multiplication
 - *color_utils.js:* Contains math for computing gradients
 - *colorandsphere.js:* Contains math for creating gradients and concatenating colors
 - *curve_utils.js:* Contains math to create bezier curves
 - *lsystem.js:* Contains an indeterministic L-System generator with a preloaded "lava" L-system based on a basic algae fractal
 - *math.js:* Contains array extention functions, line noise generating functions, radians and degrees
 - *shapes.js:* Contains code for drawing lines and any other shape using WebGL
- *scenes*
 - *background.js:* Creates the blue sky background with a gradient
 - *border.js:* Creates picture frame-like borders around the image
 - *clouds.js:* Generates 150 clouds with random position, length and fluffieness within a spawn location 
 - *lava.js:* Uses the L-System to generate 2 or more lava-like thick line shapes. Rules are defined in lsystem.js
 - *mainscene.js:* Calls all the other scenes in order from back to front
 - *mtfuji.js:* Creates the gradient Mt. Fuji using thousands of stacked lines
 - *trees.js:* Generates 2000 thin trees and 1000 thicker trees within a spawn location at a random position with a random amount of added noise. Thick trees can only spawn below a certain x and y
- *index.html:* Creates the canvas
