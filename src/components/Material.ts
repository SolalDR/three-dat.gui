import { Material } from 'three';
import dat from 'dat.gui';

import { manageColor } from '@/helpers/manageDefines';

const materialDefine = [
  ['aoMapIntensity', 0, 1],
  ['bumpScale', 0, 1],
  ['clearCoat', 0, 1],
  ['clearCoatRoughness', 0, 1],
  ['color', 'color'],
  ['displacementScale', 0, 10],
  ['emissive', 'color'],
  ['emissiveIntensity', 0, 1],
  ['envMapIntensity', 0, 1],
  ['lightMapIntensity', 0, 1],
  ['metalness', 0, 1],
  ['opacity', 0, 1],
  ['reflectivity', 0, 1],
  ['refractionRatio', 0, 1],
  ['roughness', 0, 1],
  ['shininess', 0, 1],
  ['specular', 'color'],
  ['wireframe'],
];

/**
 * Add a gui controller to a material.
 */
export const addMaterial = function (
  name: string,
  material: Material
): dat.GUI {
  const folder = this.addFolder(name);

  materialDefine.forEach((parameter) => {
    if (!material.hasOwnProperty(parameter[0])) return;

    if (parameter[1] === 'color') {
      manageColor(
        material,
        folder,
        parameter,
        () => (material.needsUpdate = true)
      );
    } else {
      folder
        .add(material, parameter[0], parameter[1], parameter[2])
        .onChange(() => (material.needsUpdate = true));
    }
  });

  return folder;
};
