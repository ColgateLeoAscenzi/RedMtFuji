//THIS FILE WILL INCLUDE THE CODE
//FOR TRANSFORMING AND MAKING A BIG WAVE
//HIGH LEVEL WAVE PIECES
function bigwave(){
    pushTransform();
        // transform.scale(0.8);
        // transform.translate(-0.1,-0.3);
        waveBody();
    popTransform();
}


//high level fractal
function fractal(){
    pushTransform();
        transform.scale(-1,1);
        var generations = 8
        var currentPosN = [0,0,0];
        pushTransform();
            transform.translate(0,0);
            transform.scale(0.04);
            drawFractal(generations, currentPosN)
        popTransform();
        // currentPosN = [0,0,0];
        // pushTransform();
        //     transform.translate(0,0);
        //     transform.scale(0.04);
        //     waveFractal(generations, currentPosN);
        // popTransform();
    popTransform();

}
