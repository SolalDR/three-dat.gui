export const manageColor = (object, folder, parameter, onChange) => {
  var config = {};

  config[parameter[0]] = { 
    r: object[parameter[0]].r*255,
    g: object[parameter[0]].g*255,
    b: object[parameter[0]].b*255 
  };
  
  folder.addColor( config, parameter[0], parameter[1]).onChange( (e) => {
    object[parameter[0]].r = e.r/255;
    object[parameter[0]].g = e.g/255;
    object[parameter[0]].b = e.b/255;
    
    if( onChange) onChange();
  });

}

export const manageRecursive = ( isRecursive, object, folder ) => {
  if( isRecursive && object.children.length > 0 ){
    var childrenFolder = folder.addFolder("children");
    object.children.forEach((child, i) => {
      childrenFolder.addObject3D(child.name ? child.name : child.type + "-" + i, child, {
        recursive: true
      });
    });
  }
}