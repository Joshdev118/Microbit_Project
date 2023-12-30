// player movement A
input.onButtonPressed(Button.A, function () {
    if (startGame == 1) {
        if (player.get(LedSpriteProperty.X) == 0) {
            player.set(LedSpriteProperty.X, 4)
        } else {
            player.change(LedSpriteProperty.X, -1)
        }
        music.play(music.tonePlayable(156, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    }else {

    }
})
function lose () {
    enemy.delete()
    enemy_2.delete()
    player.delete()
    startGame = 0
    playerAlive = 0
    gameOver = 1
    myBlocks.gameOver(game.score())
}
// shooting bullet
input.onButtonPressed(Button.AB, function () {
    if (playerAlive == 1) {
        music.play(music.createSoundExpression(WaveShape.Triangle, 2313, 1, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        bullet = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
        for (let index = 0; index < 5; index++) {
            bullet.change(LedSpriteProperty.Y, -1)
            if (bullet.isTouching(enemy)) {
                bullet.delete()
                enemy.delete()
                game.addScore(1)
            } else if (bullet.isTouching(enemy_2)) {
                bullet.delete()
                enemy_2.delete()
                game.addScore(1)
            }
            pause(20)
        }
        bullet.delete()
    } else {
    	
    }
})
// player movement B
input.onButtonPressed(Button.B, function () {
    if (startGame == 1) {
        if (player.get(LedSpriteProperty.X) == 4) {
            player.set(LedSpriteProperty.X, 0)
        } else {
            player.change(LedSpriteProperty.X, 1)
        }
        music.play(music.tonePlayable(156, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    }else{

    }
})
// on_off settings
input.onGesture(Gesture.Shake, function () {
    // startGame
    led.stopAnimation()
    if (startGame == 0 && menu == 1) {
        menu = 0
        startGame = 1
        basic.clearScreen()
        led.stopAnimation()
        enemyWave()
    } else if (startGame == 0 && gameOver == 1) {
        menu = 0
        music.ringTone(Note.C)
        startGame = 1
        basic.clearScreen()
        led.stopAnimation()
        enemyWave()
    } else if (startGame == 0 && menu == 0) {
        menu = 1
    }
})
function enemyWave() {
    basic.pause(100)
    playerAlive = 1
    player = game.createSprite(randint(0, 4), 4)
    game.setScore(0)
    while (game.score() < 20) {
        enemy = game.createSprite(x1 = randint(1, 4), 0)
        enemy_2 = game.createSprite(x2 = randint(1, 4), 0)
        if (x1 == x2) {
            enemy.delete()
            enemy = game.createSprite(x1 = randint(1, 4), 0)
        }
        basic.pause(200)
        for (let index = 0; index < 4; index++) {
            enemy.change(LedSpriteProperty.Y, 1)
            enemy_2.change(LedSpriteProperty.Y, 1)
            if (enemy.isTouching(player)) {
                enemy.delete()
                lose()
            } else if (enemy_2.isTouching(player)) {
                enemy_2.delete()
                lose()
            }
            music.play(music.tonePlayable(156, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
            basic.pause(500)
            if (startGame != 1) {
                enemy.delete()
                enemy_2.delete()
                break;
            } else if (enemy.isDeleted() && enemy_2.isDeleted()) {
                break;
            } else if (enemy.get(LedSpriteProperty.Y) == 4 || enemy_2.get(LedSpriteProperty.Y) == 4) {
                lose()
            }
        }
        enemy.delete()
        enemy_2.delete()
    }
}
let menu = 0
let enemy_2: game.LedSprite = null
let enemy: game.LedSprite = null
let bullet: game.LedSprite = null
let playerAlive = 0
let player: game.LedSprite = null
let startGame = 0
let gameOver = 0
let x1
let x2
basic.forever(function () {
    if (startGame == 0 && menu == 1) {
        basic.showString("DEFENDER")
        basic.pause(200)
    }
})
