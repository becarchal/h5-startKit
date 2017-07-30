AFRAME.registerComponent('log', {
    schema: { type: 'string' },
    update: function () {
        console.log(this.el, 'el')
        var stringToLog = this.data;
        console.log('sssssssssssssssssssssssss', stringToLog);
    },
    tick: function (time, timeDelta) {
        console.error(time, timeDelta)
    }
});
