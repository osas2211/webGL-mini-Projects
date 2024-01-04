import * as THREE from "three";
// Constants
const sizes = { width: window.innerWidth, height: window.innerHeight };
const aspect_ratio = sizes.width / sizes.height;
const canvas = document.querySelector(".webGL");
// Scene, Mesh and Group
const scene = new THREE.Scene();
// BOX 1
const box = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xe71d36 });
const mesh = new THREE.Mesh(box, material);
mesh.position.x = 3;
// BOX 2
const box2 = new THREE.BoxGeometry(5, 5, 5);
const material2 = new THREE.MeshBasicMaterial({ color: 0xf46036 });
const mesh2 = new THREE.Mesh(box2, material2);
mesh2.position.x = -3;
const group = new THREE.Group();
group.add(mesh, mesh2);
scene.add(group);
// Camera
const camera = new THREE.PerspectiveCamera(75, aspect_ratio, 0.1, 1000);
camera.position.z = 15;
// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
// animation time
const time = new THREE.Clock();
const animate = () => {
    window.requestAnimationFrame(animate);
    const elapsedTime = time.getElapsedTime();
    mesh.rotation.y = elapsedTime;
    mesh2.rotation.y = -elapsedTime;
    renderer.render(scene, camera);
};
animate();
