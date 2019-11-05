function cloudGen(){
    var objArr = [];
    pushTransform();

		var cloudV = [];
        //top left root to be random generated
        var rootTL = [-0.3, 0];
        var length = 2*Math.abs(rootTL[0]);
        //top right corner
        var rootTR = [rootTL[0]+length, rootTL[1]];
        var height = 0.035;
        //bottom left
        var rootBL = [rootTL[0], rootTL[1]-height];
        //bottom right
        var rootBR = [rootTL[0] + length, rootTL[1] - height];
        //gives top left to top right to bottom right to bottom left drawing with midpoints
        var cloudTop = bendLine(rootTL, [rootTL[0]+(length*0.25),rootTL[1]+0.05], [rootTL[0]+(length*0.75),rootTL[1]+0.05], rootTR, 30,  false, colors.cloudWhite, colors.cloudWhite)[0];
        var cloudRight = bendLine(rootTR, [rootTR[0],rootTR[1]-0.25*height], [rootTR[0],rootTR[1]-0.75*height], rootBR, 5,  false, colors.cloudWhite, colors.cloudWhite)[0];
        var cloudBottom = bendLine(rootBR, rootBR, rootBL, rootBL, 3,  false, colors.cloudWhite, colors.cloudWhite)[0];
        var cloudLeft = bendLine(rootBL, [rootBL[0],rootBL[1]-(0.25*height)], [rootBL[0],rootBL[1]-(0.75*height)], rootBR, 3,  false, colors.cloudWhite, colors.cloudWhite)[0];

        myConcat(cloudV, ynoise(cloudTop, 0.04));
        myConcat(cloudV, xnoise(cloudRight,0.01));
        myConcat(cloudV, truenoise(cloudBottom, 0, 0.02));
        myConcat(cloudV,  xnoise(cloudLeft,-0.02));


		var cloudC = extendArrayWithDuplicate(colors.cloudWhite, cloudV.length, COLORCOMP)

        console.log(cloudV);
        objArr[0] = createShape(gl,
            gl.TRIANGLE_FAN,
            cloudV,
            cloudC,
            transform.translate(0,0)
        );
    popTransform();



    return objArr;


}
