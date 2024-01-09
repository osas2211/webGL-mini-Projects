import * as THREE from "three";
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
const scene = new THREE.Scene();
const group = new THREE.Group();
const box = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(box, material);
group.add(mesh);
scene.add(group);
// Camera
const camera = new THREE.PerspectiveCamera(75, aspect_ratio);
camera.position.z = 3;
scene.add(camera);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
