**Introduction and Purpose**

This website is a recreation of the artwork: South Wind, Clear Dawn from the Thirty-six views of Mt. Fuji by Katsushika Hokusai.

My reference for this image came from a book titled *Hokusai* by Gian Carlo Canza (Calza, Gian Carlo. Hokusai. Phaidon Press, 2003., pg. 262)

This piece of art was created around 1830 using the medium of woodblock print. The woodblock style is created by first drawing an image, then carving it into wood and applying ink into the reliefs, then pressing that against another sheet of paper to apply the color. This means that the whole image has a slight wooden texture, and a slight lack of precision in the lines due to the carving process.

When I thought of an art piece that I wanted to recreate, this style instantly came to mind due to how complex the paitings are with respect to carving, and how nice the colors look. While I originally wanted to do *The Great Wave off Kanagawa*, Hokusai's most famous view of Mt. Fuji, the waves gave me too many issues so I refocused on *South Wind, Clear Dawn*

**Cool Design Notes**

*Process*
Almost all of the image is dynamic and generated in a random way. While the mountain itself has hard corners defining where the top can be and how it curves, there is noise applied to the whole shape so that the bumps on the mountain randomly form. The lava spawning from the top of the mountain is also generated using a random process. Between 2-4 spawn locations are allowed to occur with 2 being on the left and right side, and then with this spawn location a word is generated. This word contains instructions for turning a random amount of degrees left and right, popping and pushing position data and generating, or not generating more branches.

Additionally, the trees and the clouds have designated zones in which they can spawn. To do this, a while loop is used that continues to create coordinates within a general area thats smaller than the picture size. I got this idea from Kerr when he talked about generating bubbles only below the horizon. I then test if each tree or cloud is within a boundary grid, and if it is then I draw it. For this, credit goes to Nile for showing off an "inside(point, shape)" functino in class. To these shapes noise is also randomly added to ensure no tree, cloud, or total picture looks exactly the same.

*Future Improvements*

One thing I think could be improved upon if I had more time is the lava. I need to find a way to make nice lava like tendrils that can have a consistant but noisey width, all the way down the height until they taper off. Since the L-system for algae does not generate a straight line at the start with a length, instead a bunch of line segments, it is hard to make these taper off without giving a braided rope look.

Another thing that would take more time is adding levels/rows where clouds could spawn specifically, and make sure none of them overlap and there's a certain, random, number of small and large clouds in each row that add up to a certain length rising up the picture.

*What I found cool*

One thing I hope everyone can check out is the code for the L-System. I think I wrote it pretty cleanly, even with the use of eval(), and I spent a lot of time thinking of ways to make the rules look like they were lava/fluid rather than a sharp tree or algae like structure.

**Folder/File Contents**
- *example images:* This folder includes pictures of the original images used for color and shape reference, as well as two generations of my drawing per color. The subfolders also contain some images of the progress of inventing pieces of the art
- *Folder: helpers*
 - *AffineTransform2D.js:* Contains math for storing and computing matrix multiplication
 - *color_utils.js:* Contains math for computing gradients
 - *colorandsphere.js:* Contains math for creating gradients and concatenating colors
 - *curve_utils.js:* Contains math to create bezier curves
 - *lsystem.js:* Contains an indeterministic L-System generator with a preloaded "lava" L-system based on a basic algae fractal
 - *math.js:* Contains array extention functions, line noise generating functions, radians and degrees
 - *shapes.js:* Contains code for drawing lines and any other shape using WebGL
- *Folder: scenes*
 - *background.js:* Creates the blue sky background with a gradient
 - *border.js:* Creates picture frame-like borders around the image
 - *clouds.js:* Generates 150 clouds with random position, length and fluffieness within a spawn location 
 - *lava.js:* Uses the L-System to generate 2 or more lava-like thick line shapes. Rules are defined in lsystem.js
 - *mainscene.js:* Calls all the other scenes in order from back to front
 - *mtfuji.js:* Creates the gradient Mt. Fuji using thousands of stacked lines
 - *trees.js:* Generates 2000 thin trees and 1000 thicker trees within a spawn location at a random position with a random amount of added noise. Thick trees can only spawn below a certain x and y
- *background.jpg:* A subtle woodblock texture, can be seen with all colors at a 0.99 alpha
- *index.html:* Creates the canvas and loads all the js files
- *shaders.js:* All the setup code for the shaders and holds the color pallete and a few other global variables


*For Professor Elodie Fourquets 435 Computer Graphics Course*
*Project 2: Fall 2019, Colgate University. By Leo Ascenzi*
