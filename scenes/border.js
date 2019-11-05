
//Draws background with mount fuji and sky
function borderGen(){
    var objArr = [];
    pushTransform();

		var borderV = [0.9, -1, 1,-1, 1,1, 0.9, 1];
		var borderC = extendArrayWithDuplicate(colors.tan, 4, COLORCOMP)
        objArr[0] = createShape(gl,
            gl.TRIANGLE_FAN,
            borderV,
            borderC,
            transform.translate(0,0)
        );
    popTransform();
    pushTransform();
        var borderV = [0.9, -1, 1,-1, 1,1, 0.9, 1];
        var borderC = extendArrayWithDuplicate(colors.tan, 4, COLORCOMP)
        objArr[1] = createShape(gl,
            gl.TRIANGLE_FAN,
            borderV,
            borderC,
            transform.translate(-1.95,0)
        );

    popTransform();

    pushTransform();
        var borderV = [0.9, -1, 1,-1, 1,1, 0.9, 1];
        var borderC = extendArrayWithDuplicate(colors.tan, 4, COLORCOMP)
        objArr[2] = createShape(gl,
            gl.TRIANGLE_FAN,
            borderV,
            borderC,
            transform.rotate(radians(90))
        );

    popTransform();

    pushTransform();
        var borderV = [0.9, -1, 1,-1, 1,1, 0.9, 1];
        var borderC = extendArrayWithDuplicate(colors.tan, 4, COLORCOMP)
        objArr[3] = createShape(gl,
            gl.TRIANGLE_FAN,
            borderV,
            borderC,
            transform.rotate(radians(-90))
        );

    popTransform();


    return objArr;


}
