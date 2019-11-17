/**
 * Add a gui controller to a mesh.
 * @param {string} name
 * @param {THREE.Mesh} mesh
 * @returns {GUI} Returns the folder created for the mesh.
 */
export const addMesh = function(name, mesh, { recursive = false } = {}) {
  const folder = this.addFolder(name);
  folder.addMaterial('material', mesh.material);
  folder.addObject3D('object', mesh, { inner: true, recursive });
};
