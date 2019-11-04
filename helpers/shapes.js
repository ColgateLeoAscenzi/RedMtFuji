

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
function filledTriangle(color, vertices){
    var newColor = [];
    if(color.length == 4){
        newColor = uniformColorGen(color, 3);
    }
    else{
        newColor = color;
    }

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var triangleCoords = new Float32Array(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, triangleCoords, gl.STATIC_DRAW);
    colorBuffer = gl.createBuffer()

    gl.uniformMatrix3fv(transformUniformLocation, false, transform.getMat3());
    //position
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(vertexAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newColor), gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function drawLine(sx, sy, angle, linelength, mcolor){
    var newColor =(uniformColorGen(mcolor, 2));


    var vertices = [sx,sy, sx+linelength*Math.cos(radians(angle)), sy+linelength*Math.sin(radians(angle))];

    lineVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lineVBO);
    var lineCoords = new Float32Array(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, lineCoords, gl.STATIC_DRAW);

    lineColorVBO = gl.createBuffer()
    gl.uniformMatrix3fv(transformUniformLocation, false, transform.getMat3());
    //position
    gl.bindBuffer(gl.ARRAY_BUFFER, lineVBO);
    gl.vertexAttribPointer(vertexAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, lineColorVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newColor), gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.drawArrays(gl.LINES, 0, 2);

}


// -------------- FILLED SHAPE FUNCTIONS -----------------------//
function filledTriangle(color, vertices){
    var newColor = [];
    if(color.length == 4){
        newColor = uniformColorGen(color, vertices.length);
    }
    else{
        newColor = color;
    }

    //transform

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var triangleCoords = new Float32Array(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, triangleCoords, gl.STATIC_DRAW);
    colorBuffer = gl.createBuffer()



    gl.uniformMatrix3fv(transformUniformLocation, false, transform.getMat3());
    //position
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(vertexAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexAttributeLocation);

	console.log(newColor);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newColor), gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttribLocation);
	console.log(vertices);

    gl.drawArrays(gl.LINE_LOOP, 0, vertices.length/2);
}

function filledCircle(color) {
    var newColor = [];
    if(color.length == 4){
        newColor = uniformColorGen(color, 32);
    }
    else{
        newColor = color;
    }
    gl.uniformMatrix3fv(transformUniformLocation, false, transform.getMat3());
    gl.bindBuffer(gl.ARRAY_BUFFER, diskCoordsVBO);
    gl.vertexAttribPointer(vertexAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, diskColorVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newColor), gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 32);

}


function filledSquare(color) {
    var newColor = [];
    if(color.length == 4){
        newColor = uniformColorGen(color, 4);
    }
    else{
        newColor = color;
    }
   gl.uniformMatrix3fv(transformUniformLocation, false, transform.getMat3());
   gl.bindBuffer(gl.ARRAY_BUFFER, squareCoordsVBO);
   gl.vertexAttribPointer(vertexAttributeLocation, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(vertexAttributeLocation);

   gl.bindBuffer(gl.ARRAY_BUFFER, squareColorVBO);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newColor), gl.STATIC_DRAW);
   gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(colorAttribLocation);

   gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

}

// ------------------- non basic shapes -----------------------//
function hexagon(color){
    var newColor = [];
    if(color.length == 1){
        for(var i = 0; i < 6; i++){
            newColor.push(uniformColorGen(color[0], 6));
        }
    }
    else{
        newColor = color;
    }

    for(var i = 0; i < 6; i++){
        pushTransform();
            transform.rotate(radians(60*i));
            filledTriangle(newColor[i], eqTri);
        popTransform();
    }
}

function pentagon(color){
    var newColor = [];
    if(color.length == 1){
        for(var i = 0; i < 5; i++){
            newColor.push(uniformColorGen(color[0], 6));
        }
    }
    else{
        newColor = color;
    }

    for(var i = 0; i < 5; i++){
        pushTransform();
            transform.rotate(radians(72*i));
            filledTriangle(newColor[i], genTriangle([0,0], 1, [72,54,54]));
        popTransform();
    }
}


//*------------------ Helpers ---------------------------//
function radians( degrees ) {
  return degrees * Math.PI / 180.0;
}

function uniformColorGen(color, sides){
    var colorArr = [];
    for(var i = 0; i < sides; i++){
        colorArr.push(color[0]);
        colorArr.push(color[1]);
        colorArr.push(color[2]);
        colorArr.push(color[3]);
    }
    return colorArr;
}

function concatColor(colors){
    var outColor = [];
    for(var i = 0; i < colors.length; i++){
        var tempCol = colors[i];
        for(var j = 0; j < tempCol.length; j++){
            outColor.push(tempCol[j]);
        }
    }
    return outColor;
}

function genTriangle(corner, side, angles){
    triCoord = [corner[0], corner[1]];
    if(radians(angles[0]) == 60 && radians(angles[1]) == 60 && radians(angles[2]) == 60){
        triCoord.push(side);
        triCoord.push(corner[1]);
        var midPoint = (side-corner[0])/2;
        triCoord.push((side-corner[0])/2);
        triCoord.push(Math.sqrt(side*side - midPoint*midPoint));
    }
    else{
        var c = (side* Math.sin(radians(angles[2])))/Math.sin(radians(angles[0]));
        triCoord.push(corner[0]+c);
        triCoord.push(corner[1]);

        var b = (side * Math.sin(radians(angles[1])))/Math.sin(radians(angles[0]));
        var y = b*Math.sin(radians(angles[0]));
        var x = b*Math.cos(radians(angles[0]));

        triCoord.push(corner[0]+x);
        triCoord.push(corner[0]+y);


    }
    return triCoord;
}

function bendLine(A, B, C){
	var newVert = [];
	var b = C[1]-(((C[1]-B[1])/(C[0]-B[0]))*C[0]);

	for(var y = B[1]; y< C[1]; y+= (C[1]-B[1])/50){
		newVert.push(((y-b)*(C[0]-B[0]))/(C[1]-B[1]));
		newVert.push(y);
	}
	console.log(newVert);
	for(var i = 0; i< newVert.length-2; i+=2){
		if(newVert[i+1] < 0.3){
			newVert[i] = newVert[i] - 0.0001*i*-i;
			newVert[i+1] = newVert[i+1];
		}
		else{
			newVert[i] = newVert[i] - 0.0001*(100-i)*(-(100-i));
			newVert[i+1] = newVert[i+1];
		}



	}

	return newVert;
}

function curveTriangle(corner, side, angles, point){
	var startVert = genTriangle(corner, side, angles);
	//save bottom left
	var newVert = [startVert[0], startVert[1]];
	var bentVert = bendLine(point, [startVert[2],startVert[3]], [startVert[4], startVert[5]]);
	for(var i = 0; i < bentVert.length; i++){
		newVert.push(bentVert[i]);
	}
	return newVert;
}
