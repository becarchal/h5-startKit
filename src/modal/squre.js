import THREE from 'three'
import { position2String, positionByString } from '../utils'

export const Squre = {

    paneCfg: {
        name: '矩形',
        options: {
            open: false
        },
        data: {
            '高': 20,
            '宽': 20,
            '深度': 20
        },
    },

    save(modal) {
        const { width, height, depth } = modal.geometry.toJSON()
        return {
            '高': height,
            '宽': width,
            '深度': depth,
            '位置': position2String(modal.position)
        }
    },

    render({ '高': height, '宽': width, '深度': depth, '位置': positionString }) {

        const position = positionByString(positionString)

        var geometry = new THREE.BoxGeometry(width, height, depth)

        var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
            color: Math.random() * 0xffffff
        }))
        object.material.ambient = object.material.color
        if (position) {
            object.position.copy(position)
        } else {
            object.position.x = Math.random() * 1000 - 500
            object.position.y = Math.random() * 600
            object.position.z = Math.random() * 800 - 400
        }
        object.castShadow = true
        object.receiveShadow = true
        return object
    },

    subscriptions: {
        listen({ timeLine }) {

        },

        setUp() {

        }
    }
}