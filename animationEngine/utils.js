/*
This file contains assorted functions that assist the animation engine with some things

This file is licensed under the Apache 2.0 license.
That means that you can freely use and modify this code for all uses except for
    commercial uses provided this header is at the top of all files
Copyright 2018-2019 Monarch TSA

Author Jordan

*/

function changeColor(value){
    //changes the color of the currently selected shape
    if(showingLight){
        lights[selectedLight].color.set(value);
    }
    else{
        shapes[selectedShape].material.color.set(value);
        shapes[selectedShape].material.needsUpdate = true;
    }

}

function rgbToHex (num) {
    //creates a hex value out of a number, used to set the html color elements, which require hex strings.
    let hex = Number(num).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

function addShape(){
    //tutorialMovement(0,0, "When you are done do stuff", true);
    document.getElementById('createTextMenu').style.display = 'none';
    let shapeType = document.getElementById("shapeSelector").value;
    saveEngine.save(true,false);
    //creates a 0x0x0 shape based on the selector element, with a red color and black borders.
    switch(shapeType){
        case "cube" :
            newCube(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "cylinder" :
            newCylinder(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "cone" :
            newCone(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "custom" :
            hideAll();
            document.getElementById('createCustomMenu').style.display = 'inherit';
            break;
        case "custom2" :
            hideAll();
            document.getElementById('FileUpload').style.display='inherit';
            break;
        case "dodecahedron" :
            newDodecahedron(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "icosahedron" :
            newIcosahedron(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "octahedron" :
            newOctahedron(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "pyramid" :
            newPyramid(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "ring" :
            newRing(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "sphere" :
            newSphere(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "text" :
            hideAll();
            document.getElementById('createTextMenu').style.display = 'inherit';
            break;
    }
}