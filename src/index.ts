import { addVector } from './components/Vector.js';
import { addObject3D } from './components/Object3D';
import { addMaterial } from './components/Material';
import { addLight } from './components/Light';
import { addCamera } from './components/Camera';
import { addScene } from './components/Scene';
import { addMesh } from './components/Mesh';
import { addFog } from './components/Fog';

import getProp from './helpers/getProp';

const extended = {
  addVector,
  addObject3D,
  addMaterial,
  addLight,
  addCamera,
  addScene,
  addMesh,
  addFog,
};

export default function (dat: any) {
  const p = dat.GUI.prototype;

  Object.keys(extended).forEach((name: any) => {
    const method = getProp(extended, name);
    if (p[name]) {
      console.warn(
        `three-dat.gui: The method "${method.name}" already exist. Check compatibility or if three-dat.gui hasn't been imported twice.`
      );
      return;
    }
    p[name] = method;
  });
}
