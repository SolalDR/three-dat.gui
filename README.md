# three-dat.gui

<a href="https://codeclimate.com/github/SolalDR/three-dat.gui/maintainability"><img src="https://api.codeclimate.com/v1/badges/db5b4da3972fef7fbad4/maintainability" /></a>

A package which create THREE.js controls on Dat.GUI

[live example](https://solaldr.github.io/three-dat.gui/)

## Install

First install the npm package

```
npm install three-dat.gui
```

Or with yarn

```
yarn add three-dat.gui
```

## How to use

Let's create a simple THREE.js example which display a gui controller for our `THREE.MeshStandardMaterial`

```javascript
import Dat from 'dat.gui';
import init from 'three-dat.gui'; // Import initialization method
init(Dat); // Init three-dat.gui with Dat

/* 
... init scene, renderer & camera
*/

var gui = new Dat.GUI();
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new MeshStandardMaterial();
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.addMaterial('standard_material', material);
```

You can add quickly many kind of THREE.js objects.

- `THREE.Material` with `gui.addMaterial("name", material)`
- `THREE.Light` with `gui.addLight("name", light)`
- `THREE.Vector` with `gui.addVector("name", vector)`
- `THREE.Scene` with `gui.addScene("name", scene)`
- `THREE.Object3D` with `gui.addObject3D("name", object)`
- `THREE.Mesh` with `gui.addMesh("name", mesh)`
- `THREE.Fog` with `gui.addFog("name", fog)`
- `THREE.FogExp2` with `gui.addFogExp2("name", fog)`

## Todo

- Add helpers on `THREE.Object3D`
- Refactoring
- Climate
