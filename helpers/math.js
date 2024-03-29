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



function myConcat(arr1, arr2){

    for(var i = 0; i < arr2.length; i++){
        arr1.push(arr2[i]);
    }

}

function mixConcat(arr1, arr2, mode){
    var mixArr = [];
    mixArr.length = arr1.length+arr2.length;
    var j = 0;
    for(var i = 0; i < arr1.length-mode-1; i+=mode){
        for(var l = 0; l < mode; l++){
            mixArr[j] = arr1[i+l];
            j += 1;
        }
        for(var l = 0; l < mode; l++){
            mixArr[j] = arr2[i+l];
            j += 1;
        }
    }
    // if(mode == 2){
    //     console.log(arr1);
    //     console.log(arr2);
    //     console.log(mixArr);
    // }

    return mixArr;

}

function extendArrayWithDuplicate(arr, nbElements, nbComponents) {
    var len = arr.length;

    var larger = [];
    //console.log(nbElements * nbComponents);
    larger.length = nbElements * nbComponents;

    for (var i = 0; i < larger.length; i++){
        larger[i] = arr[i % len];

    }

    return larger;
}


//making the mountain bumpy
function xnoise(line, amount){
    return noise(line, amount, 0);
}

function ynoise(line, amount){
    return noise(line, 0, amount);
}

function noise(line, xamount, yamount){
    //skip the start and end point
//    console.log(line);
    var lineOut = [];
    lineOut.length = line.length;
    for(var i = 0; i < line.length-1; i+=2){
        if(i == 0 || i == line.length-2){
            lineOut[i] = line[i];
            lineOut[i+1] = line[i+1];
        }
        else{
            lineOut[i] = line[i]+(-0.8*xamount + (2.2*Math.random()*xamount));
            lineOut[i+1] = line[i+1]+(-1*yamount + (2*Math.random()*yamount));
        }

    }
//    console.log(lineOut);

    return lineOut;
}

function truenoise(line, xamount, yamount){
    //skip the start and end point
//    console.log(line);
    var lineOut = [];
    lineOut.length = line.length;
    for(var i = 0; i < line.length-1; i+=2){
        lineOut[i] = line[i]+(-1*xamount + (2*Math.random()*xamount));
        lineOut[i+1] = line[i+1]+(-1*yamount + (2*Math.random()*yamount));
    }
//    console.log(lineOut);

    return lineOut;
}

//https://github.com/substack/point-in-polygon
function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};
