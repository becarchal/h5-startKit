import THREE from 'three'
import { pick } from 'lodash'
import { position2String, positionByString } from '../../utils'

export const Earth = {

    paneCfg: {
        name: '地球',
        options: {
            open: false
        },
        data: {
            '半径': 200,
            '宽度部分': 100,
            '高度部分': 100
        },

    },

    save(modal) {
        const { radius, widthSegments, heightSegments } = modal.geometry.toJSON()
        return {
            '半径': radius,
            '宽度部分': widthSegments,
            '高度部分': heightSegments,
            '位置': position2String(modal.position)
        }
    },

    render({ '半径': radius, '宽度部分': widthSegments, '高度部分': heightSegments, '位置': positionString }) {

        const position = positionByString(positionString)

        const loader = new THREE.TextureLoader()

        return new Promise((resolve, reject) => {
            try {
                loader.load(require('./land_ocean_ice_cloud_2048.jpg'), function (texture) {
                    var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
                    var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
                    const modal = new THREE.Mesh(geometry, material)
                    if (position) {
                        modal.position.copy(position)
                    }
                    resolve(modal)
                })
            } catch (err) {
                reject(err)
            }

        }).catch(err => alert(err + '地球纹理解析失败'))

    },

    subscriptions: {
        listen({ timeLine }) {

        },

        setUp() {

        }
    }
}