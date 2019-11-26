/**
 * Add a gui controller to a vector
 * @param {string} name
 * @param {THREE.Vector|THREE.Euler} vector
 * @param {integer} step
 * @returns {GUI} Returns the folder created for the vector.
 */
var addVector = function addVector(name, vector) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 0.1 : _ref$step;

  var folder = this.addFolder(name);
  if (Math.abs(vector.x) >= 0) folder.add(vector, 'x').step(step);
  if (Math.abs(vector.y) >= 0) folder.add(vector, 'y').step(step);
  if (Math.abs(vector.z) >= 0) folder.add(vector, 'z').step(step);
  if (Math.abs(vector.w) >= 0) folder.add(vector, 'w').step(step);
  return folder;
};

var manageColor = function manageColor(object, folder, parameter, onChange) {
  var config = {};
  config[parameter[0]] = {
    r: object[parameter[0]].r * 255,
    g: object[parameter[0]].g * 255,
    b: object[parameter[0]].b * 255
  };
  folder.addColor(config, parameter[0], parameter[1]).onChange(function (e) {
    object[parameter[0]].r = e.r / 255;
    object[parameter[0]].g = e.g / 255;
    object[parameter[0]].b = e.b / 255;
    if (onChange) onChange(e);
  });
};
var manageRecursive = function manageRecursive(isRecursive, object, folder) {
  var firstLevel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (isRecursive && object.children.length > 0) {
    var childrenFolder = firstLevel ? folder : folder.addFolder('children');
    object.children.forEach(function (child, i) {
      if (child.isLight) {
        childrenFolder.addLight(child.name ? child.name : child.type + '-' + i, child, {
          recursive: true
        });
      } else if (child.isMesh) {
        childrenFolder.addMesh(child.name ? child.name : child.type + '-' + i, child, {
          recursive: true
        });
      } else {
        childrenFolder.addObject3D(child.name ? child.name : child.type + '-' + i, child, {
          recursive: true
        });
      }
    });
  }
};

/**
 * Add a gui controller on any Object3D to manipulate matrix world
 * @param {string} name
 * @param {THREE.Object3D} object
 * @param {Object} params
 * @returns {GUI} Returns the folder created for the Object3D
 */

var addObject3D = function addObject3D(name, object) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$recursive = _ref.recursive,
      recursive = _ref$recursive === void 0 ? false : _ref$recursive,
      _ref$inner = _ref.inner,
      inner = _ref$inner === void 0 ? false : _ref$inner,
      _ref$stepPosition = _ref.stepPosition,
      stepPosition = _ref$stepPosition === void 0 ? 1 : _ref$stepPosition,
      _ref$stepRotation = _ref.stepRotation,
      stepRotation = _ref$stepRotation === void 0 ? 0.02 : _ref$stepRotation,
      _ref$stepScale = _ref.stepScale,
      stepScale = _ref$stepScale === void 0 ? 0.01 : _ref$stepScale;

  var folder = inner === false ? this.addFolder(name) : this;
  folder.addVector('position', object.position, stepPosition);
  folder.addVector('rotation', object.rotation, stepRotation);
  folder.addVector('scale', object.scale, stepScale);
  manageRecursive(recursive, object, folder);
  return folder;
};

var materialDefine = [['aoMapIntensity', 0, 1], ['bumpScale', 0, 1], ['clearCoat', 0, 1], ['clearCoatRoughness', 0, 1], ['color', 'color'], ['displacementScale', 0, 10], ['emissive', 'color'], ['emissiveIntensity', 0, 1], ['envMapIntensity', 0, 1], ['lightMapIntensity', 0, 1], ['metalness', 0, 1], ['opacity', 0, 1], ['reflectivity', 0, 1], ['refractionRatio', 0, 1], ['roughness', 0, 1], ['shininess', 0, 1], ['specular', 'color'], ['wireframe', true]];
/**
 * Add a gui controller to a material.
 * @param {string} name
 * @param {THREE.Material} material
 * @returns {GUI} Returns the folder created for the material
 */

var addMaterial = function addMaterial(name, material) {
  var folder = this.addFolder(name);
  materialDefine.forEach(function (parameter) {
    if (!material.hasOwnProperty(parameter[0])) return;

    if (parameter[1] === 'color') {
      manageColor(material, folder, parameter, function () {
        return material.needsUpdate = true;
      });
    } else {
      folder.add(material, parameter[0], parameter[1], parameter[2]).onChange(function () {
        return material.needsUpdate = true;
      });
    }
  });
  return folder;
};

