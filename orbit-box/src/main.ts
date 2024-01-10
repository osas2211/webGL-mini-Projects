import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import GUI from "lil-gui"
import gsap from "gsap"

const gui = new GUI()
const debugObject: { spin?: () => void; subdivision?: number } = {}
debugObject.subdivision = 3
// Define Sizes and Responsiveness
let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
let aspect_ratio = sizes.width / sizes.height

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener("dblclick", () => {
  const fullScreen = document.fullscreenElement
  if (fullScreen) {
    document.exitFullscreen()
  } else {
    canvas.requestFullscreen()
  }
})

const canvas = document.querySelector(".webGL") as HTMLCanvasElement

// Add Scene

const scene = new THREE.Scene()
const group = new THREE.Group()
const box = new THREE.BoxGeometry(1, 1, 1, 15, 15, 15)
const material = new THREE.MeshBasicMaterial({
  color: 0x75b89e,
  wireframe: true,
})
const mesh = new THREE.Mesh(box, material)

group.add(mesh)

scene.add(group)

gui.add(mesh.position, "y", -3, 3, 0.01).name("elevation")
gui.add(material, "wireframe").name("wireframe")
gui.addColor(material, "color").name("color")
gui.add(mesh, "visible").name("visible")
debugObject.spin = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}
gui.add(debugObject, "subdivision", 3, 20, 1).onFinishChange(() => {
  mesh.geometry = new THREE.BoxGeometry(
    1,
    1,
    1,
    debugObject.subdivision,
    debugObject.subdivision,
    debugObject.subdivision
  )
})
gui.add(debugObject, "spin")

// Add Camera
const camera = new THREE.PerspectiveCamera(75, aspect_ratio)
camera.position.z = 3
scene.add(camera)

// Add Orbit Controls
const orbitConrols = new OrbitControls(camera, canvas)
orbitConrols.enableDamping = true

// Add Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

// Add Animation Function
const animate = () => {
  window.requestAnimationFrame(animate)
  orbitConrols.update()

  renderer.render(scene, camera)
}

animate()
