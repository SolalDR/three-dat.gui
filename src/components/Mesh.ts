import { Mesh } from 'three';

/**
 * Add a gui controller to a mesh.
 */
export const addMesh = function (
  name: string,
  mesh: Mesh,
  { recursive = false }: RecursiveOptions = {}
) {
  const folder = this.addFolder(name);
  folder.addMaterial('material', mesh.material);
  folder.addObject3D('object', mesh, { inner: true, recursive });
};
