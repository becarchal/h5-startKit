import { scene, modelsByControl, modelsCanSave } from '../base'
import { map, assign, forEach } from 'lodash'
export { event } from './event'

export const modal2Panecfg = ({
    paneCfg, render, subscriptions
}) => {

    if (!paneCfg) {
        throw new Error('paneCfg must be exist')
    }

    return {
        [paneCfg.name]: [{
            ...paneCfg.data,
            ...paneCfg.orders,
            '+'(curPaneValue) {
                let modal = render(curPaneValue)

                handlePreAddSceneModal({ modal, name: paneCfg.name })

            }
        }, paneCfg.options]
    }
}

export const modals2Panecfg = modals => {
    let dist = {}
    forEach(modals, modal => assign(dist, modal2Panecfg(modal)))
    return dist
}


export async function handlePreAddSceneModal({ modal, name, position }) {
    if (modal instanceof Promise) {
        modal = await modal
    }

    modelsCanSave.push(modal)

    //  保存的标志
    modal.__paneName = name

    if (modal instanceof Array) {
        forEach(modal, item => {

            // 可拖拽
            if (!item.__noControl) {
                modelsByControl.push(item)
            }

            scene.add(item)

        })
    } else {

        // 可拖拽
        if (!modal.__noControl) {
            modelsByControl.push(modal)
        }

        scene.add(modal)

    }

}

export const position2String = ({ x, y, z }) => {
    return `${x},${y},${z}`
}

export const positionByString = string => {
    if (!string) return;
    const [x, y, z] = string.split(',')
    return { x: x * 1, y: y * 1, z: z * 1 }
}

export const getModalInSceneById = id => {
    return scene.children.find(({ __identify }) => id === __identify)
}