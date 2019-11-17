/**
 * Add a gui controller to a vector
 * @param {string} name
 * @param {THREE.Vector|THREE.Euler} vector
 * @param {integer} step
 * @returns {GUI} Returns the folder created for the vector.
 */
export const addVector = function(name, vector, { step = 0.1 } = {}) {
  const folder = this.addFolder(name);

  if (Math.abs(vector.x) >= 0) folder.add(vector, 'x').step(step);
  if (Math.abs(vector.y) >= 0) folder.add(vector, 'y').step(step);
  if (Math.abs(vector.z) >= 0) folder.add(vector, 'z').step(step);
  if (Math.abs(vector.w) >= 0) folder.add(vector, 'w').step(step);

  return folder;
};
