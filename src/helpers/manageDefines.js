const types = ['Light', 'Mesh', 'Object3D'];

export const manageColor = (object, folder, parameter, onChange) => {
  const config = {};

  config[parameter[0]] = {
    r: object[parameter[0]].r * 255,
    g: object[parameter[0]].g * 255,
    b: object[parameter[0]].b * 255,
  };

  folder.addColor(config, parameter[0], parameter[1]).onChange((e) => {
    object[parameter[0]].r = e.r / 255;
    object[parameter[0]].g = e.g / 255;
    object[parameter[0]].b = e.b / 255;

    if (onChange) onChange(e);
  });
};

export const manageRecursive = (
  isRecursive,
  object,
  folder,
  firstLevel = false
) => {
  if (isRecursive && object.children.length > 0) {
    const childrenFolder = firstLevel ? folder : folder.addFolder('children');

    object.children.forEach((child, index) => {
      for (var i = 0; i < types.length; i++) {
        const type = types[i];
        if (child[`is${type}`]) {
          const name = child.name
            ? child.name + '-' + index
            : child.type + '-' + index;
          const options = { recursive: true };
          childrenFolder[`add${type}`](name, child, options);
          break;
        }
      }
    });
  }
};
