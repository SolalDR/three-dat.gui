import * as THREE from 'three';
import DragControl from './DragControl';

class TranslationController {
  constructor(object, camera) {
    this.object = object;
    this.camera = camera;
    if (!object.geometry.boundingBox) {
      object.geometry.computeBoundingBox();
    }
    const length = object.geometry.boundingBox.min.distanceTo(
      object.geometry.boundingBox.max
    );

    this.state = {
      currentAxe: null,
      direction: null,
      object: {}
    };

    this.initArrows(length);
    this.initDragControl();
  }

  initArrows(length) {
    const xArrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(),
      length,
      0xff0000
    );
    xArrow.name = 'translation-x';
    this.object.add(xArrow);

    const yArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(),
      length,
      0x00ff00
    );
    yArrow.name = 'translation-y';
    this.object.add(yArrow);

    const zArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(),
      length,
      0x0000ff
    );
    zArrow.name = 'translation-z';
    this.object.add(zArrow);
  }

  saveState() {
    this.state.object.position = this.object.position.clone();
    this.state.object.scale = this.object.scale.clone();
    this.state.object.rotation = this.object.rotation.clone();
  }

  initDragControl() {
    this.control = new DragControl(this.camera, this.object);

    this.control.on('start', () => {
      this.saveState();
    });

    this.control.on('progress', e => {
      const intensity = e.current.clone().sub(e.start);
      this.object.position.y = this.state.object.position.y + intensity.y;
    });
  }
}

export default TranslationController;
