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
  ["emissive", "color"]
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
    if( !material[parameter[0]] ) return;
    
    if( parameter[1] == "color" ) {
      
      config[parameter[0]] = { 
        r: material[parameter[0]].r*255,
        g: material[parameter[0]].g*255,
        b: material[parameter[0]].b*255 
      }
      
      folder.addColor( config, parameter[0], parameter[1]).onChange( (e) => {
        material[parameter[0]].r = e.r/255;
        material[parameter[0]].g = e.g/255;
        material[parameter[0]].b = e.b/255;
        material.needsUpdate = true;
      }) 
      
    } else {
      
      folder.add( material, parameter[0], parameter[1], parameter[2]).onChange( () => {
        material.needsUpdate = true;
      })
      
    }
    
  })
  
  return folder;
}