function backgroundGen(){
    var objArr = [];


    pushTransform();
        backgroundV = [-1,0.76, -1,0.84, 1,0.84, 1, 0.76];
        backgroundC = [];
        myConcat(backgroundC, colors.skyBlue);
        myConcat(backgroundC, colors.darkBlue);
        myConcat(backgroundC, colors.darkBlue);
        myConcat(backgroundC, colors.skyBlue);
        objArr[0] = createShape(gl,
            gl.TRIANGLE_FAN,
            backgroundV,
            backgroundC,
            transform.translate(0,0)
        );
    popTransform();
    pushTransform();

        backgroundV = [-1,-1, -1,0.76, 1,0.76, 1, -1];
        backgroundC = [];
        myConcat(backgroundC, colors.skyBlue);
        myConcat(backgroundC, colors.skyBlue);
        myConcat(backgroundC, colors.skyBlue);
        myConcat(backgroundC, colors.skyBlue);
        objArr[1] = createShape(gl,
            gl.TRIANGLE_FAN,
            backgroundV,
            backgroundC,
            transform.translate(0,0)
        );
    popTransform();


    return objArr;


}
