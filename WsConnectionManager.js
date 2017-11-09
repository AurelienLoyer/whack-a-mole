const ManagerInterface = require('./ManagerInterface')

module.exports = class WsManager extends ManagerInterface {

    constructor(wsConnection) {
        super()
        this.wsConnection = wsConnection
        this.listeners = []
        this.initWsListener()
    }

    initWsListener() {
        // client sent some message
        this.wsConnection.on('message', (message) => {
            const decodedMessage = JSON.parse(message.utf8Data)
            this.broadcast(decodedMessage)
        })
    }

    listener(message = {}) {
        this.wsConnection.send(JSON.stringify(message))
    }
}
