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
} ) {
  var folder = this.addFolder( name );
  var config = {};
  
  defines.forEach( parameter => {
    if( !scene[parameter[0]] ) return;
    
    if( parameter[1] == "color" ) {
      
      config[parameter[0]] = { 
        r: scene[parameter[0]].r*255,
        g: scene[parameter[0]].g*255,
        b: scene[parameter[0]].b*255 
      }
      
      folder.addColor( config, parameter[0], parameter[1]).onChange( (e) => {
        scene[parameter[0]].r = e.r/255;
        scene[parameter[0]].g = e.g/255;
        scene[parameter[0]].b = e.b/255;
        scene.needsUpdate = true;
      }) 
      
      
    } else if( parameter[1] == "material" ) {
      
      if( scene[parameter[0]] ){
        
        folder.addMaterial(parameter[0], scene[parameter[0]]);
        
      }
      
    } else {
      
      folder.add( material, parameter[0], parameter[1], parameter[2])
      
    }
    
  })
  
  if( recursive && scene.children.length > 0 ){
    var childrenFolder = folder.addFolder("children");
    scene.children.forEach((child, i) => {
      childrenFolder.addObject3D(child.name ? child.name : child.type + "-" + i, child, {
        recursive: true
      })
    })
  }
  
  return folder;
}