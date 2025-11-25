import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CircularProgressBar = ({ timeLeft, totalTime, currentSession, customColor }) => {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const torusRef = useRef(null)
  const rafRef = useRef(null)
  const clockRef = useRef(new THREE.Clock())
  const materialRef = useRef(null)
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)

  // Update target progress
  useEffect(() => {
    const progress = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0
    targetProgressRef.current = progress
  }, [timeLeft, totalTime])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 2.5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    rendererRef.current = renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // Create torus geometry - larger radius for bigger circle
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.15, 32, 64)

    // Custom shader material for progress arc
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(customColor) },
        uProgress: { value: 0 }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;

        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;

        uniform vec3 uColor;
        uniform float uProgress;

        void main() {
          // Calculate angle from position (0 to 2π)
          float angle = atan(vPosition.y, vPosition.x) + 3.14159265359;
          float normalizedAngle = angle / 6.28318530718; // 0 to 1

          // Progress fill (start from top, go clockwise)
          // FIXED: Use fixed starting point instead of rotating angle
          float adjustedProgress = uProgress / 100.0;
          float fillAngle = mod(normalizedAngle + 0.25, 1.0); // Start at top
          float progressFill = step(fillAngle, adjustedProgress);

          // Subtle glow based on normal direction
          vec3 normal = normalize(vNormal);
          float rimLight = pow(max(0.0, 1.0 - dot(normal, vec3(0.0, 0.0, 1.0))), 3.0);

          // Smooth intensity based on progress fill
          float intensity = mix(0.3, 1.0, progressFill);
          intensity += rimLight * 0.5;

          // Color with custom color input
          vec3 finalColor = uColor * intensity;
          float alpha = progressFill * 0.3;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    })

    const torus = new THREE.Mesh(torusGeometry, material)
    scene.add(torus)
    torusRef.current = torus
    materialRef.current = material

    // Add background ring with shader for subtle effect
    const backMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(customColor) }
      },
      vertexShader: `
        varying vec3 vPosition;

        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        uniform vec3 uColor;

        void main() {
          vec3 finalColor = uColor * 0.15;
          gl_FragColor = vec4(finalColor, 0.15);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    })
    const backTorus = new THREE.Mesh(torusGeometry, backMaterial)
    scene.add(backTorus)

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1.5)
    light.position.set(5, 5, 5)
    scene.add(light)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Animation loop
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)

      // Smooth progress interpolation
      const diff = targetProgressRef.current - progressRef.current
      progressRef.current += diff * 0.08

      // Update shader uniforms - only progress and color, no time
      material.uniforms.uProgress.value = progressRef.current
      material.uniforms.uColor.value.setStyle(customColor)
      backMaterial.uniforms.uColor.value.setStyle(customColor)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth || 1
      const height = container.clientHeight || 1
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      torusGeometry.dispose()
      material.dispose()
      backMaterial.dispose()
      renderer.dispose()
    }
  }, [customColor])

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none overflow-visible"
      style={{
        left: '-5%',
        top: '-5%',
        width: '110%',
        height: '110%'
      }}
    />
  )
}

export default CircularProgressBar
