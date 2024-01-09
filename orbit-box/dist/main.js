import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Define Sizes and Responsiveness
let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
let aspect_ratio = sizes.width / sizes.height;
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
window.addEventListener("dblclick", () => {
    const fullScreen = document.fullscreenElement;
    if (fullScreen) {
        document.exitFullscreen();
    }
    else {
        canvas.requestFullscreen();
    }
});
const canvas = document.querySelector(".webGL");
// Add Scene
const scene = new THREE.Scene();
const group = new THREE.Group();
const box = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(box, material);
group.add(mesh);
scene.add(group);
// Add Camera
const camera = new THREE.PerspectiveCamera(75, aspect_ratio);
camera.position.z = 3;
scene.add(camera);
// Add Orbit Controls
const orbitConrols = new OrbitControls(camera, canvas);
orbitConrols.enableDamping = true;
// Add Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
// Add Animation Function
const animate = () => {
    window.requestAnimationFrame(animate);
    orbitConrols.update();
    renderer.render(scene, camera);
};
animate();
