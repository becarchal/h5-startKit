import { modals2Panecfg } from './utils'
import * as modals from './modal'
import { scene, modelsCanSave } from './base'
import { forEach, find } from 'lodash'

export const config = {
    containerId: 'container',
    localStorageFieldName: 'scene_3d'
}

export const paneCfg = {
    '场景配置': [{
    }, { open: false }],
    '模型配置': [
        modals2Panecfg(modals),
        { open: true }
    ],
    '基础操作': [{
        '保存'() {
            let preSaveData = []
            forEach(modelsCanSave, modal => {
                if (modal.__paneName) {
                    const modalDesc = find(modals, ({ paneCfg: { name } }) =>
                        name === modal.__paneName)

                    if (modalDesc) {
                        const saveData = modalDesc.save(modal)

                        preSaveData.push({
                            name: modal.__paneName,
                            data: saveData
                        })
                    }
                }
            })

            localStorage.setItem(config.localStorageFieldName,
                JSON.stringify(preSaveData))

            alert('保存成功')

        },
        '清空'() {
            if (confirm('确认清空本地存储吗？')) {
                localStorage.setItem(config.localStorageFieldName, '')
                window.location.reload()
            }
        },
        '导出'() {
            const json = localStorage.getItem(config.localStorageFieldName)
            if (json) {
                prompt('内容:', json)
            } else {
                alert('请先保存')
            }
        }
    }, { open: true }],
}