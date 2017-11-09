const ManagerInterface = require('./ManagerInterface')

module.exports = class Game extends ManagerInterface {
    constructor(zenikiens = []) {
        super()
        this.zenikiens = zenikiens
        this.createScene()
    }


    createScene() {
        const ballModel = {
            image: '',
        }
        this.balls =
            [
                { ...ballModel }, { ...ballModel }, { ...ballModel },
                { ...ballModel }, { ...ballModel }, { ...ballModel },
                { ...ballModel }, { ...ballModel }, { ...ballModel },
            ]

        this.partyDuration = 30000
        this.partyTimeoutID = -1

        this.jumpIntervalDuration = 300
        this.jumpIntervalID = -1

        this.jumpDuration = 300

        this.currentUser = {
            score: 0,
            speed: 0,
        }

        this.lastPopIndex = -1
        this.lastPopImage = -1
    }

    startGame(user = {}) {
        this.currentUser = user;

        this.broadcast({
            type: 'game',
            data: {
                time: this.partyDuration,
                user: this.currentUser,
            }
        })

        // wait 3 secondes (3 2 1 GO display...)
        setTimeout(() => {
            this.sendRandoms();

            this.partyTimeoutID = setTimeout(() => {
                this.endGame()
            }, this.partyDuration)
        }, 3000);
    }

    sendRandoms() {
        this.jumpIntervalID = setInterval(() => {
            // let randomBallIndex = this.getRandomBallIndex()
            // let ball = this.balls[randomBallIndex]
            // ball.jumpDuration = this.jumpDuration
            // ball.startTimestamp = Date.now()

            this.broadcast({
                type: 'pop',
                data: {
                    index: this.getRandomBallIndex(),
                    image: this.getRandomImage()
                    // image: ball.image,
                    // jumpDuration: ball.jumpDuration,
                    // startTimestamp: ball.startTimestamp,
                }
            })

        }, this.jumpIntervalDuration)
    }

    endGame() {
        clearInterval(this.jumpIntervalID)
        clearTimeout(this.partyTimeoutID)

        this.broadcast({
            type: 'end',
            data: {
                user: this.currentUser,
            }
        })
    }

    getRandomBallIndex() {
        let randomNumber = this.getRandomIndex(this.balls.length)
        while (randomNumber === this.lastPopIndex) {
            randomNumber = this.getRandomIndex(this.balls.length)
        }
        this.lastPopIndex = randomNumber
        return randomNumber
    }

    getRandomImage() {
        this.lastPopImage = this.getRandomImageIndex(this.lastPopImage)
        return `./statics/img/Zenika-${this.lastPopIndex}.jpg`
    }

    getRandomImageIndex(lastPopIndex) {
        let randomNumber = this.getRandomIndex(this.zenikiens.size)
        while (randomNumber === lastPopIndex) {
            randomNumber = this.getRandomIndex(this.zenikiens.size)
        }
        return randomNumber;
    }

    getRandomIndex(maxIndex = 8) {
        return Math.floor((Math.random() * maxIndex) + 1)
    }

    onPress(ball) {
        console.log('ball >>>>>>>>>>>>>>>>>> ', ball)
    }

    listener(message) {
        console.log('game listener message ==========>', message)

        switch (message.type) {
            case 'start' :
                this.startGame(message.data)
                break
            case 'press':
                this.onPress(message.data)
                break

        }
    }

}
