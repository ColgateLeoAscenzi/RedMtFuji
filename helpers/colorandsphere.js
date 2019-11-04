//calculate shine position given light and center
function shinePos(lightPos, circleCenter){
    var lx = lightPos[0];
    var ly = lightPos[1];
    var cx = circleCenter[0];
    var cy = circleCenter[1];

    //subtract circle center from lightsource to get lightsource adjusted to 0
    //convert to polar and shorten radius by theoretical Z axis, here 1/7th of
    //original R. Convert back to cartesian centered around 0, then add circleCenter
    //back to get the official light center and return it
    var shineP = cartToPolar([lx-cx,ly-cy]);

    var shineC = polarToCart([shineP[0]/3, shineP[1]]);

    shineC[0]+=cx;
    shineC[1]+=cy;

    return shineC;

}


//help to create colors per vertex
function uniformColorGen(color, sides){
    var colorArr = [];
    for(var i = 0; i < sides; i++){
        colorArr.push(color[0]);
        colorArr.push(color[1]);
        colorArr.push(color[2]);
        colorArr.push(color[3]);
    }
    return colorArr;
}

function concatColor(colors){
    var outColor = [];
    for(var i = 0; i < colors.length; i++){
        var tempCol = colors[i];
        for(var j = 0; j < tempCol.length; j++){
            outColor.push(tempCol[j]);
        }
    }
    return outColor;
}


function fixCenter(oldCoords, newC, angle, sideNum){
    newCoords = []
    var unRotated = unrotate([newC[0], newC[1]], angle, sideNum);
    newCoords[0] = unRotated[0];
    newCoords[1] = unRotated[1];
    newCoords[2] = oldCoords[2];
    newCoords[3] = oldCoords[3];
    newCoords[4] = oldCoords[4];
    newCoords[5] = oldCoords[5];


    return newCoords;
}
