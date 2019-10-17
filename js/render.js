var canvas = document.getElementById("renderCanvas");

var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
   
    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 1, Math.PI / 1.95, 185, new BABYLON.Vector3(0, 35, 0), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    	//Light direction is up and left
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    light.emissive = new BABYLON.Color3(0, 1, 1);

    // var defaultGridMaterial = new BABYLON.GridMaterial("default", scene);
    // defaultGridMaterial.majorUnitFrequency = 5;
    // defaultGridMaterial.gridRatio = 0.5;
    
    // var sphere = BABYLON.Mesh.CreateSphere("sphere", 20, 9, scene);
    // sphere.position.y = 12;
    // sphere.position.x = -6;
    // sphere.material = defaultGridMaterial;
    
    // var knotMaterial = new BABYLON.GridMaterial("knotMaterial", scene);
    // knotMaterial.majorUnitFrequency = 8;
    // knotMaterial.minorUnitVisibility = 0.45;
    // knotMaterial.gridRatio = 0.3;
    // knotMaterial.mainColor = new BABYLON.Color3(0, 0, 0);
    // knotMaterial.lineColor = new BABYLON.Color3(0.0, 1.0, 0.0);
        
    // var knot = BABYLON.Mesh.CreateTorusKnot("knot", 3, 1, 128, 64, 2, 3, scene);
    // knot.position.y = 12.0;
    // knot.position.x = 6;
    // knot.material = knotMaterial;

    var gridMat = new BABYLON.GridMaterial("gridMat", scene);
    gridMat.majorUnitFrequency = 0;
    gridMat.minorUnitVisibility = 1;
    gridMat.gridRatio = 15;
    gridMat.backFaceCulling = false;
    gridMat.mainColor = new BABYLON.Color3(0, 0, 0);
    gridMat.lineColor = new BABYLON.Color3(5, 0, 5)
    gridMat.opacity = 1;
    var grid = BABYLON.MeshBuilder.CreateGround("grid", {height: 400, width: 400, subdivisions: 4}, scene);
    grid.material = gridMat;

    BABYLON.SceneLoader.ImportMesh('', 'assets/', 'mountain.babylon', scene, function (assetmesh) {
        var mountain = assetmesh[0];
        var mountainMat = new BABYLON.StandardMaterial("mountainMat", scene);
        mountainMat.diffuseColor = new BABYLON.Color3(0, 0.4, 0.5);
        //mountainMat.emissiveColor = new BABYLON.Color3(0, 1, 1);
        mountain.position = new BABYLON.Vector3(140, -6, -50);
        mountain.scaling = new BABYLON.Vector3(25, 5, 15);
        mountain.rotation = new BABYLON.Vector3(-1.6, 1.5, 0);
        //var axis = new BABYLON.Vector3(30, 10, 10);
       // mountain.rotate(axis, 5,  BABYLON.Space.WORLD); 
       mountain.material = mountainMat;
       var gl = new BABYLON.GlowLayer('glow', scene);
        gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
            if (mesh === mountain) {
                result.set(0, 1, 1, 1);
            } else {
                result.set(0, 0, 0, 0);
            }
        }
        gl.intensity = 0.3;
         
    });
    var configSkyTexture = function (texture) {
        texture.vScale = texture.uScale = 1;
        return texture;
    }
    var skyMaterial = new BABYLON.StandardMaterial("skyMaterial", scene);
    skyMaterial.diffuseTexture =configSkyTexture(new BABYLON.Texture("textures/sky.jpg", scene));
    
    var skySphere = BABYLON.MeshBuilder.CreateSphere("skySphere", {diameter: 400, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    skySphere.material = skyMaterial;

    BABYLON.SceneLoader.ImportMesh('', 'assets/', 'statue.babylon', scene, function (assetmesh) {
        var statue = assetmesh[0];      
        statue.position = new BABYLON.Vector3(20, 0, -50);
        statue.scaling = new BABYLON.Vector3(0.15, 0.15, 0.15);
        statue.rotation = new BABYLON.Vector3(0.15, 0.15, 0.15);
        var axis = new BABYLON.Vector3(-0.2, 3, 0.1);
        statue.rotate(axis, 2.5,  BABYLON.Space.WORLD); 
         
    });

    BABYLON.SceneLoader.ImportMesh('', 'assets/', 'tree.babylon', scene, function (assetmesh) {
        var tree = assetmesh[0];
        var treeMat = new BABYLON.StandardMaterial("treeMat", scene);
        treeMat.diffuseColor = new BABYLON.Color3(0.5, 0, 0.5);
        tree.position = new BABYLON.Vector3(50, 0, 50);
        tree.scaling = new BABYLON.Vector3(0.09, 0.09, 0.09);
        tree.rotation = new BABYLON.Vector3(0.15, 0.15, 0.15);
        // var axis = new BABYLON.Vector3(-0.2, 3, 0.1);
        // tree.rotate(axis, 2.5,  BABYLON.Space.WORLD); 
        tree.material = treeMat;
        var gl = new BABYLON.GlowLayer('glow', scene);
        gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
            if (mesh === tree) {
                result.set(1, 0, 1, 1);
            } else {
                result.set(0, 0, 0, 0);
            }
        }
        gl.intensity = 0.4;
    });

    
    // engine.runRenderLoop(function () {
    // 	camera.alpha += 0.003;
    // });	
    scene.registerBeforeRender(function () {
        //scene.getMeshByName("ground").rotation.y += 0.0005;
        scene.getMeshByName("skySphere").rotation.y += 0.0005;
    });
    
    return scene;
};

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});