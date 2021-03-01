import React, { useCallback, useEffect, useRef, useState } from 'react'
import jsQR from 'jsqr'
// eslint-disable-next-line
import { Point } from 'jsqr/dist/locator'

export interface BarDetectProps {
  width?: number
  height?: number
  freq?: 100 | 200 | 300 | 400 | 500
  off?: false
  videoStyle?: React.CSSProperties
  [key: string]: any
}

const BarDetect = ({
  width,
  height,
  off = false,
  freq = 200,
  videoStyle,
  ...props
}: BarDetectProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [update, setUpdate] = useState(0)
  const updateIt = () => setUpdate((prevState) => prevState + 1)

  const tick = useCallback(() => {
    if (off) return
    if (
      videoRef.current &&
      canvasRef.current &&
      videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
    ) {
      canvasRef.current.hidden = false
      const context = canvasRef.current.getContext('2d')
      if (!context) return
      const drawLine = (begin: Point, end: Point, color: string) => {
        context.beginPath()
        context.moveTo(begin.x, begin.y)
        context.lineTo(end.x, end.y)
        context.lineWidth = 4
        context.strokeStyle = color
        context.stroke()
      }
      console.log(videoRef.current.videoHeight)
      canvasRef.current.height = videoRef.current.videoHeight
      canvasRef.current.width = videoRef.current.videoWidth
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
      const imageData = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      })
      if (code) {
        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          '#FF3B58'
        )
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          '#FF3B58'
        )
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          '#FF3B58'
        )
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          '#FF3B58'
        )
        console.log(code.data)
      }
    }
  }, [])
  useEffect(tick, [update])
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'environment',
          frameRate: 10,
          height,
          width
        },
        audio: false
      })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }, [])
  useEffect(() => {
    const interval = setInterval(updateIt, freq)
    return () => clearInterval(interval)
  }, [freq])
  return (
    <div {...props}>
      <video
        hidden
        playsInline
        ref={videoRef}
        width={width}
        height={height}
        style={videoStyle}
        autoPlay
      />
      <canvas ref={canvasRef} width={width} height={height} hidden />
    </div>
  )
}

export default BarDetect
