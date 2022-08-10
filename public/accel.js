//Collect accelerometer history
var normhist = []

//Instantiate accelerometer
function handleMotionEvent(event) {

    var x = event.acceleration.x;
    var y = event.acceleration.y;
    var z = event.acceleration.z;

    var norm = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2));  
    
    normhist.push(norm)
    
}
