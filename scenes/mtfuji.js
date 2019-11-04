var colors = {
    "darkBrown":[64/255,35/255,19/255, 1],
    "mediumBrown":[103/255,40/255,20/255, 1],
	"lightBrown":[123/255,45/255,20/255, 1],
	"darkRed":[165/255,55/255,21/255, 1],
    "mediumRed":[165/255,55/255,21/255, 1],
	"lighterRed":[170/255,62/255,22/255, 1],
	"tan": [201/255,171/255,131/255, 0.2]
}
//Draws background with mount fuji and sky
function mtFujiGen(){
    var objArr = [];
    pushTransform();

        //crest left side
        var leftTop = bendLine([0.43,0.565], [0.33,0.4], [0.33,0.4], [0.175,0.2], 500,  false, colors.darkBrown, colors.lightBrown);
        var fujiCrestV = xnoise(leftTop[0], 0.01);
        var fujiCrestC = leftTop[1];
        //crest bottom
    
        //middle line
        var middleTop = bendLine([0.48,0.565], [0.48,0.38], [0.48,0.32], [0.48,0.2], 500, false, colors.darkBrown, colors.lightBrown);
        // fujiCrestV = mixConcat(fujiCrestV, middleTop[0], VERTCOMP);
        // fujiCrestC = mixConcat(fujiCrestC, middleTop[1], COLORCOMP);
        fujiCrestV = mixConcat(fujiCrestV, middleTop[0], VERTCOMP);
        fujiCrestC = mixConcat(fujiCrestC, middleTop[1], COLORCOMP);
        
        // //crest right
        var fujiCrestV1 = [];
        var fujiCrestC1 = [];

        var rightTop = bendLine([0.51,0.565], [0.6,0.35], [0.57,0.36], [0.7,0.2], 500, false, colors.darkBrown, colors.lightBrown);
        fujiCrestV1 = mixConcat(middleTop[0], xnoise(rightTop[0], 0.01), VERTCOMP);
        fujiCrestC1 = mixConcat(middleTop[1], rightTop[1], COLORCOMP);

        myConcat(fujiCrestV, fujiCrestV1);
        myConcat(fujiCrestC, fujiCrestC1);

        objArr[0] = createShape(gl,
            gl.LINES,
            fujiCrestV,
            fujiCrestC,
            transform.translate(0,0)
        );
	
	//RESETTING VARIABLES
		fujiCrestV = [];
		fujiCrestC = [];
		fujiCrestV1 = [];
		fujiCrestC1 = [];
	
	    //mt fuji middle
        var leftMiddle = bendLine([0.175,0.2], [0.12, 0.1], [0.12,0.08], [-0.125,-0.165], 500,  false, colors.lightBrown, colors.mediumRed);
        fujiCrestV = xnoise(leftMiddle[0], 0.01);
        fujiCrestC = leftMiddle[1];
   
    
        //middle line
        var middleMiddle = bendLine([0.48,0.2], [0.48,0.1], [0.48,0.0], [0.48,-0.165], 500, false, colors.lightBrown, colors.mediumRed);
		
        fujiCrestV = mixConcat(fujiCrestV, middleMiddle[0], VERTCOMP);
        fujiCrestC = mixConcat(fujiCrestC, middleMiddle[1], COLORCOMP);
        

        var rightMiddle = bendLine([0.7,0.2], [0.78,0.1], [0.90,-0.05], [1.0,-0.165], 500, true, colors.lightBrown, colors.mediumRed);
        fujiCrestV1 = mixConcat(middleMiddle[0], xnoise(rightMiddle[0], 0.01), VERTCOMP);
        fujiCrestC1 = mixConcat(middleMiddle[1], rightMiddle[1], COLORCOMP);

        myConcat(fujiCrestV, fujiCrestV1);
        myConcat(fujiCrestC, fujiCrestC1);

        objArr[1] = createShape(gl,
            gl.LINES,
            fujiCrestV,
            fujiCrestC,
            transform.translate(0,0)
        );
	
	
	//RESETTING VARIABLES
		fujiCrestV = [];
		fujiCrestC = [];
		fujiCrestV1 = [];
		fujiCrestC1 = [];
	
	    //mt fuji bottom
        var leftBottom = bendLine([-0.125,-0.165], [-0.126, -0.166], [-0.26,-0.30], [-0.425,-0.40], 500,  true, colors.mediumRed, colors.lighterRed);
        fujiCrestV = xnoise(leftBottom[0], 0.01);
        fujiCrestC = leftBottom[1];

    
        //middle line
        var middleBottom = bendLine([0.48,-0.165], [0.48,-0.3], [0.48,-0.5], [0.48,-0.70], 500, false, colors.mediumRed, colors.lighterRed);
		
        fujiCrestV = mixConcat(fujiCrestV, middleBottom[0], VERTCOMP);
        fujiCrestC = mixConcat(fujiCrestC, middleBottom[1], COLORCOMP);
        

        var rightBottom = bendLine([1.2,-0.165], [0.78,-0.4], [0.90,-0.5], [1.2,-0.85], 500, true, colors.mediumRed, colors.lighterRed);
        fujiCrestV1 = mixConcat(middleBottom[0], xnoise(rightBottom[0], 0.01), VERTCOMP);
        fujiCrestC1 = mixConcat(middleBottom[1], rightBottom[1], COLORCOMP);

        myConcat(fujiCrestV, fujiCrestV1);
        myConcat(fujiCrestC, fujiCrestC1);

        objArr[2] = createShape(gl,
            gl.LINES,
            fujiCrestV,
            fujiCrestC,
            transform.translate(0,0)
        );
//	
//		fujiCrestV = [];
//		fujiCrestC = [];
//		fujiCrestV1 = [];
//		fujiCrestC1 = [];
//	
//	    //mt fuji bottom
//        var leftBottom = bendLine([-0.125,-0.165], [-0.126, -0.166], [-0.26,-0.30], [-0.425,-0.40], 28,  true, [0,0,0,0.1], [0,0,0,0.1]);
//        fujiCrestV = xnoise(leftBottom[0], 0.01);
//        fujiCrestC = leftBottom[1];
//
//    
//        //middle line
//        var middleBottom = bendLine([0.48,-0.165], [0.48,-0.3], [0.48,-0.5], [0.48,-0.70], 28, false, [0,0,0,0.1], [0,0,0,0.1]);
//		
//        fujiCrestV = mixConcat(fujiCrestV, middleBottom[0], VERTCOMP);
//        fujiCrestC = mixConcat(fujiCrestC, middleBottom[1], COLORCOMP);
//        
//
//        var rightBottom = bendLine([1.2,-0.165], [0.78,-0.4], [0.90,-0.5], [1.2,-0.85], 28, true, [0,0,0,0.1], [0,0,0,0.1]);
//        fujiCrestV1 = mixConcat(middleBottom[0], xnoise(rightBottom[0], 0.01), VERTCOMP);
//        fujiCrestC1 = mixConcat(middleBottom[1], rightBottom[1], COLORCOMP);
//
//        myConcat(fujiCrestV, fujiCrestV1);
//        myConcat(fujiCrestC, fujiCrestC1);
//	
//	    objArr[3] = createShape(gl,
//            gl.LINES,
//            fujiCrestV,
//            fujiCrestC,
//            transform.translate(0,0)
//        );


    popTransform();

    return objArr;


}
