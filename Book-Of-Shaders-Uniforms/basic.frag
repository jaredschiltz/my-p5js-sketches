#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file

uniform float u_time;
uniform vec2 u_mouse;

void main() {

  // position of the pixel divided by resolution, to get normalized positions on the canvas
  //vec2 st = gl_FragCoord.xy/u_resolution.xy; 
  
  vec2 mp = u_mouse.xy / u_resolution.xy;
  mp.y = 1.0 - mp.y; // Flip mouse coordinates to match GL coords

  // Lets use the pixels position on the x-axis as our gradient for the red color
  // Where the position is closer to 0.0 we get black (st.x = 0.0)
  // Where the position is closer to width (defined as 1.0) we get red (st.x = 1.0)

  //gl_FragColor = vec4(st.x,0.0,0.0,1.0); // R,G,B,A
  //gl_FragColor = vec4(abs(sin(u_time/1000.0)),0.0,0.0,1.0);
  gl_FragColor = vec4(mp.x,mp.y,0.0,1.0); // R,G,B,A
  

  // you can only have one gl_FragColor active at a time, but try commenting the others out
  // try the green component

  //gl_FragColor = vec4(0.0,st.x,0.0,1.0); 

  // try both the x position and the y position
  
  //gl_FragColor = vec4(st.x,st.y,0.0,1.0); 
}