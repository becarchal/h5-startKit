import Detector from '../lib/Detector'
import {
    scene, camera, renderer, controls,
    envlight, spotLight, plane,
    helper, axis, stats, container, modelsByControl
} from './base'
import { config } from './config'
import { init as initPane } from './pane'
import * as modals from './modal'
import { forEach, find } from 'lodash'
import { handlePreAddSceneModal, event } from './utils'

import './index.less'

/**
 * 启动
 */
function init() {
    scene.add(camera)

    scene.add(envlight)

    scene.add(spotLight)

    scene.add(plane)

    scene.add(helper)

    scene.add(axis)

    scene.add(controls.transformControl)

    container.appendChild(renderer.domElement)

    container.appendChild(stats.dom)

    /**
     *  浏览器发生变化自动调整视口
     */
    window.addEventListener('resize', onWindowResize, false);

    initPane()

    load()

    animate()
}

function load() {
    let saveData = localStorage.getItem(config.localStorageFieldName)

    if (!saveData)
        return;

    saveData = JSON.parse(saveData)
    forEach(saveData, ({ name, data }) => {
        const modalDesc = find(modals, ({ paneCfg: { name: name2 } }) =>
            name === name2)

        if (modalDesc) {
            let newModal = modalDesc.render(data)

            handlePreAddSceneModal({ modal: newModal, name })

        }
    })
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
    requestAnimationFrame(animate)
    render()

    // controls.update(clock.getDelta())
    // transformControl.update()
}

export function render() {
    event.dispatch('onRender')

    stats.update()
    renderer.render(scene, camera)
}


if (Detector.webgl) {
    init()
    animate()
} else {
    var warning = Detector.getWebGLErrorMessage()
    document.getElementById(config.containerId).appendChild(warning)
}