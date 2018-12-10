import { manageColor } from "../helpers/manageDefines";

const defines = [
  ["color", "color"],
  ["groundColor", "color"],
  ["intensity", 0, 5],
  ["decay", 0, 2], 
  ["distance", 0, 1000],
  ["power", 0, 8*Math.PI],
  ["angle", 0, Math.PI/2], 
  ["penumbra", 0, 1]
];

/**
* Add a gui controller to a light.
* @param {string} name
* @param {THREE.Light} light
* @todo castShadow, target
* @returns {GUI} Returns the folder created for the light
*/
export const addLight = function( name, light ) {
  var folder = this.addFolder( name );
  folder.addObject3D( null, light, { inner: true } )
  
  defines.forEach( parameter => {
    
    if( !light[parameter[0]] ) return
    if( parameter[1] == "color" ) {
      manageColor(light, folder, parameter);
    } else {
      folder.add( light, parameter[0], parameter[1], parameter[2])
    }
    
  })
  
  return folder;
}