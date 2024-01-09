import * as THREE from "three"

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const aspect_ratio = sizes.width / sizes.height

const scene = new THREE.Scene()
const group = new THREE.Group()
const box = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(box, material)
group.add(mesh)

scene.add(group)

// Camera
const camera = new THREE.PerspectiveCamera(75, aspect_ratio)
