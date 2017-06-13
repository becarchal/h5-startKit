import { config } from './config'
import THREE from 'three'
import Detector from '../lib/Detector'
import '../lib/controls'
import dat from '../lib/dat.gui.min'
import Stats from '../lib/stats.min'
import '../lib/controls/DragControls'
import '../lib/controls/OrbitControls'
import '../lib/controls/TransformControls'
import '../lib/controls/FirstPersonControls'
import { render } from './index'

/**
 * 工作区初始化
 */

const makeScene = ({ background }) => {
    const scene = new THREE.Scene()
    scene.background = background
    return scene
}

const makeCamera = ({ }) => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.set(0, 250, 1000)
    return camera
}

const makeRenderer = ({ }) => {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(0xf0f0f0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    return renderer
}

const makeEnvLight = ({ }) => {
    const light = new THREE.AmbientLight(0xf0f0f0)
    return light
}

const makeControl = ({ camera, renderer }) => {
    const OrbitControl = new THREE.OrbitControls(camera, renderer.domElement)
    OrbitControl.damping = 0.2
    OrbitControl.addEventListener('change', render)
    OrbitControl.addEventListener('start', function () {
        cancelHideTransorm()
    })
    OrbitControl.addEventListener('end', function () {
        delayHideTransform()
    })

    const transformControl = new THREE.TransformControls(camera, renderer.domElement)
    transformControl.addEventListener('change', render)
    transformControl.addEventListener('change', function (e) {
        cancelHideTransorm()
    })
    transformControl.addEventListener('mouseDown', function (e) {
        cancelHideTransorm()
    })
    transformControl.addEventListener('mouseUp', function (e) {
        delayHideTransform()
    })
    transformControl.addEventListener('objectChange', function (e) {
        const object = e.target.object
        object.onTransformHappend && object.onTransformHappend()
    })

    const dragcontrols = new THREE.DragControls(modelsByControl, camera, renderer.domElement) //
    dragcontrols.enabled = false
    dragcontrols.addEventListener('hoveron', function (event) {
        transformControl.attach(event.object)
        cancelHideTransorm()
    })
    dragcontrols.addEventListener('hoveroff', function (event) {
        delayHideTransform()
    })

    var hiding
    function delayHideTransform() {
        cancelHideTransorm()
        hideTransform()
    }
    function hideTransform() {
        hiding = setTimeout(function () {
            transformControl.detach(transformControl.object)
        }, 2500)
    }
    function cancelHideTransorm() {
        if (hiding) clearTimeout(hiding)
    }

    return { OrbitControl, transformControl, dragcontrols }
}

const makeSpotLight = ({ }) => {
    const spotLight = new THREE.SpotLight(0xffffff, 1.5)
    spotLight.position.set(0, 2000, 0)
    spotLight.castShadow = true
    spotLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(70, 1.3, 500, 2500))
    spotLight.shadow.bias = -0.000222
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    return spotLight
}

const makePlane = ({ }) => {
    const planeGeometry = new THREE.PlaneGeometry(5000, 5000)
    planeGeometry.rotateX(- Math.PI / 2)
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.position.y = -200
    plane.receiveShadow = true
    return plane
}

const makeHelper = () => {
    const helper = new THREE.GridHelper(2000, 100)
    helper.position.y = - 199
    helper.material.opacity = 0.25
    helper.material.transparent = true
    return helper
}

const makeAxis = () => {
    const axis = new THREE.AxisHelper()
    axis.position.set(-500, -500, -500)
    return axis
}

const makeStats = () => {
    return new Stats()
}

export const modelsByControl = []

export const modelsCanSave = []

export const scene = makeScene({
    background: null
})

export const camera = makeCamera({

})

export const renderer = makeRenderer({

})

export const controls = makeControl({
    camera, renderer
})

export const envlight = makeEnvLight({

})

export const spotLight = makeSpotLight({

})

export const plane = makePlane({

})

export const helper = makeHelper({

})

export const axis = makeAxis({

})

export const stats = makeStats({

})

export const container = document.getElementById(config.containerId)