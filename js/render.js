(function ($) {
    "use strict";
    $(document).ready(function () {
        // lightning system
        window.random = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };  
        function MakeLightningSystem(config) {
            var spriteManagerSpark = new BABYLON.SpriteManager("Lightning Sprites", "assets/lightning.png", 100, { width: 54, height: 184 }, config.scene);
        
            function SpawnLightningBolt(config) {
            var spark = new BABYLON.Sprite("Lightning", spriteManagerSpark);
            spark.playAnimation(0, 20, false, 100);
            spark.height = config.height;
            spark.width = config.width;
            
            spark.position = new BABYLON.Vector3(random(config.min.x, config.max.x), 20, random(config.min.z, config.max.z));
        
            setTimeout(function() {
                spark.dispose();
            }, 8 * 60);
        
            setTimeout(function() {
                SpawnLightningBolt(config);
            }, random(2 * 60, 480));
            }
        
            setTimeout(function() {
                SpawnLightningBolt(config);
            }, random(2 * 60, 480));
        }
        // Start app code
        var canvas = document.getElementById("renderCanvas");
        var createScene = function () {

            // This creates a basic Babylon Scene object (non-mesh)
            var scene = new BABYLON.Scene(engine);
        
            // This creates and positions a free camera (non-mesh)
            var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 1, Math.PI / 1.95, 185, new BABYLON.Vector3(0, 35, 0), scene);
            camera.lowerRadiusLimit = 185;
            camera.upperRadiusLimit = 185;
            camera.lowerAlphaLimit = 3.14;
            camera.upperAlphaLimit = 3.14;
            camera.lowerBetaLimit = 1.5;
            camera.upperBetaLimit = 1.5;
            camera.attachControl(canvas, false);
            //camera.inputs.attached.pointers.buttons = [];
            //Light direction is up and left
            var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 0, 0), scene);
            light.intensity = 0.7;
            light.emissiveColor = new BABYLON.Color3(1, 1, 1);

            var gridMat = new BABYLON.GridMaterial("gridMat", scene);
            gridMat.majorUnitFrequency = 0;
            gridMat.minorUnitVisibility = 1;
            gridMat.gridRatio = 15;
            gridMat.backFaceCulling = false;
            gridMat.mainColor = new BABYLON.Color3(0, 0, 0.2);
            gridMat.lineColor = new BABYLON.Color3(3, 0, 3)
            gridMat.opacity = 1;
            var grid = BABYLON.MeshBuilder.CreateGround("grid", {height: 400, width: 250, subdivisions: 4}, scene);
            grid.material = gridMat;

            // BABYLON.SceneLoader.ImportMesh('', 'assets/', 'mountain.babylon', scene, function (assetmesh) {
            //     var mountainGrid = assetmesh[0];
            //     var mountainGridMat = new BABYLON.StandardMaterial("mountainGridMat", scene);
            //     mountainGridMat.emissiveColor  = new BABYLON.Color3(0.7, 0.7, 0.7);
            //     mountainGridMat.diffuseColor = new BABYLON.Color3(0, 1, 14);
            //     mountainGridMat.wireframe = true;
            //     mountainGrid.checkCollisions  = false;
            //     mountainGrid.position = new BABYLON.Vector3(119, -6, -40);
            //     mountainGrid.scaling = new BABYLON.Vector3(25.01, 5.01, 13.01);
            //     mountainGrid.rotation = new BABYLON.Vector3(-1.6, 1.5, 0);
            //     mountainGrid.material.zOffset = 1;
            //     mountainGrid.material = mountainGridMat;
                
            // });
            // BABYLON.SceneLoader.ImportMesh('', 'assets/', 'mountain.babylon', scene, function (assetmesh) {
            //     var mountain = assetmesh[0];
            //     var mountainMat = new BABYLON.StandardMaterial("mountainMat", scene);
            //     mountainMat.emissiveColor = new BABYLON.Color3(0, 0.5, 0.5);
            //     mountainMat.diffuseColor = new BABYLON.Color3(0, 0.1, 0.3);
            //     //mountainMat.wireframe = true;
            //     mountain.position = new BABYLON.Vector3(120, -6, -40);
            //     mountain.scaling = new BABYLON.Vector3(25, 5, 13);
            //     mountain.rotation = new BABYLON.Vector3(-1.6, 1.5, 0);
            //     mountain.material = mountainMat;
            //     var gl = new BABYLON.GlowLayer('glow', scene);
            //     gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
            //         if (mesh === mountain) {
            //             result.set(1, 1, 1, 1);
            //         } else {
            //             result.set(0, 0, 0, 0);
            //         }
            //     }
            //     gl.intensity = 0.5;
                    
            // });


            var configSkyTexture = function (texture) {
                texture.vScale = texture.uScale = 3;
                return texture;
            }
            var skyMaterial = new BABYLON.StandardMaterial("skyMaterial", scene);
            skyMaterial.diffuseTexture =configSkyTexture(new BABYLON.Texture("textures/4.jpg", scene));
            
            var skySphere = BABYLON.MeshBuilder.CreateSphere("skySphere", {diameter: 500, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
            skySphere.material = skyMaterial;

            MakeLightningSystem({
                scene: scene,
                max: new BABYLON.Vector3(150, 0, 400), // the 'y' value for both Vector3s is ignored.
                min: new BABYLON.Vector3(150, 0, -400), // the 'y' value for both Vector3s is ignored.
                width: 30,
                height: 300
            });

            // engine.runRenderLoop(function () {
            // 	camera.alpha += 0.003;
            // });	
            scene.registerBeforeRender(function () {
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
	});
}(jQuery));
