// Dream Fog Shader - Cinematic animated fog with noise-based swirling
precision highp float;

uniform float uTime;
uniform float uOpacity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uNoiseScale;

varying vec3 vPosition;

// Simplex-like noise function for organic motion
float noise(vec3 p) {
  return sin(p.x * 12.9898 + p.y * 78.233 + p.z * 45.164) * 
         sin(p.y * 94.673 + p.z * 45.164 + p.x * 12.9898) * 43758.5453;
}

// Fractional Brownian Motion for organic variation
float fbm(vec3 p, int octaves) {
  float value = 0.0;
  float amplitude = 1.0;
  float frequency = 1.0;
  float maxValue = 0.0;
  
  for(int i = 0; i < 4; i++) {
    if(i >= octaves) break;
    value += amplitude * (sin(noise(p * frequency)) * 0.5 + 0.5);
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
    p += vec3(uTime * 0.05, uTime * 0.03, uTime * 0.04);
  }
  
  return value / maxValue;
}

void main() {
  vec3 p = vPosition * uNoiseScale;
  
  // Multi-octave noise for dreamy swirls
  float fog = fbm(p, 4);
  
  // Add slow time-based animation
  fog += sin(uTime * 0.3 + length(vPosition)) * 0.3;
  fog = clamp(fog, 0.0, 1.0);
  
  // Blend between two dream colors
  vec3 color = mix(uColor1, uColor2, fbm(p + uTime * 0.1, 3));
  
  gl_FragColor = vec4(color, fog * uOpacity);
}
