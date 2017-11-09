// const firebase = require('firebase')
// const ManagerInterface = require('./ManagerInterface')
//
// module.exports = class FirebaseManager extends ManagerInterface {
//     constructor() {
//         super()
//
//         firebase.initializeApp({
//             apiKey: config.FIREBASE_API_KEY,
//             databaseURL: `https://${config.FIREBASE_ID}.firebaseio.com`
//         })
//
//
//         const firebaseApp = firebase.initializeApp({
//            
//         })
//
//         firebase.auth().signInAnonymously().catch(function(error) {
//             // Handle Errors here.
//             const errorCode = error.code
//             const errorMessage = error.message
//
//             // eslint-disable-next-line
//             console.error(`Firebase authentication error ${errorCode} : ${errorMessage}`)
//         })
//
//         firebase.auth().onAuthStateChanged(function() {})
//
//         const firebaseDatabase = firebaseApp.database()
//         export { firebaseApp, firebaseDatabase }
//
//     }
//
//
//     initListeners() {
//
//         const zenikien = firebase.database().ref('zenikiens')
//         zenikien.on("value", function(snapshot) {
//             console.log(snapshot.val())
//         })
//     }
//
//
//     listener(message) {
//         console.log('game listener message ==========>', message)
//
//         switch (message.type) {
//             case 'start' :
//                 this.startGame(message.data)
//                 break
//             case 'press':
//                 this.onPress(message.data)
//                 break
//
//         }
//     }
//
// }
