#ifdef GL_ES
precision mediump float;
#endif
#define num_blobs 10
uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_blob_position;
uniform float u_blob_position_array[num_blobs * 2];

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {

  // position of the pixel divided by resolution, to get normalized positions on the canvas
  vec2 st = gl_FragCoord.xy/u_resolution.xy; 
  
  //vec2 mp = u_mouse.xy / u_resolution.xy;
  //mp.y = 1.0 - mp.y; // Flip mouse coordinates to match GL coords
  
  //vec2 blob = u_blob_position.xy / u_resolution.xy;
  vec2 blob = vec2(u_blob_position_array[0],u_blob_position_array[1]) / u_resolution.xy;
  blob.y = 1.0 - blob.y;// Flip mouse coordinates to match GL coords
  

   vec2 blob1 = vec2(u_blob_position_array[2],u_blob_position_array[3]) / u_resolution.xy;
  blob1.y = 1.0 - blob1.y;// Flip mouse coordinates to match GL coords
  
  
  // Lets use the pixels position on the x-axis as our gradient for the red color
  // Where the position is closer to 0.0 we get black (st.x = 0.0)
  // Where the position is closer to width (defined as 1.0) we get red (st.x = 1.0)

  //gl_FragColor = vec4(0.0,1.0,0.0,1.0); // R,G,B,A
  //gl_FragColor = vec4(abs(sin(u_time/1000.0)),0.0,0.0,1.0);
 //gl_FragColor = vec4(mp.x,mp.y,0.0,1.0); // R,G,B,A
  float d1 = distance(st,blob)/sqrt(2.0);
  float d2 = distance(st,blob1)/sqrt(2.0);
  //float d2 = 0.0;
  //float d = 0.99*(d1 + d2)/(sqrt(2.0) + sqrt(2.0));
  float d = pow((d1 + d2)/2.0,0.8);
  vec3 color = hsb2rgb(vec3(d,1.0,1.0));
    gl_FragColor = vec4(color,1.0);

  

  // you can only have one gl_FragColor active at a time, but try commenting the others out
  // try the green component

  //gl_FragColor = vec4(0.0,st.x,0.0,1.0); 

  // try both the x position and the y position
  
  //gl_FragColor = vec4(st.x,st.y,0.0,1.0); 
}