var defines = [['angle', 0, Math.PI / 2], ['color', 'color'], ['decay', 0, 2], ['distance', 0, 1000], ['groundColor', 'color'], ['intensity', 0, 5], ['penumbra', 0, 1], ['power', 0, 8 * Math.PI]];
/**
 * Add a gui controller to a light.
 * @param {string} name
 * @param {THREE.Light} light
 * @todo castShadow, target
 * @returns {GUI} Returns the folder created for the light
 */

var addLight = function addLight(name, light) {
  var folder = this.addFolder(name);
  folder.addObject3D(null, light, {
    inner: true
  });
  defines.forEach(function (parameter) {
    if (!light.hasOwnProperty(parameter[0])) return;

    if (parameter[1] === 'color') {
      manageColor(light, folder, parameter);
    } else {
      folder.add(light, parameter[0], parameter[1], parameter[2]);
    }
  });
  return folder;
};

var defines$1 = [['bottom', 0], ['far', 0], ['filmGauge', 0], ['filmOffset', 0], ['focus', 0], ['fov', 0, 180], ['left', 0], ['near', 0], ['right', 0], ['top', 0], ['zoom', 0]];
/**
 * Add a gui controller to a camera.
 * @param {string} name
 * @param {THREE.Camera} camera
 * @returns {GUI} Returns the folder created for the camera
 */

var addCamera = function addCamera(name, camera) {
  var folder = this.addFolder(name);
  folder.addObject3D('object', camera, {
    inner: true
  });
  defines$1.forEach(function (parameter) {
    if (!camera.hasOwnProperty(parameter[0])) return;
    if (parameter[1] === 'color') manageColor(camera, folder, parameter);else folder.add(camera, parameter[0], parameter[1], parameter[2]).onChange(function () {
      if (camera.updateProjectionMatrix) camera.updateProjectionMatrix();
    });
  });
  return folder;
};

var defines$2 = [['background', 'color'], ['fog', 'fog'], ['overrideMaterial', 'material']];
/**
 * Add a gui controller to the Scene.
 * @param {string} name
 * @param {THREE.Scene} scene
 * @returns {GUI} Returns the folder created for the scene.
 */

var addScene = function addScene(name, scene) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$recursive = _ref.recursive,
      recursive = _ref$recursive === void 0 ? false : _ref$recursive;

  var folder = this.addFolder(name);
  defines$2.forEach(function (parameter) {
    if (!scene.hasOwnProperty(parameter[0]) || scene[parameter[0]] === null) return;

    switch (parameter[1]) {
      case 'color':
        manageColor(scene, folder, parameter, function () {
          return scene.needsUpdate = true;
        });
        break;

      case 'fog':
        folder.addFog(parameter[0], scene[parameter[0]]);
        break;

      case 'material':
        folder.addMaterial(parameter[0], scene[parameter[0]]);
        break;

      default:
        folder.add(scene[parameter[0]], parameter[0], parameter[1], parameter[2]); // prettier-ignore

        break;
    }
  });
  manageRecursive(recursive, scene, folder, true);
  return folder;
};

/**
 * Add a gui controller to a mesh.
 * @param {string} name
 * @param {THREE.Mesh} mesh
 * @returns {GUI} Returns the folder created for the mesh.
 */
var addMesh = function addMesh(name, mesh) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$recursive = _ref.recursive,
      recursive = _ref$recursive === void 0 ? false : _ref$recursive;

  var folder = this.addFolder(name);
  folder.addMaterial('material', mesh.material);
  folder.addObject3D('object', mesh, {
    inner: true,
    recursive: recursive
  });
};

var defines$3 = [['color', 'color'], ['far', 0], ['near', 0], ['density', 0]];
/**
 * Add a gui controller to a camera.
 * @param {string} name
 * @param {THREE.Fog|THREE.FogExp2} fog
 * @returns {GUI} Returns the folder created for the camera
 */

var addFog = function addFog(name, fog) {
  var folder = this.addFolder(name);
  defines$3.forEach(function (parameter) {
    if (!fog.hasOwnProperty(parameter[0])) return;
    if (parameter[1] === 'color') manageColor(fog, folder, parameter);else folder.add(fog, parameter[0], parameter[1], parameter[2], parameter[3]); // prettier-ignore
  });
  return folder;
};

var extended = {
  addVector: addVector,
  addObject3D: addObject3D,
  addMaterial: addMaterial,
  addLight: addLight,
  addCamera: addCamera,
  addScene: addScene,
  addMesh: addMesh,
  addFog: addFog
};
function index (dat) {
  var p = dat.GUI.prototype;
  Object.keys(extended).forEach(function (name) {
    var method = extended[name];

    if (p[name]) {
      console.warn("three-dat.gui: The method \"".concat(method.name, "\" already exist. Check compatibility or check if three-dat.gui hasn't been imported twice."));
      return;
    }

    p[name] = method;
  });
}

export default index;
