import * as THREE from

"https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js"

import * as dat from 'dat.gui';
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
console.log(OrbitControls)
const gui = new dat.GUI();
const world = {
 plane: {
  width: 10,
  height: 10,
  widthSegments: 10,
  heightSegments :10
}
}
gui.add(world.plane, 'width', 1, 22).onChange(generate);
gui.add(world.plane, 'height', 1, 22).onChange(generate);

gui.add(world.plane, 'widthSegments', 1, 22).onChange(generate);
gui.add(world.plane, 'heightSegments', 1, 22).onChange(generate);

function generate() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments,world.plane.heightSegments);
  const {array} = planeMesh.geometry.attributes.position
  for(let i = 0; i < array.length;  i +=3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    array[i + 2] = z + Math.random(); 
  }
}
const rayCaster = new THREE.Raycaster();
console.log(rayCaster)
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
 const renderer = new THREE.WebGLRenderer();

 renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio)
 document.body.appendChild(renderer.domElement);
 new OrbitControls (camera,renderer.domElement)

 camera.position.z = 5;

 const planeGeometry = new THREE.PlaneGeometry(5,4,10,10);
 const planeMeshMaterial = new THREE.MeshPhongMaterial({ side:THREE.DoubleSide,
  flatShading: true , vertexColors: true });
 const planeMesh = new THREE.Mesh(planeGeometry, planeMeshMaterial);
 scene.add(planeMesh);
 const {array} = planeMesh.geometry.attributes.position
for(let i = 0; i < array.length;  i +=3) {
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];
  array[i + 2] = z + Math.random(); 
}

const mouse = {
  X: undefined,
  Y: undefined
}
addEventListener("mousemove", (e) => {
  mouse.X = (e.clientX / innerWidth) * 2 - 1;
  mouse.Y = -(e.clientY / innerHeight) * 2 + 1;
  console.log(mouse);
  
})

const colors = [];
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
  colors.push(1,0,0)
}
planeMesh.geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3))


const light = new THREE.DirectionalLight(0xffffff ,1 );
light.position.set(0,0,1);
scene.add(light);
const  backLight = new THREE.DirectionalLight(0xffffff ,1 );
backLight.position.set(0,0, -1);
scene.add(backLight);


 function animte() {
  requestAnimationFrame(animte);
 renderer.render(scene, camera);
  // planeMesh.rotation.x += 0.01;

  rayCaster.setFromCamera(mouse, camera);
  const intersects = rayCaster.intersectObject(planeMesh);
  if(intersects.length > 0) {

    const {color} = intersects[0].object.geometry.attributes;
    color.setX(intersects[0].face.a, 0)
    color.setY(intersects[0].face.a, 1)
    color.setX(intersects[0].face.a, 0)
    color.setX(intersects[0].face.a, 0)
    
    intersects[0].object.geometry.attributes.color.needsUpdate = true;
  }
}
 animte();