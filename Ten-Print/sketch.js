let p1
let textArray
const linelength = 80
const numberLines = 40
function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(5)
	textArray = new Array(numberLines)
	p1 = createElement('p', "start")
	for (let i = 0; i < textArray.length; i++) {
		let string = ""
		for(let j = 0; j < linelength; j++) {
			if (random() < 0.5) {
				string += "/"
			}
			else {
				string += "\\"
			}
		}
		textArray[i] = string
	}
  }
  
  function draw() {
	p1.style('color', '#6470f8')
	p1.position(0,0)
	text = formatStringArray(textArray) 
	p1.html(text)

	// update textArray for next cycle
	// delete first row at the beginning of the textArray
	textArray.shift()
	// generate new row at the end of the textArray
	let string = ""
	for(let j = 0; j < linelength; j++) {
		if (random() < 0.5) {
			string += "/"
		}
		else {
			string += "\\"
		}
	}	
	textArray.push(string)

	
  }

  function formatStringArray(stringArray) {
	  let formattedString = ""
	  for (let i = 0; i < stringArray.length; i++){
		  formattedString += stringArray[i] + "<br>"
	  }
	  return formattedString
  }