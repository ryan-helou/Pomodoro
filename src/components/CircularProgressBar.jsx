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

    // Custom shader material for glow and progress
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(customColor) },
        uProgress: { value: 0 },
        uTime: { value: 0 }
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
        uniform float uTime;

        void main() {
          // Calculate angle from position (0 to 2π)
          float angle = atan(vPosition.y, vPosition.x) + 3.14159265359;
          float normalizedAngle = angle / 6.28318530718; // 0 to 1

          // Progress fill (start from top, go clockwise)
          float adjustedProgress = uProgress / 100.0;
          float startAngle = 1.5 - (adjustedProgress * 6.28318530718);
          float fillArea = mod(normalizedAngle - startAngle + 6.28318530718, 1.0);
          float progressFill = step(fillArea, adjustedProgress);

          // Glow effect based on normal
          vec3 normal = normalize(vNormal);
          float glow = pow(max(0.0, dot(normal, vec3(0.0, 0.0, 1.0))), 2.0);

          // Pulse animation
          float pulse = 0.5 + 0.5 * sin(uTime * 2.0);
          float intensity = 0.6 + 0.4 * glow + pulse * glow * 0.3;

          // Combine color and alpha
          vec3 finalColor = uColor * intensity;
          float alpha = progressFill * (0.8 + 0.2 * glow);

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

    // Add background ring
    const backMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.12,
      transparent: true
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

      const elapsed = clockRef.current.getElapsedTime()

      // Smooth progress interpolation
      const diff = targetProgressRef.current - progressRef.current
      progressRef.current += diff * 0.08

      // Update shader uniforms
      material.uniforms.uProgress.value = progressRef.current
      material.uniforms.uTime.value = elapsed
      material.uniforms.uColor.value.setStyle(customColor)

      // Gentle rotation
      torus.rotation.z += 0.0005
      backTorus.rotation.z -= 0.0002

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
