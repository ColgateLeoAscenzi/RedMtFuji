//---- Shader source strings, for a shader program that assumes all primitive are textured
 // Source code for a simple vertex shader, to be passed to createProgram().
var vertexShaderSource =
     "precision highp float;\n" +
     "attribute vec2 vertexCoords;\n" +
     "attribute vec2 textureCoords;\n" +
     "varying vec2 texcoords;\n" +
     "attribute vec4 vertexColor;\n"+
     "varying vec4 color;\n"+
     "uniform mat3 coordinateTransform;\n" +
     "void main() {\n" +
     "   color = vertexColor;\n"+
     "   vec3 transformedCoords = coordinateTransform * vec3(vertexCoords, 1.0);\n" +
     "   gl_Position = vec4(transformedCoords.xy, 0.0, 1.0);\n" +
     "   texcoords = textureCoords;\n" +
     "}\n";
 // Source code for a simple fragment shader, to be passed to createProgram().
var fragmentShaderSource =
     "precision mediump float;\n" +
     "varying vec2 texcoords;\n" +
     "varying vec4 color;\n" +
     "uniform sampler2D texture;\n" +
     "void main() {\n" +
     "    gl_FragColor = color;\n" +
     "}\n";


var gl;

var colors;
//Animations
var framenumber = 0;
var frameIncrement = 1;
var animating = false;

//Shaders
var vertexAttributeLocation;
var transformUniformLocation;
var colorAttribLocation;

var vertexAttributeBuffer;
var colorAttribBuffer;

//Which picture
var sceneToDraw

//Buffers
var squareCoordsVBO;
var diskCoordsVBO;
var triangleCoordsVBO;

var diskColorVBO;
var squareColorVBO;
var triangleColorVBO;

var darkBlue = [28/255,61/255,95/255, 1];
var lightBlue = [35/255,61/105,148/255, 1];
var tan = [250/255, 236/255, 195/255, 1];
var white = [249/255, 244/255, 222/255, 1];
var whiteShadow = [189/255, 212/255, 202/255, 1];
//set new shapes to red to test position
var red = [1,0,0,1];

//Transforms
var transform = new AffineTransform2D();
var transformStack = [];

scenes = ["drawAll();"];

var vintage = true;

var vintagecolors = {
    "darkBrown":[64/255,35/255,19/255, 0.99],
    "mediumBrown":[103/255,40/255,20/255, 0.99],
    "lightBrown":[123/255,45/255,20/255, 0.99],
    "darkRed":[165/255,55/255,21/255, 0.99],
    "mediumRed":[165/255,55/255,21/255, 0.99],
    "lighterRed":[170/255,62/255,22/255, 0.99],
    "tan": [201/255,171/255,131/255, 0.99],
    "tanGreen": [115/255,112/255,72/255,0.99],
    "mediumGreen": [83/255,102/255,74/255,0.99],
    "darkGreen": [41/255,58/255,39/255,1],
    "skyBlue": [103/255,116/255,97/255,0.99],
    "darkBlue": [25/255,32/255,42/255,0.9],
    "cloudWhite": [184/255,156/255,116/255,0.99]
}

var restoredcolors = {
    "darkBrown":[32/255,22/255,13/255, 0.99],
    "mediumBrown":[84/255,36/255,26/255, 0.99],
    "lightBrown":[90/255,37/255,25/255, 0.99],
    "darkRed":[157/255,47/255,30/255, 0.99],
    "mediumRed":[160/255,49/255,32/255, 0.99],
    "lighterRed":[188/255,76/255,54/255, 0.99],
    "tan": [201/255,171/255,131/255, 0.99],
    "tanGreen": [124/255,139/255,116/255,0.99],
    "mediumGreen": [80/255,106/255,79/255,0.99],
    "darkGreen": [27/255,40/255,42/255,1],
    "skyBlue": [42/255,83/255,137/255,0.99],
    "darkBlue": [5/255,13/255,88/255,0.9],
    "cloudWhite": [244/255,235/255,206/255,0.99]
}

function pushTransform() {
    transformStack.push( new AffineTransform2D(transform) );
}


function popTransform() {
    if (transformStack.length > 0) {
        transform = transformStack.pop();
    }
}

function draw(){
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    sceneToDraw = parseInt(document.getElementById("sceneselect").selectedIndex);
    console.log("Drawing image: " + document.getElementById("sceneselect").value+ " value: "+scenes[sceneToDraw]);

    eval(scenes[sceneToDraw]);
    //drawScene();
}


function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
   var vsh = gl.createShader( gl.VERTEX_SHADER );
   gl.shaderSource(vsh,vertexShaderSource);
   gl.compileShader(vsh);
   if ( ! gl.getShaderParameter(vsh, gl.COMPILE_STATUS) ) {
      throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
   }
   var fsh = gl.createShader( gl.FRAGMENT_SHADER );
   gl.shaderSource(fsh, fragmentShaderSource);
   gl.compileShader(fsh);
   if ( ! gl.getShaderParameter(fsh, gl.COMPILE_STATUS) ) {
      throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
   }
   var prog = gl.createProgram();
   gl.attachShader(prog,vsh);
   gl.attachShader(prog, fsh);
   gl.linkProgram(prog);
   if ( ! gl.getProgramParameter( prog, gl.LINK_STATUS) ) {
      throw "Link error in program:  " + gl.getProgramInfoLog(prog);
   }
   return prog;
}

function createWebGLContext(canvas) {
   var c;
   if ( ! canvas )
      throw "Canvas required";
   if (typeof canvas == "string")
      c = document.getElementById(canvas);
   else
      c = canvas;
   if ( ! c.getContext )
      throw "No legal canvas provided";
   var gl = c.getContext("webgl");
   if ( ! gl ) {
      gl = c.getContext("experimental-webgl");
   }
   if ( ! gl )
      throw "Can't create WebGLContext";
   return gl;
}


function initGL() {
    try{
        gl = createWebGLContext("webglcanvas");
        var prog = createProgram( gl, vertexShaderSource, fragmentShaderSource );
        gl.useProgram(prog);




        vertexAttributeLocation = gl.getAttribLocation(prog, "vertexCoords");
        transformUniformLocation = gl.getUniformLocation(prog, "coordinateTransform");
        colorAttribLocation = gl.getAttribLocation(prog, "vertexColor");

        vertexAttributeBuffer = gl.createBuffer();
        colorAttribBuffer = gl.createBuffer();



    }
    catch (e){
        console.log("Could not initialize WebGL! Error:" + e);
        return;
    }

    document.getElementById("sceneselect").onchange = draw;

    document.getElementById("multiCheckbox").checked = false;
    document.getElementById("multiCheckbox").onchange = doPlaceHolder;



    colors = vintagecolors;

    draw();    // draw the image


}


/*--------------------------- animation support ----------------------------------*/
function doFrame() {
    if (animating) {
        framenumber+= frameIncrement;
        draw();
        requestAnimationFrame(doFrame);
    }
}

function startAnimation() {
    if (!animating) {
       animating = true;
       requestAnimationFrame(doFrame);
    }
}

function pauseAnimation() {
    animating = false;
}



/*--------------------------- initialization ----------------------------------*/

function doAnimationCheckbox() {
    if ( document.getElementById("animationCheckbox").checked )
        startAnimation();
    else
        pauseAnimation();
}

function doPlaceHolder(){
    if(vintage){
        colors = restoredcolors;
        vintage = false;
    }
    else{
        colors = vintagecolors;
        vintage = true;
    }

    draw();

    console.log("Colorscheme Changed");
}
