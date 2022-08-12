import './style.css'
import font from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

const fontLoader = new FontLoader()

fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font) => {
        console.log('loaded')
    }
)