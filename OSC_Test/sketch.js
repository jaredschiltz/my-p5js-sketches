let slider
let slider_value
let socket
let number_from_max = 0
function setup() {
  createCanvas(600,600)
  slider = createSlider(0,255,100)
  slider.position(10,10)
  slider.style('width', '80px')
  slider_value = slider.value()


  setupOsc(3335, 3334); // Will receive OSC messages on port 3335 and sent them out on port 3334
}

function draw() {
  background(0)
  if (slider_value != slider.value()) {
    slider_value = slider.value()
    send_message(slider_value)
  }
  textSize(20)
  fill(255)
  text('Send Slider Value to Max on Port 3334',100,25)
  text('Received number from Max on Port 3335: ' + number_from_max.toString(), 100, 65)
  
}

function send_message(value) {
  sendOsc('/maxslider/value', value)
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
	if (address = '/p5js_number/value') {
		number_from_max = value[0]
	}
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}
