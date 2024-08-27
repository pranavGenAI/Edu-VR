import Experience from "../Experience.js";
import * as THREE from "three";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setEnvironment();
    }
    setEnvironment() {
        this.environmentMap = {};
        this.environmentMap.intensity = 1;
        this.environmentMap.texture = this.resources.items.environment;
        this.environmentMap.texture.outputColorSpace = THREE.SRGBColorSpace;

        this.scene.background = this.environmentMap.texture;

        const light = new THREE.AmbientLight(0x404040, 4); // soft white light
        this.scene.add(light);

        this.sunLight = new THREE.DirectionalLight("#ffffff", 1.5);

        this.sunLight.position.set(1.5, 7, -3);
        this.scene.add(this.sunLight);
    }

    update() {}
}
