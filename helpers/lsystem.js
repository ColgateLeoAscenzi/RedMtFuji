
var rule1 = {
	"in": "X",
	"out": "X+YF+",
	"chance": "1"
}
var rule2 = {
	"in": "Y",
	"out": "-LX-Y",
	"chance": "1"
}
//
// var rule2 = {
// 	"in": "Y",
// 	"out": "X+YF+",
// 	"chance": "1"
// }


var Ldefinitions = new Object();
Ldefinitions["F"] = "drawTriangle(distance, tan, currentPos, 'gl.TRIANGLE_FAN', false);drawTriangle(distance, darkBlue, currentPos, 'gl.LINE_LOOP', true);";
Ldefinitions["L"] = "drawTriangle(distance, tan, currentPos, 'gl.TRIANGLE_FAN', false);drawTriangle(distance, darkBlue, currentPos, 'gl.LINE_LOOP', true);";
Ldefinitions["+"] =  "changeAngle(-90, currentPos)";
Ldefinitions["-"] =  "changeAngle(90, currentPos)";
//
// Ldefinitions["["] = "pushCoords(transformStack, currentPos);"+
//           			"";
// Ldefinitions["]"] = "popCoords(transformStack, currentPos);"+
//           			"";

var Lsystem = {
	"rules": [rule1, rule2],
	"axiom": "FX",
	"alphabet": ["X","F", "Y","+","-"],
	"definitions": Ldefinitions
}


function generateIteration(generation, word){
	console.log(Lsystem);
	if(generation == 0){
		word = Lsystem.axiom;
		generation++;
	}
	else{
		word = nextGeneration(word);
		generation++;
	}

	return word;
}


function nextGeneration(word){
	var outWord = ""
	var added = false;
	for(var i = 0; i < word.length; i++){
		var currChar = word[i];
	 	added = false;
		for(var j = 0; j < Lsystem.rules.length;j++){
			if(Lsystem.rules[j].in == currChar){
				var currRule = selectRule(currChar);
				// console.log("Current rule: ")
				// console.log(currRule);
				outWord += currRule["out"];
				added = true;
				break;
			}
		}
		if(!added){
			outWord+= currChar;
		}
	}
	return outWord
}

function selectRule(currChar){
	var chances = [0,0,0,0,0,0,0,0,0,0];
	var count = 0;
	for(var j = 0; j < Lsystem.rules.length;j++){
		if(Lsystem.rules[j].in == currChar){
			for(var i = 0; i < Lsystem.rules[j].chance*10; i++){
				chances[count] = Lsystem.rules[j];
				count += 1;
			}
		}
	}
	// console.log(chances);
	//



	var rand = Math.round(Math.random() * (count-1));
	return chances[rand];

}


function drawFractal(generations, currentPosN){
	word = "";
	for(var i = 0; i < generations; i++){
		word= generateIteration(i, word);
		// console.log(word);
	}
	var transformStack = [];
    pushTransform();

        currentPos = currentPosN;
		var distance = 1;
        var newWord = word
        for(var i = 0; i < newWord.length; i++){
				var definitionsHash = Lsystem.definitions;
                var newRule = eval(definitionsHash[newWord[i]])
				//distance -= 0.01;

        }
    popTransform();
}

function drawForward(distance, color, currentPos){
    if(color == undefined){
        color = [1,0,0,1];
    }
    drawLine(currentPos[0],currentPos[1],currentPos[2], distance, color);
    currentPos[0]+= Math.cos(radians(currentPos[2]))*distance;
    currentPos[1]+= Math.sin(radians(currentPos[2]))*distance;
}

function drawTriangle(distance, color, currentPos, drawMode, move){
    if(color == undefined){
        color = [1,0,0,1];
    }
	if(drawMode == undefined){
		drawMode = "gl.TRIANGLE_FAN";
	}
	//currentPos[0] -= Math.cos(radians(currentPos[2]))*distance/2;
	//currentPos[1] -= Math.sin(radians(currentPos[2]))*distance/2;
	pushTransform();
		transform.rotateAbout(currentPos[0], currentPos[1], radians(currentPos[2]));
	    filledTriangle(color, genTriangle([currentPos[0],currentPos[1]], distance, [90,30,60]), drawMode);
		if(move){
			currentPos[0]+= Math.cos(radians(currentPos[2]))*distance;
			currentPos[1]+= Math.sin(radians(currentPos[2]))*distance;
		}

	popTransform();
}


function changeAngle(newAngle, currentPos){
    currentPos[2] += newAngle;
}

function pushCoords(transformStack, currentPosN){
    var copy = [currentPosN[0], currentPosN[1], currentPosN[2]];
    transformStack.push(copy);
}

function popCoords(transformStack, currentPosN){
    currentPos = transformStack.pop();
}
