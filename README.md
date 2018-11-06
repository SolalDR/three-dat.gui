# three-dat.gui

A usefull extension for THREE.js, using Dat.GUI 

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

``` javascript
/* 
... init scene, renderer & camera
*/

var gui = new Dat.GUI();
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new MeshStandardMaterial();
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.addMaterial("standard_material", material);
```
 

You can add quickly many kind of THREE.js objects. 

- `THREE.Material` with `gui.addMaterial("name", material)`
- `THREE.Light` with `gui.addLight("name", light)`
- `THREE.Vector` with `gui.addVector("name", vector)`
- `THREE.Scene` with `gui.addScene("name", scene)`
- `THREE.Object3D` with `gui.addObject3D("name", object)`
- `THREE.Mesh` with `gui.addMesh("name", mesh)`

