/*

    This file handles all conversion from JSONS to renderable objects and arrays.
    It will also verify that the data loaded in to memory is valid by mainly checking for NaNs

        This file is licensed under the Apache 2.0 license.
        That means that you can freely use and modify this code for all uses except for
            commercial use provided this header is at the top of all files
        Copyright 2018-2019 Monarch TSA
 */
var lastLoadedShape;

class conversion {

    static isShape(tst){
        try {
            if (tst.geometry.type === "BoxGeometry"
                || tst.geometry.type === "ConeGeometry"
                || tst.geometry.type === "CylinderGeometry"
                || tst.geometry.type === "Geometry"//this is for OBJs
                || tst.geometry.type === "DodecahedronGeometry"
                || tst.geometry.type === "IcosahedronGeometry"
                || tst.geometry.type === "OctahedronGeometry"
                || tst.geometry.type === "TetrahedronGeometry"
                || tst.geometry.type === "SphereGeometry"
                || tst.geometry.type === "TorusGeometry"
                || tst.geometry.type === "TextGeometry"
            ) {
                lastLoadedShape = tst;
                return true;
            }
            return false;
        } catch (TypeError) {
            return false;
        }

    }

    static isLight(tst){
        try {
            if(tst.type === "PointLight"
                || tst.type === "AmbientLight"
                || tst.type === "DirectionalLight"
                || tst.type === "SpotLight"
                || tst.type === "HemisphereLight")
                return true;
            return false;
        }catch (TypeError) {
            return false
        }


    }

    static addBorder(badBorder){
        let createdEdges = new THREE.EdgesGeometry(lastLoadedShape.geometry);
        let createdGeometry = new THREE.LineSegments(createdEdges, new THREE.LineBasicMaterial( {color: badBorder.material.color} ));
        createdGeometry.visible = badBorder.visible;
        createdGeometry.position.x = lastLoadedShape.position.x;
        createdGeometry.position.y = lastLoadedShape.position.y;
        createdGeometry.position.z = lastLoadedShape.position.z;
        createdGeometry.scale.x = lastLoadedShape.scale.x;
        createdGeometry.scale.y = lastLoadedShape.scale.y;
        createdGeometry.scale.z = lastLoadedShape.scale.z;
        createdGeometry.rotation.x = lastLoadedShape.rotation.x;
        createdGeometry.rotation.y = lastLoadedShape.rotation.y;
        createdGeometry.rotation.z = lastLoadedShape.rotation.z;

        lastLoadedShape =null;
        return createdGeometry;
    }


    static isBoarder(tst){
        try{
            return tst.type === "LineSegments";

        }catch (TypeError) {
            return false;
        }



    }

    static convertJSONToScene(JSONString){
        if(JSONString.object.type !== "Scene")
            return;
        let JSONLoader = new THREE.ObjectLoader();

        return JSONLoader.parse(JSONString);

    }

    static toRenderableArr(stagedArray, arrayType, creationFunct){


    }


    static breakoutScene(stagedScene){
        let extractedArray = [[],[],[], [], Object, []];
        if(stagedScene.children !== undefined) {
            for (let i = 0; i < stagedScene.children.length; i++) {
                if (this.isShape(stagedScene.children[i])) {
                    if(isNaN(stagedScene.children[i].rotation._x) ||  isNaN(stagedScene.children[i].rotation._y) || isNaN(stagedScene.children[i].rotation._z)){
                        stagedScene.children[i].rotation.x = 0;
                        stagedScene.children[i].rotation.y = 0;
                        stagedScene.children[i].rotation.z = 0;

                    }
                    extractedArray[0].push(stagedScene.children[i]);
                    extractedArray[1].push([stagedScene.children[i].scale.x, stagedScene.children[i].scale.y, stagedScene.children[i].scale.z]);

                } else if (this.isBoarder(stagedScene.children[i])) {
                    stagedScene.children[i]= this.addBorder(stagedScene.children[i]);
                    extractedArray[2].push(stagedScene.children[i]);
                } else if (this.isLight(stagedScene.children[i])){
                    //this might break things as im assuming that only lights are the extra element so we are pushing this to lights
                    extractedArray[3].push(stagedScene.children[i]);
                } else if (stagedScene.children[i].isObject3D){
                    extractedArray[5].push(stagedScene.children[i]);
                }


            }
        }
        extractedArray[4] = stagedScene;
        console.log(extractedArray);
        return extractedArray;

    }

    static toSavableArr(stagedArray, arrayType){
        let savableArray =[];

        if(arrayType ==="lights"){
            for(let i = 0; i < stagedArray.length; i++){
                savableArray.push({
                    type: stagedArray[i].type,
                    positionX: stagedArray[i].position.x,
                    positionY: stagedArray[i].position.y,
                    positionZ: stagedArray[i].position.z,
                    r: stagedArray[i].color.r,
                    g: stagedArray[i].color.g,
                    b: stagedArray[i].color.b,
                    intensity: stagedArray[i].intensity,
                });
                if(stagedArray[i].name === "Hemisphere light"){
                    savableArray[i] += {
                        r2: stagedArray[i].groundColor.r,
                        g2: stagedArray[i].groundColor.g,
                        b2: stagedArray[i].groundColor.b,
                    };

                }

            }

        }

        else if (arrayType === "shapes"){
            for(let i =0; i < stagedArray[0].length; i++){
                savableArray.push({
                    type: stagedArray[0][i].geometry.type,
                    positionX: stagedArray[0][i].position.x,
                    positionY: stagedArray[0][i].position.y,
                    positionZ: stagedArray[0][i].position.z,
                    r: stagedArray[0][i].material.color.r,
                    g: stagedArray[0][i].material.color.g,
                    b: stagedArray[0][i].material.color.b,
                    borders: stagedArray[1][i].visible,
                    borderR: stagedArray[1][i].material.color.r,
                    borderG: stagedArray[1][i].material.color.g,
                    borderB: stagedArray[1][i].material.color.b,
                });

            }

        }
        else{
            savableArray = stagedArray;
        }
        console.log(savableArray);//DEBUG
        return savableArray;

    }


}