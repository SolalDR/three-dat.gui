import { manageRecursive, manageColor } from '../helpers/manageDefines';

const defines = [
  ['background', 'color'],
  ['fog', 'fog'],
  ['overrideMaterial', 'material']
];

/**
 * Add a gui controller to the Scene.
 * @param {string} name
 * @param {THREE.Scene} scene
 * @returns {GUI} Returns the folder created for the scene.
 */
export const addScene = function(name, scene, { recursive = false } = {}) {
  const folder = this.addFolder(name);
  defines.forEach(parameter => {
    if (!scene.hasOwnProperty(parameter[0]) || scene[parameter[0]] === null)
      return;

    switch (parameter[1]) {
      case 'color':
        manageColor(scene, folder, parameter, () => (scene.needsUpdate = true));
        break;
      case 'fog':
        folder.addFog(parameter[0], scene[parameter[0]]);
        break;
      case 'material':
        folder.addMaterial(parameter[0], scene[parameter[0]]);
        break;
      default:
        folder.add(scene[parameter[0]], parameter[0], parameter[1], parameter[2]); // prettier-ignore
        break;
    }
  });

  manageRecursive(recursive, scene, folder, true);
  return folder;
};
