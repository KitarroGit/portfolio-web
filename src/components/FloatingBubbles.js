import React, { useEffect, useRef } from 'react'

const BUBBLE_COUNT = 15
const BUBBLE_COLORS = ['#4B0082', '#8A2BE2', '#9400D3', '#9932CC', '#BA55D3']

function getRandomColor() {
  return BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)]
}

export default function FloatingBubbles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const bubbles = Array.from({ length: BUBBLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 100 + 50,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: getRandomColor(),
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubbles.forEach((bubble) => {
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fillStyle = bubble.color + '20' // 20 is the hex value for 12.5% opacity
        ctx.fill()

        bubble.x += bubble.dx
        bubble.y += bubble.dy

        if (bubble.x < -bubble.radius) bubble.x = canvas.width + bubble.radius
        if (bubble.x > canvas.width + bubble.radius) bubble.x = -bubble.radius
        if (bubble.y < -bubble.radius) bubble.y = canvas.height + bubble.radius
        if (bubble.y > canvas.height + bubble.radius) bubble.y = -bubble.radius
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}