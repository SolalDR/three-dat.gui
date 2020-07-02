import { Vector2, Vector3, Vector4, Euler } from 'three';
import dat from 'dat.gui';

export interface AddVectorOptions {
  step?: number;
}

/**
 * Add a gui controller to a vector
 */
export const addVector = function (
  name: string,
  vector: Vector2 | Vector3 | Vector4 | Euler,
  { step = 0.1 }: AddVectorOptions = {}
): dat.GUI {
  const folder = this.addFolder(name);

  if (Math.abs(vector.x) >= 0) folder.add(vector, 'x').step(step);
  if (Math.abs(vector.y) >= 0) folder.add(vector, 'y').step(step);

  if ('z' in vector) {
    if (Math.abs(vector.z) >= 0) folder.add(vector, 'z').step(step);
  }

  if ('w' in vector) {
    if (Math.abs(vector.w) >= 0) folder.add(vector, 'w').step(step);
  }

  return folder;
};
