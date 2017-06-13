import { event, getModalInSceneById } from '../utils'
import { camera } from '../base'
import THREE from 'three'
import _ from 'lodash'

export const Line = {

    paneCfg: {
        name: '轨迹',
        options: {
            open: false
        },
        data: {
            '节点数': 3,
            '粒子数': 300,
        },
        orders: {
            '轨迹运动'() {
                var curCameraPosIndex = window.curCameraPosIndex = 0
                const points = getModalInSceneById('points_line')
                const vertices = points.geometry.vertices

                if (window.__alListenRender) {
                    event.unListen('onRender', window.__alListenRender)
                }

                window.__alListenRender = event.listen('onRender', () => {
                    if (window.__stopCameraRun) 
                        return;
                    if (curCameraPosIndex < vertices.length - 1 - 10) {
                        curCameraPosIndex++
                        camera.position.copy(vertices[curCameraPosIndex])
                        camera.lookAt(vertices[curCameraPosIndex + 10])
                    }
                })
            },
            '暂停轨迹'() {
                window.__stopCameraRun = !window.__stopCameraRun
            }
        }
    },

    save([points, ...splines]) {

        const splinesPoints = _.map(splines, ({ position }) => position)
        
        return {
            '节点数': splines.length,
            '粒子数': points.geometry.vertices.length,
            '节点位置': splinesPoints
        }
    },

    render({ '节点数': splinePointsLength, '粒子数': arcNum, '节点位置': paramPositions = [] }) {

        function onCubeTransformHappend() {

            var p;
            const modal = curve.mesh
            for (var i = 0; i < arcNum; i++) {
                p = modal.geometry.vertices[i]
                p.copy(curve.getPoint(i / (arcNum - 1)))
            }
            modal.geometry.verticesNeedUpdate = true

            points.geometry.vertices = curve.getPoints(arcNum)
            points.geometry.verticesNeedUpdate = true
        }

        function makeSplineObject(position) {
            const geometry = new THREE.BoxGeometry(20, 20, 20)
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

            /**
             * 给节点矩形监听事件
             */
            object.onTransformHappend = onCubeTransformHappend
            return object
        }

        const positions = [], splines = []
        for (var i = 0; i < splinePointsLength; i++) {
            splines.push(makeSplineObject(paramPositions[i]))
        }
        for (var i = 0; i < splinePointsLength; i++) {
            positions.push(splines[i].position)
        }
        var geometry = new THREE.Geometry()
        for (var i = 0; i < arcNum; i++) {
            geometry.vertices.push(new THREE.Vector3())
        }
        const curve = new THREE.CatmullRomCurve3(positions)
        curve.type = 'catmullrom'
        curve.mesh = new THREE.Line(geometry.clone(), new THREE.LineBasicMaterial({
            color: 0xff0000,
        }))
        curve.mesh.castShadow = true

        var material = new THREE.PointsMaterial({ color: 0xff0000, size: 3 })
        var geometry = new THREE.Geometry()
        var vertices = curve.getPoints(arcNum-1)
        geometry.vertices = vertices
        const points = new THREE.Points(geometry, material)

        points.__noControl = true
        points.__identify = 'points_line'


        return [points, ...splines]
    }
}