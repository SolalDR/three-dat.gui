import { manageColor } from '../helpers/manageDefines';

const defines = [
  ['bottom', 0],
  ['far', 0],
  ['filmGauge', 0],
  ['filmOffset', 0],
  ['focus', 0],
  ['fov', 0, 180],
  ['left', 0],
  ['near', 0],
  ['right', 0],
  ['top', 0],
  ['zoom', 0]
];

/**
 * Add a gui controller to a camera.
 * @param {string} name
 * @param {THREE.Camera} camera
 * @returns {GUI} Returns the folder created for the camera
 */
export const addCamera = function(name, camera) {
  const folder = this.addFolder(name);
  folder.addObject3D('object', camera, { inner: true });

  defines.forEach(parameter => {
    if (!camera.hasOwnProperty(parameter[0])) return;
    if (parameter[1] === 'color') manageColor(camera, folder, parameter);
    else
      folder
        .add(camera, parameter[0], parameter[1], parameter[2])
        .onChange(() => {
          if (camera.updateProjectionMatrix) camera.updateProjectionMatrix();
        });
  });

  return folder;
};
