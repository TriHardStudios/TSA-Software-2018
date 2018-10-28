//jordan's code

function newCube(x, y, z){
    var newGeometry = new THREE.BoxGeometry(1 , 1, 1);
    var color = getRandomColor();
    var newMaterial = new THREE.MeshBasicMaterial({color: color});
    shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
    var length = scales.length;
    newGeometry.name = "cube"
    scales[length]=[];
    scales[length][0]=x;
    scales[length][1]=y;
    scales[length][2]=z;
    scene.add(shapes[shapes.length-1]);
    selectedShape++;
    setSelectedShape(selectedShape);
}


function cubeDimension(dimension, value){
    switch(dimension){
        case "x":
            scales[selectedShape][0]=value;
            break;
        case "y":
            scales[selectedShape][1]=value;
            break;
        case "z":
            scales[selectedShape][2]=value;
            break;
    }
}


function removeCube(){
    if(selectedShape >= 0){
        scene.remove(shapes[selectedShape]);
        shapes.splice(selectedShape,1);
        scales.splice(selectedShape,1);
        selectedShape--;
        setSelectedShape(selectedShape);
    }
}