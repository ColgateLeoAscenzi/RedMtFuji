//THIS FILE WILL INCLUDE THE CODE
//FOR TRANSFORMING AND MAKING A BIG WAVE
//HIGH LEVEL WAVE PIECES
function bigwave(){
    pushTransform();
        waveBody();
    popTransform();
}


//high level fractal
function fractal(){
    var generations = 5;
    var currentPosN = [0,0,0];
    pushTransform();
        transform.translate(-1,0);
        transform.scale(0.2);
        waveFractal(generations, currentPosN);
    popTransform();
}
