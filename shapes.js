//corbin wrote this method, simplified by Jordan
function moveShape(dimension, value) {
    shapes[selectedShape].position[dimension] = Number(value);
}


function rotateShape(dimension, value) {
    shapes[selectedShape].rotation[dimension] = Number(value)*Math.PI/180;
}
