function lavaGen(){
    var objArr = [];

    // upper perma lava
    pushTransform();
    //the big cloud on the horizon in the bottom right
    var topLavaV = [0.41,0.565, 0.53, 0.565];
    var bigTopLava = bendLine([0.53,0.565], [0.46, 0.57], [0.46, 0.57], [0.41,0.565], 30,  false, colors.cloudWhite, colors.cloudWhite)[0];
    myConcat(topLavaV, ynoise(bigTopLava, 0.01));

    var topLavaC =  extendArrayWithDuplicate(colors.cloudWhite, bigTopLava.length/VERTCOMP, COLORCOMP);
        objArr[0] = createShape(gl,
            gl.TRIANGLE_FAN,
            topLavaV,
            topLavaC,
            transform.translate(0,0)
        );
    popTransform();

    return objArr;

}

function lavaFractalGen(){

        //definitely right and left ones
        var currentPos = [0.43, 0.565, -105];
        drawFractal(5, currentPos, true);
        currentPos = [0.51, 0.565, -80];
        drawFractal(5, currentPos, true);
        //potential middle
        for(var i = 0; i < 1+Math.random()*2;i++){
            var currentPos = [0.43+Math.random()*0.08,0.565,-(85+Math.random()*10)];

                drawFractal(5, currentPos, false);

        }
}
