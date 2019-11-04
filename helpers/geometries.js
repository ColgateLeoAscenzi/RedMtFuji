var eqTri = genTriangle([0,0], 1, [60,60,60]);

function waveBody(){

    //center
    pushTransform();
        var mountainVert = [-1.5,-1,  1.5,-1,  1.5,0,  1,0.54,  0.8, 0.54,  -1.5,-0.6]
        filledShape([156/255,53/255,20/255], mountainVert, "gl.LINE_LOOP");
    popTransform();



}

function mtFuji(){
    pushTransform();
        filledTriangle(red, genTriangle([0,0], 1, [45,45,90]));
    popTransform();
}

function bezierMountain(points){
    
}
