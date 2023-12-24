/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace cool_block{
    /**
     * blink diffrent patterns of lights
     * @param wefwrg
     * @param ewfwefwe
     * @param fwfwfwef
     */
    //% block="blink x $x y $y every $interval ms"
    export function blink(x: number, y: number, interval: number): void {
        let sprite = game.createSprite(4, 4)
        sprite.setBlink(interval)
        sprite.blink()
    }
}