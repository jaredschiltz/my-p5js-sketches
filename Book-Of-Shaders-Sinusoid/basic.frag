
#ifdef GL_ES
precision mediump float;
#endif

#define frequency 20.0



uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file

uniform float u_time;
uniform vec2 u_mouse;

float plot(vec2 st, float pct){
  
  return  smoothstep( pct-0.015, pct, st.y) -
          smoothstep( pct, pct+0.015, st.y);
          
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float y = (0.25*sin(st.x * frequency + u_time * 0.01) + 0.5);

    vec3 color = vec3(y);

    float pct = plot(st,y);

    color = pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);

}
