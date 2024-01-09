import * as THREE from "three";
const scene = new THREE.Scene();
const group = new THREE.Group();
const box = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(box, material);
group.add(mesh);
scene.add(group);
