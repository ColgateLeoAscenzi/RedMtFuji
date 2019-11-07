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
function filledTriangle(color, vertices, drawMode){
    if(drawMode == undefined){
        var drawMode = "gl.TRIANGLES";
    }
    filledShape(color, vertices, drawMode)

}

function drawLine(sx, sy, angle, linelength, mcolor){
    var newColor = (uniformColorGen(mcolor, 2));


    var vertices = [sx,sy, sx+linelength*Math.cos(radians(angle)), sy+linelength*Math.sin(radians(angle))];

    filledShape(newColor, vertices, "gl.LINES");

}

function drawThickLine(sx, sy, angle, linelength, mcolor){
    var newColor = (uniformColorGen(mcolor, 2));


    var vertices = [sx,sy, sx+linelength*Math.cos(radians(angle)), sy+linelength*Math.sin(radians(angle))];

    filledShape(newColor, vertices, "gl.LINES");

}

function shape(center, newC, color, sideNum, sideLength){
    var sumOfIntAng = (sideNum-2)*180;
    var newColor = [];
    //generates new uniform colors if not specified
    if(color.length == 1){
        for(var i = 0; i < sideNum; i++){
            newColor.push(uniformColorGen(color[0], sideNum));
        }
    }
    else{
        newColor = color;
    }
    //aligns it so the bottom is flat
    pushTransform();
        transform.rotate(radians((-sumOfIntAng)/(2*sideNum)));
        //transform.scale(3/sideNum);
        for(var i = 0; i < sideNum; i++){
            //makes triangles and rotate
            pushTransform();
                transform.rotate(radians(360/sideNum)*i);
                var tempTriCoords = genTriangle(center, sideLength, [(360/sideNum), (180-(360/sideNum))/2,(180-(360/sideNum))/2]);
                tempTriCoords = fixCenter(tempTriCoords, newC, radians(360/sideNum)*i, sideNum);
                filledTriangle(newColor[i], tempTriCoords);
            popTransform();

        }
    popTransform();

}

// ------------------- non basic shapes -----------------------//
function hexagon(center, newC, color, sideLength){
    shape(center, newC, color, 6, sideLength);

}

function pentagon(center, newC, color, sideLength){
    shape(center, newC, color, 5, sideLength);
}


function genTriangle(center, side, angles){
    triCoord = [center[0], center[1]];

    //var a = (side* Math.sin(radians(angles[0])))/Math.sin(radians(angles[2]));
    triCoord.push(center[0]+side);
    triCoord.push(center[1]);

    var b = (side * Math.sin(radians(angles[1])))/Math.sin(radians(angles[2]));
    var dy = b*Math.sin(radians(angles[0]));
    var dx = b*Math.cos(radians(angles[0]));

    triCoord.push(center[0]+dx);
    triCoord.push(center[1]+dy);

    return triCoord;
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

function curveTriangle(corner, side, angles, p1, p2, drawGuide){
	var startVert = genTriangle(corner, side, angles);
	//save bottom left
	var newVert = [startVert[0], startVert[1]];

	var bentVert = bendLine([startVert[2],startVert[3]], p1, p2, [startVert[4],startVert[5]], drawGuide);

	for(var i = 0; i < bentVert.length; i++){
		newVert.push(bentVert[i]);
	}
	return newVert;
}
