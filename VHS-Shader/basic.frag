#ifdef GL_ES
precision mediump float;
#endif
#define frameShape 0.2
#define frameLimit 0.4
#define frameSharpness 1.10
#define TVNoise 0.1
#define PALSignal 1.0
#define phosphors 1.0
#define border 1.0

varying vec2 vTexCoord;
uniform sampler2D texture;
uniform float noise;

uniform int FrameCount;

uniform mediump vec2 OutputSize;
uniform mediump vec2 TextureSize;
uniform mediump vec2 InputSize;


float rand(float x)
{
    vec2 co = vec2(x,x);
    float a = 12.9898;
    float b = 78.233;
    float c = 43758.5453;
    float dt= dot(co.xy ,vec2(a,b));
    float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

vec2 crt(vec2 uv)
{
	uv = (uv - 0.5) * 2.0;
	uv *= 1.1;	
	uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0);
	uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0);
	uv  = (uv / 2.0) + 0.5;
	uv =  uv *0.92 + 0.04;
	return uv;
}


void main() {
  /*
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  
  //vec2 offset = vec2(noise, 0.0);
  vec2 offset = vec2(noise * 0.07,0);
  vec3 col;
  col.r = texture2D(texture, uv + offset).r;
  col.g = texture2D(texture, uv).g;
  col.b = texture2D(texture, uv - offset).b;
  gl_FragColor = vec4(col,1.0);
  */
  
  
   vec2 q = (vTexCoord.xy * TextureSize.xy / InputSize.xy);//fragCoord.xy / iResolution.xy;
    vec2 uv = q;
    uv.y = 1.0 - uv.y;
    uv = mix( uv, crt( uv ), 1.0 ) * InputSize.xy / TextureSize.xy;
    vec4 col = vec4(0.0);
    vec2 uv_q =uv;

    vec2 uv_n = uv_q;
    mat3 rgbtoyuv = mat3(0.299, -0.147,  0.615, 0.587, -0.289, -0.515, 0.114, 0.436, -0.100);
	mat3 yuvtorgb = mat3(1.000, 1.000, 1.000, 0.000, -0.395, 2.032, 1.140, -0.581, 0.000);
    float shade = 1.0;

    if(TVNoise == 1.0)
{
shade -= rand((uv_q.x*float(FrameCount)) * 0.1 + (uv_q.y*float(FrameCount)) * 50.0 + float(FrameCount)) * 0.5;
}

if(PALSignal == 1.0)
{
     vec3 yuv = vec3(0.0);
	float fix = 0.3;
	float lumadelay = -0.002;

  for (int x = 10; x >= 0; x -= 1)
  {
       float xx = float(x) / 10.0;
       if(xx < 0.0) xx = 0.0 ;
       float x1 = (xx * -0.05)* fix + lumadelay;
       float x2 = (xx * 0.1)* fix + lumadelay;
       vec3 mult = (vec3(1.0) - pow(vec3(xx), vec3(0.2, 1.0, 1.0))) * 0.2;
        vec2 uv1 = uv_n + vec2(x1,0.0);
       vec2 uv2 = uv_n + vec2(x2,0.0);
       yuv += (rgbtoyuv * texture2D(texture,uv1).rgb) * mult;
       yuv += (rgbtoyuv * texture2D(texture,uv2).rgb) * mult;

  }
  yuv.r = yuv.r * 0.2 + (rgbtoyuv *  texture2D(texture,uv_n).rgb).r * 0.8;
    col.rgb = yuvtorgb * yuv * shade;
}
else
{
 col.rgb = texture2D(texture,uv_n).rgb;
}
    

   
if(phosphors==1.0)
{
    float mod_factor = q.y * OutputSize.y * OutputSize.y / OutputSize.y;
	vec3 dotMaskWeights = mix(vec3(1.0, 0.7, 1.0),vec3(0.7, 1.0, 0.7),floor(mod(mod_factor, 2.0)));
    col.rgb*= dotMaskWeights;
}
 

if(border ==1.0)
{
    vec2 p=-1.0+2.0*q;
	float f = (1.0- p.x *p.x) * (1.0-p.y *p.y);
	float frame = clamp(frameSharpness * (pow(f, frameShape) - frameLimit), 0.0, 1.0);
	col.rgb*=frame;
}
   gl_FragColor = vec4(col.rgb, 1.0);
   

}