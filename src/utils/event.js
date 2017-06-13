import _ from 'lodash'


export const event = {
    _eventCenter: {},

    listen(name, cb) {
        const targetCbs = this._eventCenter[name]
        if (targetCbs)
            targetCbs.push(cb)
        else
            this._eventCenter[name] = [cb]
        return cb
    },


    unListen(name, paramCb) {
        const targetCbs = this._eventCenter[name]
        const distIndex = _.findIndex(targetCbs, cb => cb === paramCb)
        if (distIndex !== -1) {
            targetCbs.splice(distIndex, 1)
        }
    },

    dispatch(name, data) {
        const targetCbs = this._eventCenter[name]
        if (targetCbs && targetCbs.length) {
            _.forEach(targetCbs, targetCb => targetCb.call(undefined, data))
        }
    },

}