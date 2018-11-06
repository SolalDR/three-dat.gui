import * as THREE from "three";
import Dat from "dat.gui";
import "./../src/index.js"; // three-dat.gui


class App {
  constructor(){
    // Events
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    // Init
    this.renderer = new THREE.WebGLRenderer( { 
      antialias: true, 
      canvas: document.querySelector("#canvas")
    } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor ( 0xEEEEEE, 1 )

    // Camera and control
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.set(5, 1, 5);
    this.camera.lookAt(new THREE.Vector3());
    this.scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshPhongMaterial();
    this.mesh = new THREE.Mesh( geometry, material );
    this.scene.add( this.mesh );

    this.light = new THREE.PointLight();
    this.light.position.set(5, 5, 5);
    this.scene.add(this.light);

    this.onWindowResize();
    this.renderer.animate( this.render.bind(this) );

    this.initGui();
  }

  initGui(){
    var self = this;
    var gui = new Dat.GUI();
    gui.addScene("Scene", this.scene, {
      recursive: true
    });
    gui.addMaterial("Box Material", this.mesh.material);
    gui.addLight("Light 1", this.light);
    gui.addCamera("Camera", this.camera);
    gui.addMesh("Mesh", this.mesh);
  }


  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  render(){
    this.mesh.rotation.y += 0.01;
    this.renderer.render( this.scene, this.camera );
  }
};

new App();