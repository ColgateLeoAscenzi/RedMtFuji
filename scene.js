"use strict";


const VERTCOMP = 2;  //(x,y)     working in 2D so constant for this program
const COLORCOMP = 4;  //(r,g,b,a)


//About performance with array
//https://javascript.info/array
function extendArrayWithDuplicate(arr, nbElements, nbComponents) {
   var len = arr.length;

   var larger = [];
   //console.log(nbElements * nbComponents);
   larger.length = nbElements * nbComponents;

   for (var i = 0; i < larger.length; i++)
      larger[i] = arr[i % len];

   return larger;
}



function create2DBuffer(gl, data) {

   var aBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, aBuffer);
   //send the data  (could be STATIC_DRAW)
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STREAM_DRAW);
   return aBuffer;
}


function create2DShape(gl, draw_mode, vertices, colors, mat) {

   var vertexBuf = create2DBuffer(gl, vertices);

   // correcting for one color
   if (colors.length/COLORCOMP != vertices.length/VERTCOMP) {
      console.log("let's do something");
      colors = extendArrayWithDuplicate(colors, vertices.length/VERTCOMP, COLORCOMP);
      console.log(colors);
   }

   var colorBuf = create2DBuffer(gl, colors);


   // Setup properties for vertexAttribPointer (see drawShape)
   //https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
   var shape = {
      vertexBuffer: vertexBuf,
      vertComponent: VERTCOMP,
      nVerts:   vertices.length/VERTCOMP,
      drawMode: draw_mode,
      colorBuffer: colorBuf,
      colorComponent: COLORCOMP,
      // default values
      stride: 0,
      offset: 0,
      isNormalized: false,
      transform: mat,
   };
   return shape;
}


function drawShape(gl, aShape) {

   console.log("WebGL Error: " + checkWebGLError(gl));
   console.log("WebGL " + vertexAttributeLocation);
   console.log("WebGL " + colorAttributeLocation);

   gl.uniformMatrix3fv(coordUniformLocation, false, aShape.transform.getMat3());


   gl.bindBuffer(gl.ARRAY_BUFFER, aShape.vertexBuffer);

   //tell the attribute how to get data out of vertexAttributeBuffer (ARRAY_BUFFER)
   gl.vertexAttribPointer(vertexAttributeLocation,  aShape.vertComponent,
                       gl.FLOAT, aShape.isNormalized, aShape.stride, aShape.offset);

   //set its color buffer
   gl.bindBuffer(gl.ARRAY_BUFFER, aShape.colorBuffer);

   gl.vertexAttribPointer(colorAttributeLocation,  aShape.colorComponent,
                       gl.FLOAT, aShape.isNormalized, aShape.stride, aShape.offset);

   //draw the object
   gl.drawArrays(aShape.drawMode, 0, aShape.nVerts);

}

/*----------------------- Current transform and transform stack --------------*/


// Current AffineTransform2D, initially the identity.
var transform = new AffineTransform2D();

// An array to serve as the transform stack.
var transformStack = [];

/**
 *  Push a copy of the current transform onto the transform stack.
 */
function pushTransform() {
    transformStack.push( new AffineTransform2D(transform) );
}

/**
 *  Remove the top item from the transform stack, and set it to be the current
 *  transform.  If the stack is empty, nothing is done (and no error is generated).
 */
function popTransform() {
    if (transformStack.length > 0) {
        transform = transformStack.pop();
    }
}

/*-------------------------------------------------------------------------------*/



function aSimpleObjects(gl, obj) {

   // repeating color is annoying (imagine if 32 points)

   obj[0] = create2DShape(gl,
            gl.TRIANGLES,
            //geo
           [  0,   0,
            320, 320,
              0, 640 ],
            //color
            [1, 0, 1 ,1,
             1, 0, 1, 1,
             1, 0, 1, 1 ]
           );
}

function gradientObjects(gl, obj) {

   pushTransform();

     obj[0] = create2DGradientShape(gl,
                //geo
                [  200.0,   580.0,    //minx, maxx
                   350.0,  620.0 ],  //miny, maxy
                 //color start,           color end
                 [0.0, 1.0, 0.0, 0.9],   [1.0,   0,   0,  1],
                  true,    // isHorizontal
                  false,    //isHSL
                  transform.translate(20, 0, 0)
              );
   popTransform();


   pushTransform();
      obj[1] = create2DGradientShape(gl,
                //geo
               [  0.0,   350.0,    //minx, maxx
                 30.0,  280.0 ],  //miny, maxy
               //colors HSBstart, HSBend since isHSL is true
               //require conversion to RGB gradient
               //range 0-1 for each HSB component
               //EX1: rainbow due to hue from 0 to 1 (entire spectrum)
               [0.0, 1, 0.5, 1], [1.0, 1, 0.5, 1],
               //EX2: TRY ME instead
               //[.3, 1.0, 0.3, 0], [.3, .0, .3, 1],
               true,    // isHorizontal
               true,    // isHSL
               transform.rotateAbout(175, 140, radians(60))
      );
   popTransform();

   //console.log(obj[1]);
}







function curveObjects(gl, obj) {

  pushTransform();

    transform.translate(800, 300);

    var control_polygon = [100, 0,  // center for drawing needed from triangle fan 
                                    // try other number 200 instead of 300 to get it
                           0,   0, //p0
                          20, 100, //p1
                         180, 100, //p2
                         200,   0  //p3
                          ] ;

    obj[2] = create2DShape( gl,
                            gl.LINE_LOOP,
                            //gl.TRIANGLE_FAN,
                            control_polygon,
                            [1, 0, 0, 1],
                            transform );
                                                     // TRY 5 instead of last number
    var curve_pts = getPointsOnBezierCurve(control_polygon, VERTCOMP, 28);

    obj[3] = create2DShape( gl,
                            //gl.LINE_LOOP,
                            gl.TRIANGLE_FAN,
                            curve_pts,
                            [0, 1, 0, .4],
                            transform );

  popTransform();

}

// ----------------------------------------------------------------------------------------
//
function makeScene(gl) {

   var obj = [];

   gradientObjects(gl, obj);
   curveObjects(gl, obj);

   return obj;
}


function initScene(gl) {
   gl.clearColor(0., 0, .0, 1.0);
   return makeScene(gl);
}


function drawScene(gl, prog, shapes) {

   gl.clear(gl.COLOR_BUFFER_BIT);

   //set shader to use
   gl.useProgram(prog);


   // as before but separate from model transform (check vertex shader program)
   var viewTrans = setViewportTransform( 0.0, 1200.0, 0.0, 600.0, false, gl);
   gl.uniformMatrix3fv(viewUniformLocation, false, viewTrans);

   console.log(shapes[0]);
   for (var i = 0; i < shapes.length; i++)
      drawShape(gl, shapes[i]);

   console.log("any webGL error", checkWebGLError(gl));
}
