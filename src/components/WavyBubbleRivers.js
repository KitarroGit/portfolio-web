import React, { useEffect, useRef } from 'react'

const BUBBLE_COLORS = ['#4B0082', '#8A2BE2', '#9400D3', '#9932CC', '#BA55D3']
const RIVER_COUNT = 4
const BUBBLES_PER_RIVER = 200
const BASE_RIVER_WIDTH = 360
const WIDTH_VARIATION = 100
const MAX_BUBBLE_SIZE = 16.2
const MIN_BUBBLE_SIZE = 6.2
const CURSOR_EFFECT_RADIUS = 400
const MAX_SIZE_INCREASE = 1.5
const LANE_COUNT = 9
const LANE_CHANGE_PROBABILITY = 0.005
const LANE_CHANGE_SPEED = 0.05
const BLUR_AMOUNT = '100px'

function getRandomColor() {
  return BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)]
}

class Bubble {
  constructor(x, y, radius, color, speed, lane) {
    this.x = x
    this.y = y
    this.radius = radius
    this.originalRadius = radius
    this.color = color
    this.speed = speed
    this.t = Math.random() * 100
    this.lane = lane
    this.targetLane = lane
  }

  update(path, width, mouseX, mouseY) {
    this.t += this.speed
    if (this.t > 1) this.t -= 1

    if (Math.abs(this.lane - this.targetLane) > 0.01) {
      this.lane += (this.targetLane - this.lane) * LANE_CHANGE_SPEED
    } else {
      this.lane = this.targetLane
    }

    if (Math.random() < LANE_CHANGE_PROBABILITY && this.lane === this.targetLane) {
      const direction = Math.random() < 0.5 ? -1 : 1
      const newLane = Math.max(0, Math.min(LANE_COUNT - 1, this.targetLane + direction))
      if (Math.abs(newLane - this.targetLane) === 1) {
        this.targetLane = newLane
      }
    }

    const point = path(this.t)
    const currentWidth = width(this.t)
    const laneWidth = currentWidth / LANE_COUNT
    const laneOffset = (this.lane - (LANE_COUNT - 1) / 2) * laneWidth

    this.x = point.x + laneOffset
    this.y = point.y

    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const sizeIncrease = Math.max(0, 1 - distance / CURSOR_EFFECT_RADIUS) * MAX_SIZE_INCREASE
    this.radius = this.originalRadius * (1 + sizeIncrease)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color + '40'
    ctx.fill()
  }
}

function createWavyPath(startX, startY, endX, endY, amplitude, frequency) {
  return (t) => {
    const x = startX + (endX - startX) * t
    const y = startY + (endY - startY) * t + Math.sin(t * Math.PI * frequency) * amplitude
    return { x, y }
  }
}

function createWidthFunction() {
  const points = Array.from({ length: 10 }, () => Math.random() * WIDTH_VARIATION + BASE_RIVER_WIDTH)
  return (t) => {
    const index = Math.floor(t * (points.length - 1))
    const nextIndex = Math.min(index + 1, points.length - 1)
    const fraction = t * (points.length - 1) - index
    return points[index] * (1 - fraction) + points[nextIndex] * fraction
  }
}

export default function WavyBubbleRivers() {
  const canvasRef = useRef(null)
  const blurredCanvasRef = useRef(null)
  const rivers = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const blurredCanvas = blurredCanvasRef.current
    const blurredCtx = blurredCanvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      blurredCanvas.width = window.innerWidth
      blurredCanvas.height = window.innerHeight
      initRivers()
    }

    const initRivers = () => {
      rivers.current = []
      for (let i = 0; i < RIVER_COUNT; i++) {
        const startX = i % 2 === 0 ? 0 : canvas.width
        const startY = Math.random() * canvas.height
        const endX = i % 2 === 0 ? canvas.width : 0
        const endY = Math.random() * canvas.height
        const amplitude = Math.random() * 100 + 50
        const frequency = Math.random() * 2 + 1

        const path = createWavyPath(startX, startY, endX, endY, amplitude, frequency)
        const widthFunction = createWidthFunction()
        const bubbles = []

        for (let j = 0; j < BUBBLES_PER_RIVER; j++) {
          const t = j / BUBBLES_PER_RIVER
          const { x, y } = path(t)
          const lane = Math.floor(Math.random() * LANE_COUNT)
          bubbles.push(new Bubble(
            x,
            y,
            Math.random() * (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE) + MIN_BUBBLE_SIZE,
            getRandomColor(),
            Math.random() * 0.001 + 0.0005,
            lane
          ))
        }

        rivers.current.push({ path, widthFunction, bubbles })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      blurredCtx.clearRect(0, 0, blurredCanvas.width, blurredCanvas.height)

      rivers.current.forEach(river => {
        river.bubbles.forEach(bubble => {
          bubble.update(river.path, river.widthFunction, mousePos.current.x, mousePos.current.y)
          bubble.draw(blurredCtx)
        })
      })

      ctx.filter = `blur(${BLUR_AMOUNT})`
      ctx.drawImage(blurredCanvas, 0, 0)
      ctx.filter = 'none'

      rivers.current.forEach(river => {
        river.bubbles.forEach(bubble => {
          bubble.draw(ctx)
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (event) => {
      mousePos.current = { x: event.clientX, y: event.clientY }
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    resizeCanvas()
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <canvas ref={blurredCanvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ display: 'none' }} />
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
    </>
  )
}