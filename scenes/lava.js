function lavaGen(){
    var objArr = [];
    //definitely right and left ones
    var currentPos = [0.43, 0.565, -105];
    drawFractal(5, currentPos, false);
    currentPos = [0.51, 0.565, -75];
    drawFractal(5, currentPos, false);
    //potential middle
    for(var i = 0; i < 1+Math.random()*2;i++){
        var currentPos = [0.43+Math.random()*0.08,0.565,-(85+Math.random()*10)];

            drawFractal(5, currentPos, true);

    }






    return objArr;


}
