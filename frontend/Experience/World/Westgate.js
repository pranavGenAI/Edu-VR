import Experience from "../Experience.js";
import * as THREE from "three";


export default class Westgate {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.octree = this.experience.world.octree;
        this.mixer = null; // To handle animations
        this.setWorld();
    }

    setWorld() {
        this.bars = this.resources.items.bars.scene;
        this.brick = this.resources.items.brick.scene;
        this.buildings = this.resources.items.buildings.scene;
        this.easter = this.resources.items.easter.scene;
        this.everything = this.resources.items.everything.scene;
        this.floor = this.resources.items.floor.scene;
        this.grass = this.resources.items.grass.scene;
        this.other = this.resources.items.other.scene;
        this.outside = this.resources.items.outside.scene;
        this.panera = this.resources.items.panera.scene;
        this.plastic = this.resources.items.plastic.scene;
        this.tables = this.resources.items.tables.scene;
        this.thirdfloor = this.resources.items.thirdfloor.scene;
        this.box = this.resources.items.box.scene;
        this.bars = this.resources.items.bars.scene;

        this.glass = this.resources.items.glass.scene;
        this.screen = this.resources.items.screen.scene;

        // Check if the admin model is loaded and accessed correctly
        this.admin = this.resources.items.admin
            ? this.resources.items.admin.scene
            : null;
        console.log("Admin model:", this.admin);

        if (this.admin) {
            console.log("Adding admin model to the scene");
            this.scene.add(this.admin);
            console.log("Admin model data:", this.resources.items.admin);

            // Set position for the admin model
            this.admin.position.set(15, 7.7, 1);
            console.log("position", this.admin.position);
            // Set rotation for the admin model (in radians)
            this.admin.rotation.x = 18.95; // 45 degrees on the X-axis
            this.admin.rotation.y = 10.14; // 90 degrees on the Y-axis
            this.admin.rotation.z = 169.78; // 30 degrees on the Z-axis
            console.log("Rotation", this.admin.rotation);
            // Set up animations if available
            if (this.resources.items.admin.animations) {
                this.setupAnimations(this.resources.items.admin.animations);
            }
            // Create the nametag
            this.createNametag();
        } else {
            console.log("Admin model not found");
        }

        ///////////////////////////////
        // Check if the npc model is loaded and accessed correctly
        this.npc = this.resources.items.npc
            ? this.resources.items.npc.scene
            : null;
        console.log("npc model:", this.npc);

        if (this.npc) {
            console.log("Adding npc model to the scene");
            this.scene.add(this.npc);
            console.log("npc model data:", this.resources.items.npc);

            // Set position for the npc model
            this.npc.position.set(22.4, 18, 5.5);
            console.log("position", this.npc.position);
            // Set rotation for the npc model (in radians)
            this.npc.rotation.x = 18.95; // 45 degrees on the X-axis
            this.npc.rotation.y = 10.14; // 90 degrees on the Y-axis
            this.npc.rotation.z = 169.78; // 30 degrees on the Z-axis
            console.log("Rotation", this.npc.rotation);
            // Set up animations if available
            if (this.resources.items.npc.animations) {
                this.setupAnimations(this.resources.items.npc.animations);
            }
            // Create the nametag
            this.createNametag();
        } else {
            console.log("npc model not found");
        }

        ///////////////////////////////


        // Check if the girl model is loaded and accessed correctly
        this.girl = this.resources.items.girl
            ? this.resources.items.girl.scene
            : null;
        console.log("girl model:", this.girl);

        if (this.girl) {
            console.log("Adding girl model to the scene");
            this.scene.add(this.girl);
            console.log("girl model data:", this.resources.items.girl);

            // Set position for the girl model
            this.girl.position.set(23.5, 7.8, -1.1);
            console.log("position", this.girl.position);
            // Set rotation for the girl model (in radians)
            this.girl.rotation.x = 18.95; // 45 degrees on the X-axis
            this.girl.rotation.y = 10.5; // 90 degrees on the Y-axis
            this.girl.rotation.z = 169.8; // 30 degrees on the Z-axis
            console.log("Rotation", this.girl.rotation);
            // Reduce the scale of the girl model
            this.girl.scale.set(0.01, 0.01, 0.01); // Adjust the scale factor as needed
            console.log("Scale", this.girl.scale);
        } else {
            console.log("girl model not found");
        }

        ////////////////////////
        this.screen.children[0].material = new THREE.MeshBasicMaterial({
            map: this.resources.items.video,
        });
        this.screen.children[0].material.flipY = false;
        this.collider = this.resources.items.collider.scene;
        this.octree.fromGraphNode(this.collider);

        this.glass.children.forEach((child) => {
            child.material = new THREE.MeshPhysicalMaterial();
            child.material.roughness = 0;
            child.material.color.set(0xdfe5f5);
            child.material.ior = 1.5;
            child.material.transmission = 1;
            child.material.opacity = 1;
        });

        this.box.children.forEach((child) => {
            this.resources.items.boxTexture.flipY = false;
            this.resources.items.boxTexture.colorSpace = THREE.SRGBColorSpace;
            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.boxTexture,
            });
        });
        this.bars.children.forEach((child) => {
            this.resources.items.barsTexture.flipY = false;
            this.resources.items.barsTexture.colorSpace = THREE.SRGBColorSpace;
            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.barsTexture,
            });
        });
        this.brick.children.forEach((child) => {
            this.resources.items.brickTexture.flipY = false;
            this.resources.items.brickTexture.colorSpace = THREE.SRGBColorSpace;

            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.brickTexture,
            });
        });
        this.buildings.children.forEach((child) => {
            this.resources.items.buildingsTexture.flipY = false;
            this.resources.items.buildingsTexture.colorSpace =
                THREE.SRGBColorSpace;

            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.buildingsTexture,
            });
        });
        this.easter.children.forEach((child) => {
            this.resources.items.easterTexture.flipY = false;
            this.resources.items.easterTexture.colorSpace =
                THREE.SRGBColorSpace;

            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.easterTexture,
            });
        });
        this.everything.children.forEach((child) => {
            this.resources.items.everythingTexture.flipY = false;
            this.resources.items.everythingTexture.colorSpace =
                THREE.SRGBColorSpace;

            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.everythingTexture,
            });
        });
        this.floor.children.forEach((child) => {
            this.resources.items.floorTexture.flipY = false;
            this.resources.items.floorTexture.colorSpace = THREE.SRGBColorSpace;

            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.floorTexture,
            });
        });
        this.grass.children.forEach((child) => {
            this.resources.items.grassTexture.flipY = false;
            this.resources.items.grassTexture.colorSpace = THREE.SRGBColorSpace;

            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.grassTexture,
            });
        });
        this.other.children.forEach((child) => {
            this.resources.items.otherTexture.flipY = false;
            this.resources.items.otherTexture.colorSpace = THREE.SRGBColorSpace;

            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.otherTexture,
                alphaTest: 0.5,
                side: THREE.DoubleSide,
            });
        });
        this.outside.children.forEach((child) => {
            this.resources.items.outsideTexture.flipY = false;
            this.resources.items.outsideTexture.colorSpace =
                THREE.SRGBColorSpace;

            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.outsideTexture,
            });
        });

        this.panera.children.forEach((child) => {
            this.resources.items.paneraTexture.flipY = false;
            this.resources.items.paneraTexture.colorSpace =
                THREE.SRGBColorSpace;
            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.paneraTexture,
            });
        });

        this.plastic.children.forEach((child) => {
            this.resources.items.plasticTexture.flipY = false;
            this.resources.items.plasticTexture.colorSpace =
                THREE.SRGBColorSpace;
            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.plasticTexture,
            });
        });

        this.tables.children.forEach((child) => {
            this.resources.items.tablesTexture.flipY = false;
            this.resources.items.tablesTexture.colorSpace =
                THREE.SRGBColorSpace;
            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.tablesTexture,
            });
        });

        this.thirdfloor.children.forEach((child) => {
            this.resources.items.thirdfloorTexture.flipY = false;
            this.resources.items.thirdfloorTexture.colorSpace =
                THREE.SRGBColorSpace;
            child.material = new THREE.MeshBasicMaterial({
                map: this.resources.items.thirdfloorTexture,
            });
        });

        this.scene.add(this.glass);
        this.scene.add(this.screen);
        this.scene.add(this.brick);
        this.scene.add(this.buildings);
        this.scene.add(this.easter);
        this.scene.add(this.everything);
        this.scene.add(this.floor);
        this.scene.add(this.grass);
        this.scene.add(this.other);
        this.scene.add(this.outside);
        this.scene.add(this.panera);
        this.scene.add(this.plastic);
        this.scene.add(this.box);
        this.scene.add(this.tables);
        this.scene.add(this.thirdfloor);
        this.scene.add(this.bars);
    }

    setupAnimations(animations) {
        // Create an AnimationMixer, which will control the animations
        this.mixer = new THREE.AnimationMixer(this.admin);

        // List all available animations
        console.log("Available animations for Admin model:");
        animations.forEach((clip) => {
            console.log(clip.name);
        });

        // Look for the "Idle" animation and play it in a loop if found
        const idleAnimation = animations.find(
            (clip) => clip.name.toLowerCase() === "idle",
        );
        if (idleAnimation) {
            const action = this.mixer.clipAction(idleAnimation);
            console.log("Idle Animation Action:", action);
            action.play();
            action.setLoop(THREE.LoopRepeat); // Ensure it's set to loop
            action.enabled = true; // Ensure the action is enabled
            console.log("Playing Idle animation in loop.");
        } else {
            console.log("Idle animation not found.");
        }
        animations.forEach((clip) => {
            const action = this.mixer.clipAction(clip);
            action.play();
        });
    }

    // Call this in your main render loop to update animations
    update(deltaTime) {
        if (this.mixer) {
            this.mixer.update(deltaTime);
        }
    }

    createNametag() {
        // Create canvas and draw text
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 128;
        const context = canvas.getContext("2d");
        context.font = "28px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Admin Staff", canvas.width / 2, canvas.height / 2);

        // Create texture and sprite
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);

        // Set sprite scale
        sprite.scale.set(4.5, 2, 0.5); // Adjust size as needed
        console.log(sprite.scale);
        // Position sprite above admin model
        sprite.position.set(15, 10, 1);
        console.log(sprite.position);
        // Add sprite to the scene
        this.scene.add(sprite);
    }
}
