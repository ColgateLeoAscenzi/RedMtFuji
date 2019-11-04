//*------------------ Helpers ---------------------------//
function radians( degrees ) {
  return degrees * Math.PI / 180.0;
}

function degrees( radians ) {
  return radians * 180 / Math.PI;
}


function polarToCart(pPoint) {
    //point = [r, degrees]
    var r = pPoint[0];
    var degreess = pPoint[1]
    return [r*Math.cos(radians(degreess)), r*Math.sin(radians(degreess))];
}

function cartToPolar(cPoint){
    //point= = [x, y]
    var nx = cPoint[0];
    var ny = cPoint[1];

    return [Math.sqrt(nx*nx + ny*ny), Math.atan2(ny, nx)*(180.0/Math.PI)];
}

function unrotate(oldPoint, rotationAngle, sideNum){
    var sumOfIntAng = (sideNum-2)*180;
    var nP = [oldPoint[0], oldPoint[1]];
    var nPP = cartToPolar(nP);
    var nC = polarToCart([nPP[0], nPP[1]-degrees(rotationAngle)-((-sumOfIntAng)/(2*sideNum))]);
    return nC;
}
