const VERTCOMP = 2;
const COLORCOMP = 4;


function createShape(gl, draw_mode, vertices, colors, mat) {

    var vertexBuf = create2DBuffer(gl, vertices);

    if (colors.length/COLORCOMP != vertices.length/VERTCOMP) {
       colors = extendArrayWithDuplicate(colors, vertices.length/VERTCOMP, COLORCOMP);
    }

    var colorBuf = create2DBuffer(gl, colors);

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

function create2DBuffer(gl, data) {

    var aBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, aBuffer);
    //send the data  (could be STATIC_DRAW)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    return aBuffer;
}


function drawShape(gl, aShape) {

    gl.uniformMatrix3fv(transformUniformLocation, false, aShape.transform.getMat3());

    gl.bindBuffer(gl.ARRAY_BUFFER, aShape.vertexBuffer);
    gl.vertexAttribPointer(vertexAttributeLocation,  aShape.vertComponent,
    gl.FLOAT, aShape.isNormalized, aShape.stride, aShape.offset);
    gl.enableVertexAttribArray(vertexAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, aShape.colorBuffer);
    gl.vertexAttribPointer(colorAttribLocation,  aShape.colorComponent,
    gl.FLOAT, aShape.isNormalized, aShape.stride, aShape.offset);
    gl.enableVertexAttribArray(colorAttribLocation);
    gl.drawArrays(aShape.drawMode, 0, aShape.nVerts);

}

function filledShape(color, vertices, drawMode){
    //make more colours
    var newColor = [];
    if(color.length == 4){
        newColor = uniformColorGen(color, vertices.length/2);
    }
    else{
        newColor = color;
    }

    var vertexData = new Float32Array(vertices);

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

    colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newColor), gl.STATIC_DRAW);

    gl.uniformMatrix3fv(transformUniformLocation, false, transform.getMat3());

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(vertexAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.drawArrays(eval(drawMode), 0, vertices.length/2);

}
// -------------- FILLED SHAPE FUNCTIONS -----------------------//

function drawLine(sx, sy, angle, linelength, mcolor){

    var newColor = (uniformColorGen(mcolor, 2));


    var vertices = [sx,sy, sx+linelength*Math.cos(radians(angle)), sy+linelength*Math.sin(radians(angle))];

    filledShape(newColor, vertices, "gl.LINES");

}


function drawThickLine(sx, sy, angle, linelength, mcolor){

    var nsx = sx+linelength*Math.cos(radians(angle));
    var nsy = sy+linelength*Math.sin(radians(angle));

    var shortX = sx+(linelength/2)*Math.cos(radians(angle))
    var shortY = sy+(linelength/2)*Math.sin(radians(angle))

    var lineLeft = bendLine([sx,sy], [sx, shortY], [sx, shortY], [nsx,nsy], 30,  false, colors.cloudWhite, colors.cloudWhite)[0];
    var lineRight = bendLine([nsx+0.01, nsy], [sx+0.01+Math.random()*0.01, shortY], [sx+0.01-Math.random()*0.01, shortY], [sx+0.01,sy], 30,  false, colors.cloudWhite, colors.cloudWhite)[0];
    myConcat(lineLeft, lineRight);

    var newColor =  extendArrayWithDuplicate(colors.cloudWhite, lineLeft.length/VERTCOMP, COLORCOMP);

    filledShape(newColor, lineLeft, "gl.TRIANGLE_FAN");
}

function bendLine(pStart, p1, p2, pEnd, numPts, drawGuide, startColor, endColor){
    if(endColor == undefined){
        endColor = startColor;
    }


    // console.log(colorInc);
    var newColor = createColorGrad(startColor, endColor, numPts);

    var control_polygon = [0, 0, pStart[0], pStart[1], p1[0], p1[1], p2[0], p2[1],
                            pEnd[0], pEnd[1]];

    if(drawGuide){
        filledShape([0,1,0,1], control_polygon.slice(2,control_polygon.length), "gl.LINE_LOOP");
    }
    var curve_pts = getPointsOnBezierCurve(control_polygon, VERTCOMP, numPts);
    var color_pts = extendArrayWithDuplicate(startColor, numPts, COLORCOMP);


	return [curve_pts, newColor];
}
