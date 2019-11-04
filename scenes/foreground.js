//draws the foreground waves
function foreground(){
	pushTransform();
        filledTriangle(red, curveTriangle([0,0], 1, [60,60,60], [0.45,0.15], [0.35,0.35], false), "gl.LINE_LOOP");
    popTransform();

}
