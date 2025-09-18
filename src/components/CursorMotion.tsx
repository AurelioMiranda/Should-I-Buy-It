'use client'

import * as motion from "motion/react-client";
import { useEffect, useState } from 'react'

export default function CursorMotion() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isPointerCursor, setIsPointerCursor] = useState(false)
    const [isDesktop, setIsDesktop] = useState(true)

    useEffect(() => {
        // Detect if device uses fine pointer (mouse, trackpad) vs coarse (touch)
        const mq = window.matchMedia('(pointer: fine)')
        setIsDesktop(mq.matches)

        const updatePointer = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })

            const element = e.target as HTMLElement
            const computedCursor = getComputedStyle(element).cursor
            setIsPointerCursor(computedCursor === 'pointer')

            if (computedCursor === 'pointer') { //TODO: fix this if possible
                document.body.style.cursor = 'none'
            } else {
                document.body.style.cursor = ''
            }
        }

        if (mq.matches) {
            window.addEventListener('mousemove', updatePointer)
        }

        return () => {
            document.body.style.cursor = ''
            window.removeEventListener('mousemove', updatePointer)
        }
    }, [])

    // Load empty tag instead of cursor seeker
    if (!isDesktop) return <span style={{position: 'fixed'}}></span>

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: "rgba(30, 143, 255, 0.23)",
                pointerEvents: 'none',
                zIndex: 9999,
            }}
            animate={{
                x: position.x - 10,
                y: position.y - 10,
                scale: isPointerCursor ? 2 : 1,
            }}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
            }}
        />
    )
}
