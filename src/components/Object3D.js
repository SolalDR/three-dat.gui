/**
* Add a gui controller on any Object3D to manipulate matrix world
* @param {string} name 
* @param {THREE.Object3D} object 
* @returns {GUI} Returns the folder created for the Object3D
*/
export const addObject3D = function( name, object, {
  recursive = false,
  inner = false
} = {}){
  
  var folder = inner === false ? this.addFolder( name ) : this;
  
  folder.addVector( "position", object.position );
  folder.addVector( "rotation", object.rotation, 0.05 );
  folder.addVector( "scale", object.scale, 0.01 );
  
  if( recursive && object.children.length > 0 ){
    var childrenFolder = folder.addFolder("children");
    object.children.forEach((child, i) => {
      childrenFolder.addObject3D(child.name ? child.name : child.type + "-" + i, child, {
        recursive: true
      })
    })
  }
  
  return folder;
}