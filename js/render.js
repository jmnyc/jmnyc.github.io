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

    var groundMaterial = new BABYLON.GridMaterial("groundMaterial", scene);
    groundMaterial.majorUnitFrequency = 0;
    groundMaterial.minorUnitVisibility = 1;
    groundMaterial.gridRatio = 15;
    groundMaterial.backFaceCulling = false;
    groundMaterial.mainColor = new BABYLON.Color3(0, 0, 0);
    groundMaterial.lineColor = new BABYLON.Color3(5, 0, 5)
    groundMaterial.opacity = 1;

    var grid = BABYLON.MeshBuilder.CreateGround("grid", {height: 400, width: 400, subdivisions: 4}, scene);
    grid.material = groundMaterial;

    var mountainMaterial = new BABYLON.GridMaterial("groundMaterial", scene);
    mountainMaterial.majorUnitFrequency = 2;
    mountainMaterial.minorUnitVisibility = 1;
    mountainMaterial.gridRatio = 20;
    mountainMaterial.backFaceCulling = false;
    mountainMaterial.mainColor = new BABYLON.Color3(0, 0.05, 0.09);
    mountainMaterial.lineColor = new BABYLON.Color3(0, 1, 0.9);
    mountainMaterial.opacity = 1;

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/map.png", 100, 380, 10, -40, 120, scene, false);
    ground.material = mountainMaterial;
    ground.position = new BABYLON.Vector3(100, -50, 0);

    var skyMaterial = new BABYLON.StandardMaterial("skyMaterial", scene);
    skyMaterial.diffuseTexture = new BABYLON.Texture("textures/skybox.jpg", scene);
    
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