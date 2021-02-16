/**
 *L9110
 */
//% weight=0 color=#3CB371 icon="\uf021" block="L9110 Driver"
namespace L9110{
    let M1A=AnalogPin.P0
    let M1B=AnalogPin.P1
    let M2A=AnalogPin.P2
    let M2B=AnalogPin.P8
    let myInit=false
    export enum rotateDir {
        //% block="clockwise"
        clockWise = 1,
        //% block="counterclockwise"
        counterClockWise = 2
    }
    export enum motor {
        //% block="M1"
        M1 = 1,
        //% block="M2"
        M2 = 2
    }
    /**
    * 設定腳位
    * initial the pins of L9110
    */
    //% blockId="initPins" block="initial the pins of L9110:|M1A %myM1A|M1B %myM1B|M2A %myM2A|M2B %myM2B"
    //% weight=90 myM1A.defl=AnalogPin.P0 myM1B.defl=AnalogPin.P1 myM2A.defl=AnalogPin.P2 myM2B.defl=AnalogPin.P8
    export function initPins(myM1A:AnalogPin, myM1B:AnalogPin, myM2A:AnalogPin, myM2B:AnalogPin): void {
        M1A=myM1A
        M1B=myM1B
        M2A=myM2A
        M2B=myM2B
        myInit=true
    }

    /**
    * 移動 單一馬達
    * rotate single motor
    */
    //% blockId="motorRotate" block="rotate motor: %myMotor | %myDir | speed(0~1023) %power"
    //% power.min=0 power.max=1023 weight=85 power.defl=1023
    export function motorRotate(myMotor: motor, myDir: rotateDir, power: number): void {
        if (myInit){
            if (myMotor==motor.M1){
                switch(myDir){
                    case 1:
                        pins.analogWritePin(M1A, 0)
                        pins.analogWritePin(M1B, power)
                        break
                    case 2:
                        pins.analogWritePin(M1A, power)
                        pins.analogWritePin(M1B, 0)
                        break
                    default:
                        pins.analogWritePin(M1A, 0)
                        pins.analogWritePin(M1B, 0)
                        break
                }
            } else if (myMotor==motor.M2){
                 switch(myDir){
                    case 1:
                        pins.analogWritePin(M2A, 0)
                        pins.analogWritePin(M2B, power)
                        break
                    case 2:
                        pins.analogWritePin(M2A, power)
                        pins.analogWritePin(M2B, 0)
                        break
                    default:
                        pins.analogWritePin(M2A, 0)
                        pins.analogWritePin(M2B, 0)
                        break
                }               
            }
        }
    }
    /**
    * 停止單一馬達
    * stop single motor
    */
    //% blockId="motorStop" block="stop motor: %myMotor"
    //% weight=80
    export function motorStop(myMotor: motor): void {
        if (myInit){
            if (myMotor==motor.M1){
                pins.analogWritePin(M1A, 0)
                pins.analogWritePin(M1B, 0)
            } else if (myMotor==motor.M2){
                pins.analogWritePin(M2A, 0)
                pins.analogWritePin(M2B, 0)             
            }
        }
    }
}