const keypress = require('keypress')
const ManagerInterface = require('./ManagerInterface')

module.exports = class KeyboardManager extends ManagerInterface {
    constructor() {
        super()
        this.keymap = [
            'a', 'z', 'e',
            'q', 's', 'd',
            'w', 'x', 'c',
        ]
        this.init()
    }

    init() {
        keypress(process.stdin)

        process.stdin.on('keypress', (ch, key) => {
            if (key) {
                let index = this.keymap.indexOf(key.name) + 1
                this.broadcast({ type: 'press', data: index })
            }
            if (key && key.ctrl && key.name == 'c') {
                process.stdin.pause()
                process.exit()
            }
        })

        process.stdin.setRawMode(true)
        process.stdin.resume()
    }
}
