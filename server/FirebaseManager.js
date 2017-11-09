const firebase = require('firebase')
const ManagerInterface = require('./ManagerInterface')
const config = require('../config/config')

module.exports = class FirebaseManager extends ManagerInterface {
    constructor() {
        super()
        const firebaseApp = firebase.initializeApp({
            apiKey: config.FIREBASE_API_KEY,
            authDomain: `${config.FIREBASE_ID}.firebaseapp.com`,
            databaseURL: `https://${config.FIREBASE_ID}.firebaseio.com`,
            projectId: `${config.FIREBASE_ID}`,
            storageBucket: `${config.FIREBASE_ID}.appspot.com`,
        })

        firebase.auth().signInAnonymously().catch(function(error) {
            console.error(`Firebase authentication error ${error.code} : ${error.message}`)
            process.exit()
        })

        firebase.auth().onAuthStateChanged(function(mess) {
        })

        this.firebaseDatabase = firebaseApp.database()
        this.initListeners()
    }


    initListeners() {
        const zenikien = this.firebaseDatabase.ref('zenikien')

        zenikien.on('value', (snapshot) => {
            this.broadcast({
                type: 'zenikien',
                data: snapshot.val()
            })
        })
    }


    listener(message) {
        switch (message.type) {
            case 'bam':
                console.log(message.data)
                break

        }
    }
}
