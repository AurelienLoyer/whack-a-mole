
module.exports = class ManagerInterface {
    constructor() {
        this.listeners = []
    }

    listener() {

    }

    addListeners(listeners = []) {
        this.listeners = this.listeners.concat([].concat(listeners))
    }

    broadcast(message = '') {
        this.listeners.map(listener => listener(message));
    }
}
