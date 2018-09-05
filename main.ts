enum MotorRotation {
    //% block="正转"
    zheng,
    //% block="反转"
    fan
}

enum MotorDirection {
    //% block="左侧"
    left,
    //% block="右侧"
    right
}

enum ToneHzTable {
    do = 262,
    re = 294,
    mi = 330,
    fa = 349,
    sol = 392,
    la = 440,
    si = 494
}

enum Patrol{
    //% block="□□"
    white_white = 1,
    //% block="□■"
    white_black = 2,
    //% block="■□"
    black_white = 3,
    //% block="■■"
    black_black = 4
}
//% weight=99 icon="\uf0e7" color=#1B80C4
namespace CooCoo {
    /**
     * 设置电机
     */
    //% blockId="coocoo_motor" block="电机 左 速度%leftSpeed| 右 速度%rightSpeed"
    //% leftSpeed.min=-1023 leftSpeed.max=1023
    //% rightSpeed.min=-1023 rightSpeed.max=1023
    //% weight=100
    export function motorRun(leftSpeed: number, rightSpeed: number): void {
        let leftRotation = 0x0;
        if(leftSpeed < 0){
            leftRotation = 0x1;
        }

        let rightRotation = 0x0;
        if(rightSpeed < 0){
            rightRotation = 0x1;
        }
        
       //左电机
        pins.analogWritePin(AnalogPin.P15, Math.abs(leftSpeed));
        pins.digitalWritePin(DigitalPin.P12, leftRotation);
        
        //右电机
        pins.analogWritePin(AnalogPin.P1, Math.abs(rightSpeed));
        pins.digitalWritePin(DigitalPin.P8, rightRotation);
        
    }


    /**
     * 停止单个电机
     */
    //% blockId="coocoo_stop" block="电机 停止 %direction"
    //% weight=98
    export function motorStop(direction: MotorDirection): void {
        if(direction == MotorDirection.left){
            pins.analogWritePin(AnalogPin.P15, 0);
            pins.digitalWritePin(DigitalPin.P12, 0);
        }
        if(direction == MotorDirection.right){
            pins.analogWritePin(AnalogPin.P1, 0);
            pins.digitalWritePin(DigitalPin.P8, 0);
        }
    }


    /**
     * 停止所有电机
     */
    //% weight=97
    //% blockId="coocoo_stopAll" block="停止所有电机"
    export function motorStopAll(): void {
        //右电机
        pins.analogWritePin(AnalogPin.P1, 0);
        pins.digitalWritePin(DigitalPin.P8, 0);
        //左电机
        pins.analogWritePin(AnalogPin.P15, 0);
        pins.digitalWritePin(DigitalPin.P12, 0);
    }

    /**
     * 播放音调
     */
    //% weight=89
    //% blockId="coocoo_tone" block="播放音符"
    export function MyPlayTone(): void {
        //music.playTone(music.beat(tone),beat);
        music.playTone(262, music.beat(BeatFraction.Whole))
    }

    /**
     * 播放音乐
     */
    //% weight=88
    //% blockId="coocoo_music" block="播放音乐"
    export function MyPlayMusic(): void {
        // music.beginMelody(music.builtInMelody(song), MelodyOptions.Once);
        music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
    }

    //% weight=79
    //% blockId=coocoo_patrol block="巡线传感器 %patrol"
    export function readPatrol(patrol:Patrol): boolean {

        // let p1 = pins.digitalReadPin(DigitalPin.P13);
        // let p2 = pins.digitalReadPin(DigitalPin.P14);

        if(patrol == Patrol.white_white){
            if(pins.digitalReadPin(DigitalPin.P13) == 0 && pins.digitalReadPin(DigitalPin.P14) == 0){
                return true;
            }else{
                return false;
            }
        }else if(patrol == Patrol.white_black){
            if(pins.digitalReadPin(DigitalPin.P13) == 0 && pins.digitalReadPin(DigitalPin.P14) == 1){
                return true;
            }else{
                return false;
            }
        }else if(patrol == Patrol.black_white){
            if(pins.digitalReadPin(DigitalPin.P13) == 1 && pins.digitalReadPin(DigitalPin.P14) == 0){
                return true;
            }else{
                return false;
            }
        }else if(patrol == Patrol.black_black){
            if(pins.digitalReadPin(DigitalPin.P13) == 1 && pins.digitalReadPin(DigitalPin.P14) == 1){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }


}


