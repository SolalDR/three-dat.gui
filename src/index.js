import { addVector } from './components/Vector.js';
import { addObject3D } from './components/Object3D.js';
import { addMaterial } from './components/Material.js';
import { addLight } from './components/Light.js';
import { addCamera } from './components/Camera.js';
import { addScene } from './components/Scene.js';
import { addMesh } from './components/Mesh.js';
import { addFog } from './components/Fog.js';
import { addFogExp2 } from './components/FogExp2.js';

const extended = [
  addVector,
  addObject3D,
  addMaterial,
  addLight,
  addCamera,
  addScene,
  addMesh,
  addFog,
  addFogExp2
];

export default function(dat) {
  const p = dat.GUI.prototype;

  extended.forEach(method => {
    if (p[method.name]) {
      console.warn(
        `three-dat.gui: The method "${method.name}" already exist. Check compatibility or check if three-dat.gui hasn't been imported twice.`
      );
      return;
    }
    p[method.name] = method;
  });
}
