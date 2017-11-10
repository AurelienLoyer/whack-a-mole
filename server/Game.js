const ManagerInterface = require('./ManagerInterface')

module.exports = class Game extends ManagerInterface {
    constructor(zenikiens = []) {
        super()
        this.zenikiens = zenikiens
        this.createScene()
    }

    initZenikiens(zenikiens = [1]) {
        this.zenikiens = zenikiens
    }

    createScene() {
        const ballModel = {
            image: '',
        }
        this.balls = [
            { ...ballModel }, { ...ballModel }, { ...ballModel },
            { ...ballModel }, { ...ballModel }, { ...ballModel },
            { ...ballModel }, { ...ballModel }, { ...ballModel },
        ]

        this.partyDuration = 30000
        this.partyTimeoutID = -1

        this.jumpIntervalDuration = 300
        this.jumpIntervalID = -1

        this.jumpDuration = 2000

        this.currentUser = {
            score: 0,
            speed: 0,
        }

        this.lastPopIndex = -1
        this.lastPopImageIndex = -1
    }

    startGame(user = {}) {
        this.currentUser = user
        this.currentUser.score = 0

        this.broadcast({
            type: 'game',
            data: {
                time: this.partyDuration,
                user: this.currentUser,
            }
        })
        this.broadcast({
            type: 'getZenikiens'
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
            let randomBallIndex = this.getRandomBallIndex()

            let ball = this.balls[randomBallIndex]
            ball.jumpDuration = this.jumpDuration
            ball.startTimestamp = Date.now()
            ball.zenikienIndex = this.lastPopImageIndex

            ball.image = this.getRandomImage()

            this.broadcast({
                type: 'pop',
                data: {
                    index: this.getRandomBallIndex(),
                    image: ball.image,
                    zenikienIndex: ball.zenikienIndex,
                    userMail: this.currentUser.mail,
                    jumpDuration: ball.jumpDuration,
                    startTimestamp: ball.startTimestamp,
                }
            })

        }, this.jumpIntervalDuration)
    }

    onPress(ballIndex) {
        if (ballIndex > 0 && ballIndex < this.balls.length - 1) {
            const ball = this.balls[ballIndex]
            if ((Date.now() - ball.jumpDuration) < ball.startTimestamp) {
                this.currentUser.score += 100
                this.broadcast({
                    type: 'bamZenikien',
                    data: {
                        zenikienIndex: ball.zenikienIndex,
                        user: this.currentUser,
                    }
                })
            }
        }
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
        let randomNumber = this.getRandomIndex(this.balls.length - 1)
        while (randomNumber === this.lastPopIndex) {
            randomNumber = this.getRandomIndex(this.balls.length - 1)
        }
        this.lastPopIndex = randomNumber
        return randomNumber
    }

    getRandomImage() {
        this.lastPopImageIndex = this.getRandomImageIndex(this.lastPopImageIndex)
        return `./statics/img/Zenika-${this.lastPopImageIndex}.jpg`
    }

    getRandomImageIndex(lastPopIndex) {
        let randomNumber = this.getRandomIndex(this.zenikiens.length - 1)
        while (randomNumber === lastPopIndex) {
            randomNumber = this.getRandomIndex(this.zenikiens.length - 1)
        }
        return randomNumber;
    }

    getRandomIndex(maxIndex = 8) {
        return Math.floor((Math.random() * maxIndex) + 1)
    }

    getWinner() {
        this.broadcast({
            type: 'winner',
            data: this.currentUser,
        })
    }

    listener(message = {}) {
        switch (message.type) {
            case 'start' :
                this.startGame(message.data)
                break

            case 'press':
                this.onPress(message.data)
                break

            case 'zenikien':
                this.initZenikiens(Object.values(message.data))
                break

            case 'getWinner':
                this.getWinner()
                break
        }
    }
}
