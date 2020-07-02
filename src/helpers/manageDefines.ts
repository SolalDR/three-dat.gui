import dat from 'dat.gui';

const TYPES = ['Light', 'Mesh', 'Object3D'];

export const manageColor = (
  object: any,
  folder: dat.GUI,
  parameter: any,
  onChange?: (value: any) => void
) => {
  const config = {
    [parameter[0]]: {
      r: object[parameter[0]].r * 255,
      g: object[parameter[0]].g * 255,
      b: object[parameter[0]].b * 255,
    },
  };

  folder.addColor(config, parameter[0]).onChange((value) => {
    object[parameter[0]].r = value.r / 255;
    object[parameter[0]].g = value.g / 255;
    object[parameter[0]].b = value.b / 255;

    if (onChange) onChange(value);
  });
};

export const manageRecursive = (
  isRecursive: boolean,
  object: any,
  folder: any,
  firstLevel = false
) => {
  if (isRecursive && object.children.length > 0) {
    const childrenFolder = firstLevel ? folder : folder.addFolder('children');

    object.children.forEach((child: any, i: number) => {
      for (var i = 0; i < TYPES.length; i++) {
        const type = TYPES[i];

        if (child[`is${type}`]) {
          const name = child.name ? child.name + '-' + i : child.type + '-' + i;
          const options = { recursive: true };
          childrenFolder[`add${type}`](name, child, options);
          break;
        }
      }
    });
  }
};
