import './style.css'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

const fontLoader = new FontLoader()

//font
fontLoader.load(
    'three/examples/fonts/helvetiker_regular.typeface.json',
    (font) => {
        console.log('loaded!')
    }
)