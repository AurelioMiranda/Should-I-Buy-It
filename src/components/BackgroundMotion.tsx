'use client'
import * as motion from 'motion/react-client'
import { useEffect, useState, useRef } from 'react'

type Particle = {
  id: number
  baseX: number
  baseY: number
  scale: number
  delay: number
  duration: number
}

const randomPercent = () => Math.random() * 100
const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min

const DRIFT_RANGE = 10 // pixels for smooth drift
const MOVE_RANGE = 5 // % range to move base position on each update

export default function BackgroundMotion() {
  const [particles, setParticles] = useState<Particle[]>([])

  const timersRef = useRef<Map<number, NodeJS.Timeout>>(new Map())

  useEffect(() => {
    const initialParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      baseX: randomPercent(),
      baseY: randomPercent(),
      scale: randomBetween(0.5, 1.2),
      delay: randomBetween(0, 10),
      duration: randomBetween(8, 15),
    }))
    setParticles(initialParticles)
  }, [])

  useEffect(() => {
    if (particles.length === 0) return

    // for each particle a timer updates their position independently
    particles.forEach((particle) => {
      const updatePosition = () => {
        setParticles((prev) =>
          prev.map((p) =>
            p.id === particle.id
              ? {
                  ...p,
                  baseX: Math.min(100, Math.max(0, p.baseX + randomBetween(-MOVE_RANGE, MOVE_RANGE))),
                  baseY: Math.min(100, Math.max(0, p.baseY + randomBetween(-MOVE_RANGE, MOVE_RANGE))),
                }
              : p
          )
        )
        // next update with random delay
        const nextDelay = randomBetween(5000, 15000)
        timersRef.current.set(
          particle.id,
          setTimeout(updatePosition, nextDelay)
        )
      }

      // first update timer with random delay
      const initialDelay = randomBetween(0, 15000)
      timersRef.current.set(
        particle.id,
        setTimeout(updatePosition, initialDelay)
      )
    })

    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer))
      timersRef.current.clear()
    }
  }, [particles.length])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" style={{ top: 0, left: 0 }}>
      {particles.map(({ id, baseX, baseY, scale, delay, duration }) => (
        <motion.div
          key={id}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            top: `${baseY}%`,
            left: `${baseX}%`,
            scale,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            x: [-DRIFT_RANGE, DRIFT_RANGE, -DRIFT_RANGE],
            y: [-DRIFT_RANGE, DRIFT_RANGE, -DRIFT_RANGE],
          }}
          transition={{
            opacity: {
              duration: duration / 2,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay,
            },
            x: {
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            },
            y: {
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            },
          }}
        />
      ))}
    </div>
  )
}
