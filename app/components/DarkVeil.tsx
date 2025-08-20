/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
import "./DarkVeil.css";

const vertex = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform float uHueShift;
uniform float uNoise;
uniform float uScan;
uniform float uScanFreq;
uniform float uWarp;

#define PI 3.14159265359

// Noise functions
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

// Color manipulation
vec3 hueShift(vec3 color, float shift) {
    vec3 yiq = vec3(
        dot(color, vec3(0.299, 0.587, 0.114)),
        dot(color, vec3(0.596, -0.274, -0.322)),
        dot(color, vec3(0.211, -0.523, 0.312))
    );
    
    float angle = shift * PI / 180.0;
    float cosh = cos(angle);
    float sinh = sin(angle);
    
    yiq.yz = vec2(
        yiq.y * cosh - yiq.z * sinh,
        yiq.y * sinh + yiq.z * cosh
    );
    
    return vec3(
        dot(yiq, vec3(1.0, 0.956, 0.621)),
        dot(yiq, vec3(1.0, -0.272, -0.647)),
        dot(yiq, vec3(1.0, -1.106, 1.703))
    );
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 st = uv * 2.0 - 1.0;
    
    // Apply warp effect
    float warp = uWarp * 0.1;
    st += warp * vec2(
        sin(st.y * 2.0 * PI + uTime * 0.5),
        cos(st.x * 2.0 * PI + uTime * 0.3)
    );
    
    // Create animated noise pattern
    float noise1 = fbm(st * 3.0 + uTime * 0.2);
    float noise2 = fbm(st * 5.0 - uTime * 0.3);
    float noise3 = fbm(st * 7.0 + uTime * 0.1);
    
    // Combine noise layers
    float combinedNoise = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
    
    // Create dark veil effect
    float veil = smoothstep(0.3, 0.7, combinedNoise);
    veil = pow(veil, 2.0); // Make it darker
    
    // Add some variation based on position
    float edgeFade = 1.0 - length(st) * 0.5;
    veil *= edgeFade;
    
    // Create base color (dark with some variation)
    vec3 baseColor = vec3(0.05, 0.02, 0.1); // Dark purple-blue
    vec3 colorVariation = vec3(0.1, 0.05, 0.2) * combinedNoise;
    vec3 finalColor = baseColor + colorVariation;
    
    // Apply hue shift
    finalColor = hueShift(finalColor, uHueShift);
    
    // Add scanlines
    if (uScan > 0.0) {
        float scanline = sin(gl_FragCoord.y * uScanFreq) * 0.5 + 0.5;
        float scanlineEffect = 1.0 - (scanline * scanline) * uScan;
        finalColor *= scanlineEffect;
    }
    
    // Add noise overlay
    if (uNoise > 0.0) {
        float noiseOverlay = random(gl_FragCoord.xy + uTime) * 2.0 - 1.0;
        finalColor += noiseOverlay * uNoise;
    }
    
    // Apply veil opacity
    float alpha = 0.8 + veil * 0.2;
    
    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), alpha);
}
`;

type Props = {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
  resolutionScale?: number;
};

export default function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0.1,
  scanlineIntensity = 0.2,
  speed = 0.5,
  scanlineFrequency = 0.5,
  warpAmount = 0.3,
  resolutionScale = 1,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas,
      alpha: true,
    });

    const gl = renderer.gl;
    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uHueShift: { value: hueShift },
        uNoise: { value: noiseIntensity },
        uScan: { value: scanlineIntensity },
        uScanFreq: { value: scanlineFrequency },
        uWarp: { value: warpAmount },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w * resolutionScale, h * resolutionScale);
      program.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", resize);
    resize();

    const start = performance.now();
    let frame: number;

    const loop = () => {
      const time = (performance.now() - start) / 1000;
      
      program.uniforms.uTime.value = time * speed;
      program.uniforms.uHueShift.value = hueShift;
      program.uniforms.uNoise.value = noiseIntensity;
      program.uniforms.uScan.value = scanlineIntensity;
      program.uniforms.uScanFreq.value = scanlineFrequency;
      program.uniforms.uWarp.value = warpAmount;
      
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [
    hueShift,
    noiseIntensity,
    scanlineIntensity,
    speed,
    scanlineFrequency,
    warpAmount,
    resolutionScale,
  ]);

  return (
    <canvas 
      ref={ref} 
      className="dark-veil-canvas"
    />
  );
}
