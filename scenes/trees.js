function treeGen(){
    var objArr = [];


    pushTransform();
    //the spawn area for the trees
        var gridV = [-0.94,-0.89, -0.94, -0.65, -0.6,-0.5, -0.2, -0.25, -0.18,-0.4, -0.19,-0.52,
                    -0.1,-0.62, 0,-0.65, 0.3, -0.76, 0.5, -0.8, 0.4, -0.85];
        var gridC =  extendArrayWithDuplicate([1,0,0,1], gridV.length/VERTCOMP, COLORCOMP) ;

        objArr[0] = createShape(gl,
            gl.LINE_LOOP,
            gridV,
            gridC,
            transform.translate(0,0)
        );
    popTransform();

    var boundingGrid = [];
    for(var i = 0; i < gridV.length-1; i+=2){
        var temp = [gridV[i], gridV[i+1]];
        boundingGrid.push(temp);
    }

    var plantedTreeGoal = 1000;
    var plantedTrees = 1;
    while (plantedTrees < plantedTreeGoal){
        pushTransform();

            var rootX = -1 + Math.random()*2;
            var rootY = -1 + Math.random()*2;
            while(!inside([rootX,rootY], boundingGrid)){
                rootX = -1 + Math.random()*2;
                rootY = -1 + Math.random()*2;
            }
            var treeV = truenoise([rootX,rootY, rootX+0.01,rootY, (rootX+0.005),(rootY+0.02)], 0.002, 0.002);
            var treeC = [];
            myConcat(treeC, colors.darkGreen);
            myConcat(treeC, colors.darkGreen);
            myConcat(treeC, colors.darkGreen);

            objArr[plantedTrees] = createShape(gl,
                gl.TRIANGLES,
                treeV,
                treeC,
                transform.translate(0,0)
            );
        popTransform();
        plantedTrees+=1;

    }

    return objArr;


}
