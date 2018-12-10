import { manageRecursive, manageColor } from "../helpers/manageDefines";

const defines = [
  ["overrideMaterial", "material"],
  ["background", "color"]
];

/**
* Add a gui controller to the Scene.
* @param {string} name
* @param {THREE.Scene} scene
* @todo fog
* @returns {GUI} Returns the folder created for the scene.
*/
export const addScene = function( name, scene, {

  recursive = false

}) {

  var folder = this.addFolder( name );
  defines.forEach( parameter => {
    if( !scene[parameter[0]] ) return;

    if( parameter[1] == "color" ) {
      manageColor(light, folder, parameter, () => scene.needsUpdate = true );
    } else if( parameter[1] == "material" && scene[parameter[0]]) {
      folder.addMaterial(parameter[0], scene[parameter[0]]);  
    } else {
      folder.add( material, parameter[0], parameter[1], parameter[2])
    }

  })
  
  manageRecursive(recursive, scene, folder);
  return folder;
}