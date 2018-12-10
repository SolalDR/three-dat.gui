import { manageColor } from "../helpers/manageDefines";

const materialDefine = [
  ["clearCoat", 0, 1],
  ["clearCoatRoughness", 0, 1],
  ["aoMapIntensity", 0, 1], 
  ["lightMapIntensity", 0, 1],
  ["refractionRatio", 0, 1], 
  ["displacementScale", 0, 10], 
  ["bumpScale", 0, 1],
  ["emissiveIntensity", 0, 1], 
  ["envMapIntensity", 0, 1], 
  ["metalness", 0, 1],
  ["reflectivity", 0, 1], 
  ["roughness", 0, 1],
  ["shininess", 0, 1],
  ["color", "color"],
  ["specular", "color"],
  ["emissive", "color"], 
  ["opacity", 0, 1]
];

/**
* Add a gui controller to a material.
* @param {string} name
* @param {THREE.Material} material
* @returns {GUI} Returns the folder created for the material
*/
export const addMaterial = function( name, material ) {
  var folder = this.addFolder( name );
  var config = {};
  materialDefine.forEach( parameter => {
    
    if( !material[parameter[0]] ) return
    if( parameter[1] == "color" ) {
      manageColor(material, folder, parameter, () => material.needsUpdate = true)
    } else {
      folder.add( material, parameter[0], parameter[1], parameter[2]).onChange( () => material.needsUpdate = true )
    }

  })
  
  return folder;
}