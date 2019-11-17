import { manageColor } from '../helpers/manageDefines';

const defines = [
  ['color', 'color'],
  ['far', 0],
  ['near', 0],
  ['density', 0]
];

/**
 * Add a gui controller to a camera.
 * @param {string} name
 * @param {THREE.Fog|THREE.FogExp2} fog
 * @returns {GUI} Returns the folder created for the camera
 */
export const addFog = function(name, fog) {
  const folder = this.addFolder(name);

  defines.forEach(parameter => {
    if (!fog.hasOwnProperty(parameter[0])) return;
    if (parameter[1] === 'color') manageColor(fog, folder, parameter);
    else folder.add(fog, parameter[0], parameter[1], parameter[2], parameter[3]); // prettier-ignore
  });

  return folder;
};
