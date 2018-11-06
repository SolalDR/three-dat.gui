import * as dat from 'dat.gui';

import {addVector} from "./components/Vector.js";
import {addObject3D} from "./components/Object3D.js";
import {addMaterial} from "./components/Material.js";
import {addLight} from "./components/Light.js";
import {addCamera} from "./components/Camera.js";
import {addScene} from "./components/Scene.js";
import {addMesh} from "./components/Mesh.js";

if( !dat.GUI.prototype.addMaterial ) dat.GUI.prototype.addMaterial = addMaterial;
if( !dat.GUI.prototype.addVector ) dat.GUI.prototype.addVector = addVector;
if( !dat.GUI.prototype.addLight ) dat.GUI.prototype.addLight = addLight;
if( !dat.GUI.prototype.addCamera ) dat.GUI.prototype.addCamera = addCamera;
if( !dat.GUI.prototype.addObject3D ) dat.GUI.prototype.addObject3D = addObject3D;
if( !dat.GUI.prototype.addMesh ) dat.GUI.prototype.addMesh = addMesh;
if( !dat.GUI.prototype.addScene ) dat.GUI.prototype.addScene = addScene;
