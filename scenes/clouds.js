function cloudGen(){
    var objArr = [];
    pushTransform();

		var cloudV = [];
        //top left root to be random generated
        var rootTL = [-0.3, 0];
        var length = 2*Math.abs(rootTL[0]);
        //top right corner
        var rootTR = [rootTL[0]+length, rootTL[1]];
        var height = 0.04;
        //bottom left
        var rootBL = [rootTL[0], rootTL[1]-height];
        //bottom right
        var rootBR = [rootTL[0] + length, rootTL[1] - height];
        var cloudTop = bendLine(rootTL, [-0.04,0], [0.04,0], rootTR, 30,  false, colors.cloudWhite, colors.cloudWhite)[0];
        var cloudRight = bendLine(rootTR, [0.3,-0.02], [0.3,-0.04], rootBR, 5,  false, colors.cloudWhite, colors.cloudWhite)[0];
        var cloudBottom = bendLine(rootBR, [-0.04,-0.04], [0.04,-0.04], rootBL, 3,  false, colors.cloudWhite, colors.cloudWhite)[0];
        var cloudLeft = bendLine(rootBL, [-0.3,-0.02], [-0.3,-0.04], rootBR, 3,  false, colors.cloudWhite, colors.cloudWhite)[0];

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
