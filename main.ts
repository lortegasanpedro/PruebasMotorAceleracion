let speed = 0
let z = 0
let y = 0
let x = 0
let distance = 0
let VELOCIDAD = 50
// Logica del motor
datalogger.setColumnTitles(
"forward",
"backward",
"right",
"left",
"speed"
)
maqueenPlusV2.I2CInit()
datalogger.deleteLog(datalogger.DeleteType.Full)
basic.forever(function () {
    x = input.acceleration(Dimension.X)
    y = input.acceleration(Dimension.Y)
    z = input.acceleration(Dimension.Z)
    // Adjust robot movement based on accelerometer data
    if (x > 0) {
        // Move robot forward
        datalogger.log(datalogger.createCV("forward", x))
    } else if (x < 0) {
        // Move robot backward
        datalogger.log(datalogger.createCV("backward", x))
    }
    if (y > 0) {
        // Turn robot right
        datalogger.log(datalogger.createCV("right", y))
    } else if (y < 0) {
        // Turn robot left
        datalogger.log(datalogger.createCV("left", y))
    }
    // Adjust robot speed based on z-axis acceleration
    // (higher acceleration = higher speed)
    speed = Math.map(z, 0, 1024, 0, 100)
    // Control the robot's motors with the calculated speed
    datalogger.log(datalogger.createCV("speed", speed))
})
basic.forever(function () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Backward, 50)
    basic.pause(200)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    basic.pause(500)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(200)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    basic.pause(2000)
})
