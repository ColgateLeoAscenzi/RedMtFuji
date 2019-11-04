var eqTri = genTriangle([0,0], 1, [60,60,60]);

function waveBody(){

    //center
    pushTransform();
        transform.scale(0.7);
        transform.translate(-1,-0.3);
        hexagon([0,0], [0,0], [darkBlue, concatColor([darkBlue, whiteShadow, lightBlue]), darkBlue, lightBlue, darkBlue, lightBlue], 1);
    popTransform();

    //left leg
    pushTransform();
        transform.scale(0.7);
        transform.translate(-2.5,-1.165);
        filledTriangle(lightBlue, eqTri);
    popTransform();

    pushTransform();
        transform.scale(0.7);
        transform.translate(-0.5,-1.165);

        filledTriangle(lightBlue, eqTri);
    popTransform();

    pushTransform();
        transform.scale(0.7);
        transform.translate(-1.5,0.565);
        var curveVerts = curveTriangle([0,0], 1, [60,60,60], [0.45,0.15], [0.35,0.35], false);
        filledTriangle(lightBlue, curveVerts, "gl.TRIANGLE_FAN");
        // filledTriangle(lightBlue, curveTriangle([0,0], 1, [60,60,60], [0.45,0.15], [0.35,0.35], false), "gl.TRIANGLE_FAN");
        spawnCrests(curveVerts.slice(2,curveVerts.length-2));
    popTransform();

    // pushTransform();
    //     transform.scale(0.4);
    //     transform.translate(0,0);
    //     pentagon([0,0], [0,0], [red], 1);
    // popTransform();


}

function mtFuji(){
    pushTransform();
        filledTriangle(red, genTriangle([0,0], 1, [45,45,90]));
    popTransform();
}
