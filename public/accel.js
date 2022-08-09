//Collect accelerometer history
var xhist = []
var yhist = []
var zhist = []

//Instantiate accelerometer
function handleMotionEvent(event) {

    var x = event.acceleration.x;
    var y = event.acceleration.y;
    var z = event.acceleration.z;

    xhist.push(x);
    yhist.push(y);
    zhist.push(z);
    
}
