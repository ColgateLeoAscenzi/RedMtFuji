//this code will handle the overall body of the project
function drawScene(){
    pushTransform();
        //adjust for aspect ratio
        transform.scale(0.66666666,1);

        // drawAll();
    popTransform();

}

function drawAll(){
    var allShapes = [];
    var mtFujiShapes = mtFujiGen();
	var borderShapes = borderGen();
    var backgroundShapes = backgroundGen();
    
    myConcat(allShapes, backgroundShapes);
    myConcat(allShapes, mtFujiShapes);
	myConcat(allShapes, borderShapes);

    for(var i = 0; i < allShapes.length;i++){
        drawShape(gl, allShapes[i]);
    }
    console.log(allShapes);
}
