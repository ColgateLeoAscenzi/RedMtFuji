var colors = {
    "darkBrown":[64/255,35/255,19/255, 1],
    "mediumBrown":[103/255,40/255,20/255, 1],
    "darkRed":[165/255,55/255,21/255, 1],
    "mediumRed":[165/255,55/255,21/255, 1]
}
//Draws background with mount fuji and sky
function mtFujiGen(){
    var objArr = [];
    pushTransform();

        //crest left side
        var bezier1 = bendLine([0.43,0.565], [0.33,0.4], [0.33,0.4], [0.175,0.2], 500,  false, colors.darkBrown, colors.mediumRed);
        var fujiCrestV = xnoise(bezier1[0], 0.01);
        var fujiCrestC = bezier1[1];
        //crest bottom
        // var bezier2 = bendLine([0.175,0.2], [0.5,0.1], [0.5,0.1], [0.7,0.2], false, colors.darkRed);
        //middle line
        var bezier2 = bendLine([0.48,0.565], [0.48,0.38], [0.48,0.32], [0.48,0.2], 500, false, colors.darkBrown, colors.mediumRed);
        // fujiCrestV = mixConcat(fujiCrestV, bezier2[0], VERTCOMP);
        // fujiCrestC = mixConcat(fujiCrestC, bezier2[1], COLORCOMP);
        fujiCrestV = mixConcat(fujiCrestV, bezier2[0], VERTCOMP);
        fujiCrestC = mixConcat(fujiCrestC, bezier2[1], COLORCOMP);
        //
        // //myConcat(fujiCrestV, bezier2[0]);
        // //myConcat(fujiCrestC, bezier2[1]);
        //
        // //crest right
        var fujiCrestV1 = [];
        var fujiCrestC1 = [];

        var bezier3 = bendLine([0.51,0.565], [0.6,0.35], [0.57,0.36], [0.7,0.2], 500, false, colors.darkBrown, colors.mediumRed);
        fujiCrestV1 = mixConcat(bezier2[0], xnoise(bezier3[0], 0.01), VERTCOMP);
        fujiCrestC1 = mixConcat(bezier2[1], bezier3[1], COLORCOMP);

        myConcat(fujiCrestV, fujiCrestV1);
        myConcat(fujiCrestC, fujiCrestC1);
        //
        // //crest top, mountain top
        // var bezier3 = bendLine([0.51,0.565], [0.49,0.565], [0.45,0.565], [0.43,0.565], false, colors.darkBrown);
        // myConcat(fujiCrestV, ynoise(bezier3[0], 0.01));
        // myConcat(fujiCrestC, bezier3[1]);
        objArr[0] = createShape(gl,
            gl.LINES,
            fujiCrestV,
            fujiCrestC,
            transform.translate(0,0)
        );

    popTransform();

    return objArr;


}
