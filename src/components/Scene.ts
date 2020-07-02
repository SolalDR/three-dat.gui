import { Scene } from 'three';
import dat from 'dat.gui';

import { manageRecursive, manageColor } from '@/helpers/manageDefines';
import getProp from '@/helpers/getProp.js';

const defines = [
  ['background', 'color'],
  ['fog', 'fog'],
  ['overrideMaterial', 'material'],
];

type KeyOfScene = keyof Scene;

/**
 * Add a gui controller to the Scene.
 */
export const addScene = function (
  name: string,
  scene: Scene,
  { recursive = false }: RecursiveOptions = {}
): dat.GUI {
  const folder = this.addFolder(name);
  defines.forEach((parameter) => {
    if (!scene.hasOwnProperty(parameter[0])) return;
    const value = getProp(scene, parameter[0] as KeyOfScene);

    switch (parameter[1]) {
      case 'color':
        manageColor(scene, folder, parameter);
        break;
      case 'fog':
        folder.addFog(parameter[0], value);
        break;
      case 'material':
        folder.addMaterial(parameter[0], value);
        break;
      default:
        folder.add(value, parameter[0], parameter[1], parameter[2]);
        break;
    }
  });

  manageRecursive(recursive, scene, folder, true);
  return folder;
};
