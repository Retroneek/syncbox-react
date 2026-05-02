import { useEffect, useRef } from "react";

const CHARSET = [" ", ".", ",", ":", ";", "-", "=", "+", "*", "#", "%", "@"];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hash01(seed) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export default function AsciiSmokeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!(canvas instanceof HTMLCanvasElement)) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (context === null) {
      return undefined;
    }

    let frameId = 0;
    let width = 0;
    let height = 0;
    let cellSize = 18;
    let columns = 0;
    let rows = 0;
    let density = new Float32Array(0);
    const lights = Array.from({ length: 8 }, (_, index) => {
      const spreadX = 0.06 + hash01(index + 11) * 0.84;
      const spreadY = 0.08 + hash01(index + 29) * 0.78;

      return {
        baseX: spreadX,
        baseY: spreadY,
        orbitX: 0.06 + hash01(index + 41) * 0.12,
        orbitY: 0.05 + hash01(index + 53) * 0.11,
        driftX: -0.18 + hash01(index + 67) * 0.36,
        driftY: -0.16 + hash01(index + 79) * 0.32,
        speed: 0.18 + hash01(index + 97) * 0.34,
        phase: hash01(index + 113) * Math.PI * 2,
        radius: 0.11 + hash01(index + 131) * 0.12,
        hue: 207 + Math.round(hash01(index + 149) * 28),
        alpha: 0.26 + hash01(index + 167) * 0.28,
      };
    });

    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      cellSize = clamp(Math.round(Math.min(width, height) / 48), 14, 20);
      columns = Math.ceil(width / cellSize) + 2;
      rows = Math.ceil(height / cellSize) + 2;
      density = new Float32Array(columns * rows);

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const render = (time) => {
      const halfWidth = width * 0.5;
      const halfHeight = height * 0.5;
      const animatedTime = time * 0.00035;

      const spotPositions = lights.map((light, index) => {
        const phase = animatedTime * light.speed + light.phase;
        const baseX = width * light.baseX;
        const baseY = height * light.baseY;
        const orbitX = baseX + Math.cos(phase + index * 0.6) * width * light.orbitX + Math.sin(phase * 0.7) * width * light.driftX * 0.5;
        const orbitY = baseY + Math.sin(phase * 1.1 - index * 0.45) * height * light.orbitY + Math.cos(phase * 0.8) * height * light.driftY * 0.5;

        return {
          x: orbitX,
          y: orbitY,
          radius: Math.max(width, height) * light.radius,
          hue: light.hue,
          alpha: light.alpha,
        };
      });

      context.clearRect(0, 0, width, height);

      const backdrop = context.createLinearGradient(0, 0, 0, height);
      backdrop.addColorStop(0, "#020610");
      backdrop.addColorStop(0.45, "#040a18");
      backdrop.addColorStop(1, "#000103");
      context.fillStyle = backdrop;
      context.fillRect(0, 0, width, height);

      for (const spot of spotPositions) {
        const glow = context.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius);
        glow.addColorStop(0, `hsla(${spot.hue}, 96%, 74%, ${spot.alpha})`);
        glow.addColorStop(0.18, `hsla(${spot.hue + 5}, 96%, 60%, ${spot.alpha * 0.4})`);
        glow.addColorStop(0.48, `hsla(${spot.hue + 9}, 96%, 50%, ${spot.alpha * 0.14})`);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
      }

      const haze = context.createRadialGradient(halfWidth * 0.72, halfHeight * 0.82, Math.min(width, height) * 0.08, halfWidth, halfHeight, Math.max(width, height) * 0.85);
      haze.addColorStop(0, "rgba(90, 146, 255, 0.04)");
      haze.addColorStop(0.38, "rgba(30, 74, 170, 0.03)");
      haze.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = haze;
      context.fillRect(0, 0, width, height);

      context.font = `${Math.max(12, Math.round(cellSize * 0.9))}px "Kode Mono", monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.shadowBlur = 0;

      for (let row = 0; row < rows; row++) {
        const y = (row - 0.5) * cellSize;

        for (let column = 0; column < columns; column++) {
          const x = (column - 0.5) * cellSize;
          const index = row * columns + column;

          let lightPull = 0;

          for (const spot of spotPositions) {
            const distance = Math.hypot((x - spot.x) / (spot.radius * 0.95), (y - spot.y) / (spot.radius * 0.78));
            lightPull += Math.max(0, 1.15 - distance);
          }

          const edgeFalloff = Math.min(x / width, y / height, (width - x) / width, (height - y) / height);
          const turbulence = Math.sin((x + animatedTime * 220) * 0.024) * 0.09 + Math.cos((y - animatedTime * 170) * 0.018) * 0.09;
          const target = clamp(0.18 + lightPull * 0.42 + edgeFalloff * 0.16 + turbulence, 0, 1);

          density[index] = density[index] * 0.9 + target * 0.14;

          const level = density[index];
          const charIndex = Math.min(CHARSET.length - 1, Math.max(0, Math.floor(level * (CHARSET.length - 1))));
          const char = CHARSET[charIndex];

          if (char === " ") {
            continue;
          }

          context.fillStyle = `rgba(186, 220, 255, ${0.02 + level * 0.3})`;
          context.fillText(char, x + cellSize * 0.5, y + cellSize * 0.5);
        }
      }

      frameId = window.requestAnimationFrame(render);
    };

    resize();
    frameId = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="ascii-smoke-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="ascii-smoke-bg__canvas" />
    </div>
  );
}