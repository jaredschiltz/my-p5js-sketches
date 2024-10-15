
#ifdef GL_ES
precision mediump float;
#endif

#define band_width 1.0/7.0



uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file

uniform float u_time;
uniform vec2 u_mouse;

float plot(vec2 st, float pct){
  
  return  smoothstep( pct-0.015, pct, st.y) -
          smoothstep( pct, pct+0.015, st.y);
          
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    if (step(0.0 * band_width
,st.y) - step(1.0 * band_width
,st.y) > 0.5) {
      
       gl_FragColor = vec4(148.0/256.0, 0, 211.0/256.0,1.0);
    }
  else if (step(1.0 * band_width
,st.y) - step(2.0 * band_width
,st.y) > 0.5){
    gl_FragColor = vec4(75.0/256.0, 0, 130.0/256.0,1.0);
  }
    else if (step(2.0 * band_width
,st.y) - step(3.0 * band_width
,st.y) > 0.5){
    gl_FragColor = vec4(0.0, 0, 1.0,1.0);
  }
      else if (step(3.0 * band_width
,st.y) - step(4.0 * band_width
,st.y) > 0.5){
    gl_FragColor = vec4(0.0, 1.0, 0.0,1.0);
  }
      else if (step(4.0 * band_width
,st.y) - step(5.0 * band_width
,st.y) > 0.5){
    gl_FragColor = vec4(1.0, 1.0, 0.0,1.0);
  }
      else if (step(5.0 * band_width
,st.y) - step(6.0 * band_width
,st.y) > 0.5){
    gl_FragColor = vec4(1.0, 127.0/256.0, 0,1.0);
  }  
        else if (step(6.0 * band_width
,st.y) - step(7.0 * band_width
,st.y) > 0.5){
    gl_FragColor = vec4(1.0, 0.0, 0,1.0);
  }  
  else{
    gl_FragColor = vec4(0.0,0.0,0.0,1.0);
  }
    
    

    
    

}
