const defines = [
  ["bottom", 0],
  ["top", 0],
  ["left", 0],
  ["right", 0],
  ["near", 0],
  ["far", 0],
  ["zoom", 0],
  ["fov", 0, 180],
  ["filmGauge", 0],
  ["filmOffset", 0],
  ["focus", 0]
];


/**
* Add a gui controller to a camera.
* @param {string} name
* @param {THREE.Camera} camera
* @returns {GUI} Returns the folder created for the camera
*/
export const addCamera = function( name, camera ) {
  var folder = this.addFolder( name );
  var config = {};
  
  folder.addObject3D("object", camera, { inner: true });
  
  
  defines.forEach( parameter => {
    if( !camera[parameter[0]] ) return;
    
    if( parameter[1] == "color" ) {
      
      config[parameter[0]] = { 
        r: camera[parameter[0]].r*255,
        g: camera[parameter[0]].g*255,
        b: camera[parameter[0]].b*255 
      }
      
      folder.addColor( config, parameter[0], parameter[1]).onChange( (e) => {
        camera[parameter[0]].r = e.r/255;
        camera[parameter[0]].g = e.g/255;
        camera[parameter[0]].b = e.b/255;
      }) 
      
    } else {
      
      folder.add( camera, parameter[0], parameter[1], parameter[2]).onChange(()=>{
        if( camera.updateProjectionMatrix ) {
          camera.updateProjectionMatrix();
        } 
      })
      
    }
  })
  
  return folder;
}