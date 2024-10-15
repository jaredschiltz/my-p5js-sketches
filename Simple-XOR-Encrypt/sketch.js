function setup() {
  createCanvas(400, 400);
  let encrypt_decrypt_key = []
  const plain_text = "jared @ testdomain.com";
  print(plain_text);

  
  for(let i = 0; i < plain_text.length; i++){
    encrypt_decrypt_key[i] = Math.floor(Math.random() * 26)
  }
  print(encrypt_decrypt_key)
  

  //const encrypt_decrypt_key = [23,13,8,10,4,2,22,12,12,6,0,24,15,5,8,13,15,7,13,15,8,3,18,15];

  // encrypt
  let byte_array = unpack(plain_text);
  byte_array = encrypt_decrypt(byte_array, encrypt_decrypt_key);
  print(pack(byte_array));

  // decrypt
  byte_array = encrypt_decrypt(byte_array, encrypt_decrypt_key);
  print(pack(byte_array));
  noLoop();
}

function draw() {
  background(220);
}

function unpack(str) {
  let bytes = [];
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    bytes.push(char & 0xff);
  }
  return bytes;
}

function pack(byte_array) {
  return String.fromCharCode.apply(null, byte_array);
}

function encrypt_decrypt(byte_array, key_string) {
  for (let i = 0; i < byte_array.length; i++) {
    byte_array[i] ^= key_string[i];
  }
  return byte_array;
}
