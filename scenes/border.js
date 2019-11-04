
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

    return objArr;


}
