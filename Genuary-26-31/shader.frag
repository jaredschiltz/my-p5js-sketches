precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

// --- SDF Primitives ---
float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

float sdBox(vec2 p, vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

// --- Boolean ops ---
float opUnion(float d1, float d2) {
    return min(d1, d2);
}

float opSubtract(float d1, float d2) {
    return max(d1, -d2);
}

float xorSDF(float d1, float d2) {
    return max(d1, d2) * min(d1, d2) / abs(min(d1, d2) + 0.0001);
}

// --- Scene ---
float scene(vec2 p) {
    // Circle 1 pulsing with time
    float c1 = sdCircle(p, 0.3 + 0.05 * sin(u_time * 2.0));

    // Circle 2 pulsing in opposite phase
    float c2 = sdCircle(p + vec2(0.5, 0.0), 0.3 + 0.05 * cos(u_time * 2.5));

    // Box sliding up/down with time
    float b1 = sdBox(p + vec2(-0.4, 0.0), vec2(0.15, 0.15));
    b1 += 0.05 * sin(u_time * 3.0); // simple vertical modulation

    // Combine shapes: union of circles, subtract box
    float d = opUnion(c1, c2);

    return d;
}

vec3 hsv2rgb(float h, float s, float v){
    vec3 k = vec3(1.0, 2.0/3.0, 1.0/3.0);
    vec3 p = abs(fract(h + k) * 6.0 - 3.0);
    return v * mix(vec3(1.0), clamp(p - 1.0,0.0,1.0), s);
}


void main() {
    // Map pixel coordinates to [-1,1] centered
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float angle = u_time;
uv = vec2(cos(angle)*uv.x - sin(angle)*uv.y, sin(angle)*uv.x + cos(angle)*uv.y);

   // uv = uv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

     // Compute SDF
    float d = scene(uv);

    // Soft edges
    float edge = 0.03;
    float shape = 1.0 - smoothstep(-edge, edge, d);

    // Slight pulsing hue using distance
    //vec3 color = 0.5 + 0.5*cos(6.2831*d*3.0 + vec3(0.0, 2.0, 4.0));

vec3 color = hsv2rgb(u_time*0.1 + d, 0.8, 1.0);
gl_FragColor = vec4(color, 1.0);

}
