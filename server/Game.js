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
            startTimestamp: 0,
        }
        this.balls = [
            Object.assign({}, ballModel), Object.assign({}, ballModel), Object.assign({}, ballModel),
            Object.assign({}, ballModel), Object.assign({}, ballModel), Object.assign({}, ballModel),
            Object.assign({}, ballModel), Object.assign({}, ballModel), Object.assign({}, ballModel),
        ]

        this.partyDuration = 45000
        this.partyStartTimestamp = 0
        this.partyTimeoutID = -1

        this.jumpIntervalDuration = 900
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

        // wait 3 secondes (3 2 1 GO display...)
        setTimeout(() => {
            this.partyStartTimestamp = Date.now()
            this.sendRandoms();
            this.partyTimeoutID = setTimeout(() => {
                this.endGame()
            }, this.partyDuration)
        }, 3000);
    }

    sendRandoms() {
        if ((Date.now() - this.partyStartTimestamp) > this.partyDuration * 0.25) {
            this.jumpIntervalDuration = 800
        }
        if ((Date.now() - this.partyStartTimestamp) > this.partyDuration * 0.5) {
            this.jumpIntervalDuration = 700
        }
        if ((Date.now() - this.partyStartTimestamp) > this.partyDuration * 0.75) {
            this.jumpIntervalDuration = 600
        }
        this.jumpIntervalDuration = this.jumpIntervalDuration - ((Date.now() - this.partyStartTimestamp) * 200 / 45000)
        let randomBallIndex = this.getRandomBallIndex()

        let ball = this.balls[randomBallIndex]
        ball.jumpDuration = this.jumpDuration
        ball.image = this.getRandomImage()
        ball.startTimestamp = Date.now()
        ball.zenikienIndex = this.lastPopImageIndex


        this.broadcast({
            type: 'pop',
            data: {
                index: randomBallIndex,
                image: ball.image,
                zenikienIndex: ball.zenikienIndex,
                userMail: this.currentUser.mail,
                jumpDuration: ball.jumpDuration,
                startTimestamp: ball.startTimestamp,
            }
        })
        this.jumpIntervalID = setTimeout(() => {
            this.sendRandoms()
        }, this.jumpIntervalDuration)
    }

    onPress(ballIndex) {
        if (ballIndex => 0 && ballIndex < this.balls.length) {
            const ball = this.balls[ballIndex]

            // add 300 for padding with animation CLEAN CODE
            if (ball && (Date.now() - (ball.jumpDuration - 300)) < ball.startTimestamp + 300) {

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
        const ball = this.balls[randomNumber]

        // Exclude break pin + while CLEAN CODE
        while (randomNumber === this.lastPopIndex && (ball && (Date.now() - ball.jumpDuration) < ball.startTimestamp) && randomNumber !== 8) {
            randomNumber = this.getRandomIndex(this.balls.length - 1)
        }
        this.lastPopIndex = randomNumber
        return randomNumber
    }

    getRandomImage() {
        this.lastPopImageIndex = this.getRandomImageIndex(this.lastPopImageIndex)
        return `/statics/img/Zenika-${this.lastPopImageIndex}.jpg`
    }

    getRandomImageIndex(lastPopIndex) {
        let randomNumber = this.getRandomIndex(this.zenikiens.length - 1) + 1
        while (randomNumber === lastPopIndex) {
            randomNumber = this.getRandomIndex(this.zenikiens.length - 1) + 1
        }
        return randomNumber;
    }

    getRandomIndex(maxIndex = 8) {
        return Math.floor((Math.random() * maxIndex))
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
