function backgroundGen(){
    var objArr = [];
    pushTransform();

		var borderV = [-1,-1, -1,1, 1,1, 1, -1];
		var borderC = [];
        myConcat(borderC, colors.skyBlue);
        myConcat(borderC, colors.darkBlue);
        myConcat(borderC, colors.darkBlue);
        myConcat(borderC, colors.skyBlue);
        objArr[0] = createShape(gl,
            gl.TRIANGLE_FAN,
            borderV,
            borderC,
            transform.translate(0,0)
        );
    popTransform();


    return objArr;


}
