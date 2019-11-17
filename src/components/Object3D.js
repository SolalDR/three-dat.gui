import { manageRecursive } from '../helpers/manageDefines';

/**
 * Add a gui controller on any Object3D to manipulate matrix world
 * @param {string} name
 * @param {THREE.Object3D} object
 * @param {Object} params
 * @returns {GUI} Returns the folder created for the Object3D
 */
export const addObject3D = function(
  name,
  object,
  {
    recursive = false,
    inner = false,
    stepPosition = 1,
    stepRotation = 0.02,
    stepScale = 0.01
  } = {}
) {
  const folder = inner === false ? this.addFolder(name) : this;
  folder.addVector('position', object.position, stepPosition);
  folder.addVector('rotation', object.rotation, stepRotation);
  folder.addVector('scale', object.scale, stepScale);

  manageRecursive(recursive, object, folder);

  return folder;
};
