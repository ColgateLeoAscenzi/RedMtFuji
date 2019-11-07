var rule1 = {
	"in": "1",
	"out": "11",
	"chance": "0.9"
}
var rule2 = {
	"in": "0",
	"out": "1[0]0",
	"chance": "0.5"
}
var rule4 = {
	"in": "0",
	"out": "1[]0",
	"chance": "0.2"
}
var rule5 = {
	"in": "0",
	"out": "1[0]",
	"chance": "0.2"
}
var rule6 = {
	"in": "0",
	"out": "1[]",
	"chance": "0.1"
}
var rule3 = {
	"in": "1",
	"out": "1",
	"chance": "0.1"
}

var Ldefinitions = new Object();
Ldefinitions["0"] = "drawForward(0.045,colors.cloudWhite, currentPos);";
Ldefinitions["1"] = "drawForward(0.045, colors.cloudWhite, currentPos);";
Ldefinitions["["] =  "pushCoords(transformStack, currentPos);changeAngle(10+Math.random()*10, currentPos)";
Ldefinitions["]"] =  "popCoords(transformStack, currentPos);changeAngle(-(10+Math.random()*10), currentPos)";


var Lsystem = {
	"rules": [rule1, rule2, rule3, rule4, rule5, rule6],
	"axiom": "0",
	"alphabet": ["0","1", "[","]"],
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


function drawFractal(generations, currentPosN, randomLength){
	var coords = [];
	word = "";
	for(var i = 0; i < generations; i++){
		word= generateIteration(i, word);
		// console.log(word);
	}
	if(randomLength){
		word = word.slice(5+Math.random()*5,word.length);

	}
	var transformStack = [];
    pushTransform();

        currentPos = currentPosN;
		var distance = 0.01;
        var newWord = word
        for(var i = 0; i < newWord.length; i++){
				var definitionsHash = Lsystem.definitions;
                var newRule = eval(definitionsHash[newWord[i]])
				// myConcat(coords, newRule);

        }
    popTransform();

	return coords;
}

function drawForward(distance, color, currentPos){


    if(color == undefined){
        color = [1,0,0,1];
    }

	drawThickLine(currentPos[0],currentPos[1],currentPos[2], distance, color);
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
