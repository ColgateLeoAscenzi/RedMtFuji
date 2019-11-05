function treeGen(){
    var objArr = [];


    // pushTransform();
    // //the spawn area for the trees
    var gridV = [-0.94,-0.89, -0.94, -0.65, -0.6,-0.5, -0.2, -0.25, -0.18,-0.4];
    var gridRight = bendLine([-0.18, -0.4], [0,-0.6], [0,-0.6], [0.4,-0.9], 15,  false, colors.darkBrown, colors.lightBrown);
    myConcat(gridV, xnoise(gridRight[0], 0.35));
    var gridC =  extendArrayWithDuplicate([1,0,0,1], gridV.length/VERTCOMP, COLORCOMP) ;

    //     objArr[0] = createShape(gl,
    //         gl.LINE_LOOP,
    //         gridV,
    //         gridC,
    //         transform.translate(0,0)
    //     );
    // popTransform();

    var boundingGrid = [];
    for(var i = 0; i < gridV.length-1; i+=2){
        var temp = [gridV[i], gridV[i+1]];
        boundingGrid.push(temp);
    }

    //MOUNTAIN ZONE TREES

    var plantedTreeGoal = 2000;
    var plantedTrees = 0;
    var treeBase = 0.01
    while (plantedTrees < plantedTreeGoal){

            var rootX = -1 + Math.random()*1.75;
            var rootY = -1 + Math.random()*0.75;
            if(inside([rootX,rootY], boundingGrid)){
                pushTransform();
                    var treeV = truenoise([rootX,rootY, rootX+treeBase,rootY, (rootX+(treeBase/2)),(rootY+(treeBase*2))], treeBase*0.2, treeBase*0.2);
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
                    plantedTrees+= 1;
                popTransform();

            }


    }
    //BOTTOM TREES

    plantedTreeGoal += 1000;
    treeBase = 0.015;
    while (plantedTrees < plantedTreeGoal){

            var rootX = -1 + Math.random()*(0.5+Math.random()*0.25);
            var rootY = -1 + Math.random()*0.75;
            if(inside([rootX,rootY], boundingGrid)){
                pushTransform();
                    var treeV = truenoise([rootX,rootY, rootX+treeBase,rootY, (rootX+(treeBase/2)),(rootY+(treeBase*2))], treeBase*0.2, treeBase*0.2);
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
                    plantedTrees+= 1;
                popTransform();

            }


    }

    return objArr;


}
