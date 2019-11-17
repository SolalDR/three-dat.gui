import * as THREE from 'three';
import Dat from 'dat.gui';
import initThreeDatGui from '../src/index.js'; // three-dat.gui
import TranslationController from './src/TranslationController';

initThreeDatGui(Dat);

class App {
  constructor() {
    // Events
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    // Init
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xeeeeee, 1);

    // Camera and control
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(5, 1, 5);
    this.camera.lookAt(new THREE.Vector3());
    this.scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      transparent: true
    });
    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);

    this.light = new THREE.PointLight();
    this.light.position.set(5, 5, 5);
    this.scene.add(this.light);

    this.onWindowResize();
    this.renderer.animate(this.render.bind(this));

    this.initGui();
  }

  initGui() {
    const gui = new Dat.GUI();
    gui.addScene('Scene', this.scene, { recursive: true });
    gui.addMaterial('Box Material', this.mesh.material);
    gui.addLight('Light 1', this.light);
    gui.addCamera('Camera', this.camera);
    gui.addMesh('Mesh', this.mesh);

    // new TranslationController(this.mesh, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.mesh.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}

new App();
