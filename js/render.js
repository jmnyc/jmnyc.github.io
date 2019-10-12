var canvas = document.getElementById("renderCanvas");

var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.Black();

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("camera1", - Math.PI / 3, 5 * Math.PI / 12, 50, new BABYLON.Vector3(0, 5, 0), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    
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
    groundMaterial.majorUnitFrequency = 5;
    groundMaterial.minorUnitVisibility = 0.45;
    groundMaterial.gridRatio = 2;
    groundMaterial.backFaceCulling = false;
    groundMaterial.mainColor = new BABYLON.Color3(1, 1, 1);
    groundMaterial.lineColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    groundMaterial.opacity = 0.98;

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/heightMap.png", 100, 100, 100, 0, 10, scene, false);
    ground.material = groundMaterial;

    var skyMaterial = new BABYLON.GridMaterial("skyMaterial", scene);
    skyMaterial.majorUnitFrequency = 6;
    skyMaterial.minorUnitVisibility = 0.43;
    skyMaterial.gridRatio = 0.5;
    skyMaterial.mainColor = new BABYLON.Color3(0, 0.05, 0.2);
    skyMaterial.lineColor = new BABYLON.Color3(0, 1.0, 1.0);	
    skyMaterial.backFaceCulling = false;
    
    var skySphere = BABYLON.Mesh.CreateSphere("skySphere", 30, 110, scene);
    skySphere.material = skyMaterial;
    
    // engine.runRenderLoop(function () {
    // 	camera.alpha += 0.003;
    // });	
    scene.registerBeforeRender(function () {
        //scene.getMeshByName("ground").rotation.y += 0.0005;
        scene.getMeshByName("skySphere").rotation.y += 0.0005;
    });
    
    return scene;
};
__createScene = createScene;

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