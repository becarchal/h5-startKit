import dat from '../lib/dat.gui.min'
import { scene } from './base'
import { paneCfg } from './config'

/**
 * 面板初始化
 */

export const gui = new dat.GUI()
gui.folder = {}

function adds(folderName, params, opts = {}) {
    const { open, parentFolder } = opts
    const source = parentFolder || gui
    const f = source.addFolder(folderName)
    gui.folder[folderName] = params

    if (open) {
        f.open()
    }

    for (var key in params) {
        let dist = params[key]
        if (dist instanceof Array) {
            const chilOpts = dist[1] || {}
            chilOpts.parentFolder = f
            adds.call(undefined, key, dist[0], chilOpts)
            continue;
        }
        if (dist instanceof Function) {
            params[key] = dist.bind(undefined, params)
        }
        f.add(params, key)
    }
}

export function init() {
    for (let key in paneCfg) {
        adds.apply(undefined, [key, ...paneCfg[key]])
    }
}
