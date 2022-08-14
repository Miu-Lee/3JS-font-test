import './style.css';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import { TextureLoader } from 'three';
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'


//debug
//const gui = new GUI()

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('grey')

/**
 * Object
 */
//  const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//matcap material
const materialPath = ['matcap.png','matcap1.png','matcap2.png','matcap3.png','matcap4.png','matcap5.png']
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load(materialPath[5])
const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 2
scene.add(camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//torus
const torusGeometry = new THREE.TorusGeometry(0.15, 0.05, 10, 50)
for (let i=0; i<300; i++){
    const torusMesh = new THREE.Mesh(torusGeometry, material)
    torusMesh.position.set((Math.random()-0.5)*10, (Math.random()-0.5)*10, (Math.random()-0.5)*10)
    torusMesh.rotation.x = Math.random() * Math.PI * 2
    torusMesh.rotation.x = Math.random() * Math.PI * 2
    let scale = Math.random()
    torusMesh.scale.set(scale, scale, scale)
    scene.add(torusMesh)
}

//font
const fontLoader = new FontLoader()
    fontLoader.load('fonts/helvetiker_regular.typeface.json',
    function (font) {
        const textGeometry = new TextGeometry(
            'Hello Puppy',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)
        camera.lookAt(text.position)
    })

//movement
window.addEventListener('mousemove', ()=>{

})

window.addEventListener('resize', ()=>{
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
})



//animate
const anime =  ()=>{
    controls.update()

    window.requestAnimationFrame(anime)
    renderer.render(scene,camera)
}

anime()
