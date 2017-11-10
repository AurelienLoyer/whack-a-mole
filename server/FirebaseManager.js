const firebase = require('firebase')
const ManagerInterface = require('./ManagerInterface')
const config = require('../config/config')

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

const firebaseDatabase = firebaseApp.database()

module.exports = class FirebaseManager extends ManagerInterface {
    constructor() {
        super()
        this.initListeners()
    }

    initListeners() {
        this.broadcastZenikiens()
    }

    broadcastZenikiens() {
        this.getFirebase('zenikien')
    }

    broadcastUsers() {
        this.getFirebase('users')
    }

    upsetUser({ name = 'Joueur Mystère 😎', mail = 'mysteriousgamer@zenika.com', anonymous = true }) {
        firebaseDatabase.ref('users').child(this.escapeEmailAddress(mail))
            .set({
                name,
                mail,
                score: 0,
            });
    }

    hitZenikien({ zenikienIndex = 21 }) {
        firebaseDatabase.ref('zenikien/' + zenikienIndex + '/hit')
            .transaction((currentHit) => ((currentHit || 0) + 1));
    }

    storeScore({ score = 0, user = {} }) {
        firebaseDatabase.ref('users/' + this.escapeEmailAddress(user.mail) + '/score')
            .transaction((currentHit) => user.score);
    }

    listener(message) {
        switch (message.type) {
            case'start':
                this.upsetUser(message.data)
                break
            case 'getZenikiens':
                this.broadcastZenikiens()
                break
            case 'getUsers':
                this.broadcastUsers()
                break
            case 'bamZenikien':
                this.hitZenikien(message.data)
                break
            case 'end':
                this.storeScore(message.data)
        }
    }

    getFirebase(ref) {
        firebaseDatabase.ref(ref).once('value')
            .then((snapshot) => {
                this.broadcast({
                    type: ref,
                    data: snapshot.val(),
                })
            })
    }

    escapeEmailAddress(email) {
        if (!email) return false

        // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
        email = email.toLowerCase();
        email = email.replace(/\./g, ',');
        return email;
    }
}
