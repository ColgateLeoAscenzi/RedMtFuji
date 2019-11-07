function cloudGen(){
    var objArr = [];


    pushTransform();
    //the spawn area the clouds can be inside
    var gridV1 = [[-0.94,-0.45], [-0.85, 0.85],[ 0, 0.85], [0.9, 0.85], [0.9, 0.3], [-0.3, -0.35]];
    //the spawn area they can't be
    var gridV = [[-0.16, 0.3], [-0.16, 0.6],[ 0.3,0.8], [0.6, 0.79], [0.63, 0.70], [0.65, 0.5]];

    //the big cloud on the horizon in the bottom right
    var gridV2 = [-0.99,-0.67, -0.99, -0.3];
    var bigTop = bendLine([-0.99,-0.3], [-0.8, -0.3], [-0.7, -0.3], [-0.1, -0.3], 30,  false, colors.cloudWhite, colors.cloudWhite)[0];
    myConcat(gridV2, ynoise(bigTop, 0.02));

    var gridC2 =  extendArrayWithDuplicate(colors.cloudWhite, gridV.length/VERTCOMP, COLORCOMP);
        objArr[0] = createShape(gl,
            gl.TRIANGLE_FAN,
            gridV2,
            gridC2,
            transform.translate(0,0)
        );
    popTransform();

    var cloudTarget = 150;
    var clouds = 1;
    var currentY = -0.45+0.02;
    var rows = 13
    var i = 0;

        while (clouds < cloudTarget){
            var xRoot = -1 + 2*Math.random();
            var yRoot = -1 + 2*Math.random();
            var rootTL = [xRoot, yRoot];
            // for(var j = 0; j < allShapes; j++){
                // if( !(inside(rootTL, allShapes[j])) && !(inside(rootBR, allShapes[j])) ){
                if(inside(rootTL, gridV1) && (!inside(rootTL, gridV))){
                    pushTransform();

                        var cloudV = [];
                        //top left root to be random generated
                        var rootTL = [xRoot, yRoot];
                        var length = 0.05 + Math.random()*0.45;
                        //top right corner
                        var rootTR = [rootTL[0]+length, rootTL[1]];
                        var height = 0.005;
                        //bottom left
                        var rootBL = [rootTL[0], rootTL[1]-height];
                        var rootBR = [rootTL[0] + length, rootTL[1] - height];

                        //bottom right
                        //var rootBR = [rootTL[0] + length, rootTL[1] - height];
                        //gives top left to top right to bottom right to bottom left drawing with midpoints
                        var cloudTop = bendLine(rootTL, [rootTL[0]+(length*0.25),rootTL[1]+0.05], [rootTL[0]+(length*0.75),rootTL[1]+0.05], rootTR, 30,  false, colors.cloudWhite, colors.cloudWhite)[0];
                        var cloudRight = bendLine(rootTR, [rootTR[0],rootTR[1]-0.25*height], [rootTR[0],rootTR[1]-0.75*height], rootBR, 5,  false, colors.cloudWhite, colors.cloudWhite)[0];
                        var cloudBottom = bendLine(rootBR, rootBR, rootBL, rootBL, 3,  false, colors.cloudWhite, colors.cloudWhite)[0];
                        var cloudLeft = bendLine(rootBL, [rootBL[0],rootBL[1]-(0.25*height)], [rootBL[0],rootBL[1]-(0.75*height)], rootTL, 3,  false, colors.cloudWhite, colors.cloudWhite)[0];

                        myConcat(cloudV, ynoise(cloudTop, 0.02));
                        myConcat(cloudV, xnoise(cloudRight,0.0));
                        myConcat(cloudV, truenoise(cloudBottom, 0, 0.02));
                        myConcat(cloudV,  xnoise(cloudLeft,-0.02));

                        var cloudC = extendArrayWithDuplicate(colors.cloudWhite, cloudV.length, COLORCOMP)

                        // console.log(cloudV);
                        objArr[clouds] = createShape(gl,
                            gl.TRIANGLE_FAN,
                            cloudV,
                            cloudC,
                            transform.translate(0,0)
                        );
                        clouds++;
                    popTransform();
                }

            }



            //dark blue top
            pushTransform();

                var backgroundV = [-1,0.84, -1,1, 1,1, 1, 0.84];
                var backgroundC = [];
                myConcat(backgroundC, colors.darkBlue);
                myConcat(backgroundC, colors.darkBlue);
                myConcat(backgroundC, colors.darkBlue);
                myConcat(backgroundC, colors.darkBlue);
                objArr[clouds] = createShape(gl,
                    gl.TRIANGLE_FAN,
                    backgroundV,
                    backgroundC,
                    transform.translate(0,0)
                );
            popTransform();




    return objArr;


}


function toPoints(array){
    var pointyArr = [];
    for(var i = 0; i < array.length-1; i++){
        pointyArr.push([array[i], array[i+1]]);

    }
    return pointyArr;
}
