let textValid = "Enter number:";

function setup() {
  createCanvas(400, 100);
  let inp = createInput('');
  inp.input(myInputEvent);
}

function draw() {
  background(255);
  textSize(32);
  fill(0, 102, 153);
  text(textValid, 10, 60);
  /*
  for(let i = 0; i < textValid.length; i++)
  {
    //console.log(textValid[i]);
  }
  */
}

function myInputEvent() {
  //console.log("got this: " + checkInput(this.value()));
  
  if(checkInput(this.value()) == "Invalid!")
  {
    textValid = "Invalid";
  }
  else
  {
    //textValid = this.value();
    textValid = this.value() + parseString2Int(this.value());
  }
  
}

function checkInput(textValue)
{
  //console.log(textValue.length);
   if(textValue.length == 0 || textValue[0] == '0') //Cannot start number with zero or nothing in array
    {
      textValue = "Invalid!";
      return textValue;
    }
  
  for(let i = 0; i < textValue.length; i++)
  {
   
    if(textValue[i] != '0' && textValue[i] != '1' && textValue[i] != '2' && textValue[i] != '3' && textValue[i] != '4' && textValue[i] != '5' && textValue[i] != '6' && textValue[i] != '7' && textValue[i] != '8' && textValue[i] != '9')
    {
     textValid = "Invalid!";
      return textValid;
    }
  }
  textValid = "Valid";
  return textValue;
  
}

function parseString2Int(sArray)
{
  let numberArray = [];
  for(let i = 0; i < sArray.length; i++)
  {
    numberArray.unshift(parseInt(sArray[i]));
  }
  
  let sum = 0;
  //calculate checksum
  for(let i = 0; i < numberArray.length; i++)
  {
    if(i % 2 == 0)
    {
      sum += doubling(numberArray[i]);
    }
    else
    {
      sum += numberArray[i];
    }
  }
  
  let checksum = (sum * 9) % 10;
  return checksum.toString();
  
}

function doubling(int)
{
  //double int
  //if doubling is two digits, add these two digits together
  switch(int)
  {
      
    case 0:
      return 0;
      
    case 1:
      return 2;
      
    case 2:
      return 4;
      
    case 3:
      return 6;
      
    case 4:
      return 8;
      
    case 5:
      return 1;
      
    case 6:
      return 3;
      
    case 7:
      return 5;
      
    case 8:
      return 7;
      
    case 9:
      return 9;
      
  }
}