function setup() {
  createCanvas(400, 400);
  let ct = "{lqbe9C*gcatwstxemw#dzl"

  const edk=[17,13,3,7,1,25,3,10,13,2,19,17,19,0,23,16,12,1,3,5,13,7,21,1,]

  let bytes = [];
  for (let i = 0; i < ct.length; i++) {
    let char = ct.charCodeAt(i);
    bytes.push(char);
  }
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] ^= edk[i];
  }
  print(String.fromCharCode.apply(null, bytes));

  noLoop();
}

function draw() {
  background(220);
}

/* Here is the code I use on my website:*/
/*
<script> const element = document.getElementById("email-address");
const ct = element.innerHTML;
const edk=[17,13,3,7,1,25,3,10,13,2,19,17,19,0,23,16,12,1,3,5,13,7,21,1,];let bytes=[];for(let i=0;i<ct.length;i++){let e=ct.charCodeAt(i);bytes.push(e)}for(let i=0;i<bytes.length;i++)bytes[i]^=edk[i];
const pt = String.fromCharCode.apply(null,bytes);
element.innerHTML=pt;
</script>
*/