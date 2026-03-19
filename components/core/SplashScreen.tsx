"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import Splash from "../canvas/Splash"
import { useSplashScreenStore } from "../../store/store"

export default function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const splashContainerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const setLoaded = useSplashScreenStore((state) => state.setLoaded)
  const setProgress = useSplashScreenStore((state) => state.setProgress)

  useEffect(() => {
    // Commented out animations for debugging

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaded(true)
      },
    })

    // Initial state set to visible for debugging
    gsap.set(counterRef.current, { opacity: 1, y: 0 })

    // Step 1: Entry
    tl.fromTo(
      splashContainerRef.current,
      { y: 500, opacity: 0 }, // FROM these values
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" } // TO these values
    ).to(
      counterRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.5"
    )

    // Step 2: Progress Counter
    const counterObj = { value: 0 }
    tl.to(counterObj, {
      value: 100,
      duration: 3,
      ease: "power1.inOut",
      onUpdate: () => {
        const val = Math.floor(counterObj.value)
        if (counterRef.current) {
          counterRef.current.innerText = `${val}%`
        }
        setProgress(val)
      },
    })

    // Step 3: Exit
    tl.to(splashContainerRef.current, {
      y: 500,
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: "power3.in",
      delay: 0.5,
    }).to(
      counterRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 1,
      },
      "-=0.8"
    )
  }, [setLoaded, setProgress])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex h-dvh w-full items-center justify-center overflow-hidden bg-background"
    >
      {/* 3D Splash Container - Fullscreen for absolute centering */}
      <div ref={splashContainerRef} className="absolute inset-0 h-full w-full">
        <Splash />
      </div>

      {/* Loading Counter - Positioned at 20% from bottom */}
      <div
        ref={counterRef}
        className="absolute bottom-[20%] font-mono text-xl font-bold tracking-tighter opacity-0"
      >
        0 %
      </div>
    </div>
  )
}
