"use client"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { useTexture, shaderMaterial } from "@react-three/drei"
import { DoubleSide } from "three"
import { Suspense, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useSplashScreenStore } from "../../store/store"

const InvertShaderMaterial = shaderMaterial(
  { uTexture: null, uInvert: false },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform bool uInvert;
    void main() {
      vec4 color = texture2D(uTexture, vUv);
      if (color.a < 0.1) discard; // Add alpha test to hide background boxes
      if (uInvert) {
        color.rgb = 1.0 - color.rgb;
      }
      gl_FragColor = color;
    }
  `
)

extend({ InvertShaderMaterial })

const LoadingBar = () => {
  const progress = useSplashScreenStore((state: any) => state.progress)
  const [smoothProgress, setSmoothProgress] = useState(0)

  useFrame((state, delta) => {
    // Smoothly interpolate towards the actual progress
    setSmoothProgress((prevValue) => {
      const target = progress
      const diff = target - prevValue
      if (Math.abs(diff) < 0.1) return target
      return prevValue + diff * delta * 2 // Adjust speed here
    })
  })

  const thetaLength = (smoothProgress / 100) * Math.PI * 2

  return (
    <group position={[0, 0.06, 0]}>
      <mesh>
        <cylinderGeometry
          key={thetaLength} // Force reconstruction when progress changes
          args={[3.205, 3.205, 0.07, 64, 1, true, 0, thetaLength]}
        />
        <meshBasicMaterial
          color="#ffffff"
          side={DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

const Shape = () => {
  const { size } = useThree()
  const { resolvedTheme } = useTheme()
  const texture = useTexture("/textures/texture.png")
  const isInverted = resolvedTheme === "dark"
  const meshRef = useRef<any>(null)

  // Use window dimensions for responsive scaling
  const responsiveScale = useMemo(() => {
    if(window.innerWidth <= 764){
      return size.width/window.innerHeight 
    }
    return size.width/window.innerWidth * 0.7
  }, [])

  const material = useMemo(() => {
    return new InvertShaderMaterial()
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.3
    }
  })

  return (
    <group rotation={[0, 0.5, 0.2]} scale={responsiveScale}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[3, 3, 1, 30, 30, true]} />
        <primitive
          object={material}
          uTexture={texture}
          uInvert={isInverted}
          transparent
          side={DoubleSide}
        />
      </mesh>
      <LoadingBar />
    </group>
  )
}

export default function Splash() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <Suspense fallback={null}>
        <Shape />
      </Suspense>
    </Canvas>
  )
}
