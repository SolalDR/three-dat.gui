import { Object3D } from 'three';
import dat from 'dat.gui';

import { manageRecursive } from '@/helpers/manageDefines';

export interface AddObject3DOptions extends RecursiveOptions {
  inner: boolean;
  stepPosition: number;
  stepRotation: number;
  stepScale: number;
}

/**
 * Add a gui controller on any Object3D to manipulate matrix world
 */
export const addObject3D = function (
  name: string,
  object: Object3D,
  {
    recursive = false,
    inner = false,
    stepPosition = 1,
    stepRotation = 0.02,
    stepScale = 0.01,
  } = {}
): dat.GUI {
  const folder = inner === false ? this.addFolder(name) : this;
  folder.addVector('position', object.position, stepPosition);
  folder.addVector('rotation', object.rotation, stepRotation);
  folder.addVector('scale', object.scale, stepScale);

  manageRecursive(recursive, object, folder);

  return folder;
};
