import * as THREE from "three";
import Event from "./Event";

class DragControl extends Event {
  constructor(camera, root){
    super();

    this.root = root;
    this.camera = camera;
    this.mouse = new THREE.Vector2();
    this.state = {

      helper: null,

      dragging: {
        active: false,
        start: new THREE.Vector2()
      }
    }

    this.raycaster = new THREE.Raycaster();

    window.addEventListener("mousedown", this.onMouseDown.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));
  }

  saveState(){
    this.state.dragging.start = this.mouse.clone();
    this.state.dragging.active = true;
  }

  cast(){
    this.raycaster.setFromCamera(this.mouse, this.camera);
    var intersects = this.raycaster.intersectObject(this.root, true);
    intersects.forEach(element => {
      if( element.object.parent.constructor.name === "ArrowHelper" ) {
        this.state.helper = element.object.parent; 
        this.dispatch("cast", this.state.helper);
      }
    });
  }

  // Raf

  loop(){
    if( this.state.dragging.active ){
      this.dispatch("progress", {
        start: this.state.dragging.start.clone(), 
        current: this.mouse.clone()
      });
      requestAnimationFrame(this.loop.bind(this));
    }
  }

  // Mouse

  updateMouse(){
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  // Events

  onMouseDown(){
    this.updateMouse();
    this.saveState();
    this.cast();
    this.loop();
  }

  onMouseMove(){
    this.updateMouse();
  }

  onMouseUp(){
    this.updateMouse();
    this.state.dragging.active = false;
  }
}

export default DragControl;