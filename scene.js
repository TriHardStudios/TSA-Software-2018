//allows user to change the position of the entire scene. This is useful if you want to move all of the shapes at the same time.
function scenePosition(dimension,value){
    scene.position[dimension]=Number(value);
}
//allows user to change the scale of the entire scene. This is useful if you want to change the diemsions of all of the shapes.
function sceneScale(dimension, value){
    scene.scale[dimension]=Number(value);
}

//allows the user to change the background color of the scene (default is black).
function sceneBackground(value){
    scene.background= new THREE.Color(value);
}

//allows user to change the rotate of the entire scene
function sceneRotation(dimension,value){
    scene.rotation[dimension] = Number(value)*Math.PI/180;
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    if (init) {
        renderer.setSize(UIDiemsions.std_body.renderer_width, UIDiemsions.std_body.renderer_height);
        //This is called whenever a user resizes the window. This makes sure that the scene window stays the correct size and aspect ratio.
        camera.aspect = UIDiemsions.std_body.renderer_width / UIDiemsions.std_body.renderer_height;
        // console.log(camera.aspect);
        camera.updateProjectionMatrix();
        updateTimeline();


        // camera.aspect = window.innerWidth / window.innerHeight;
        // camera.updateProjectionMatrix();
        //
        // renderer.setSize( window.innerWidth, window.innerHeight );
    }
}