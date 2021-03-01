import React, { useCallback, useEffect, useRef } from 'react'
// eslint-disable-next-line
import { Point } from 'jsqr/dist/locator'
// eslint-disable-next-line
import jsQR, { QRCode } from 'jsqr'

export type ValidFreq = 100 | 200 | 300 | 400 | 500
export const validFreq = [100, 200, 300, 400, 500]

export interface BarDetectProps {
  width?: number
  height?: number
  rageMode?: boolean
  freq?: ValidFreq
  off?: false
  videoStyle?: React.CSSProperties
  onDetect?: (data: string) => void
  onError?: (e: unknown) => void
  onProcess?: (code: QRCode | null) => void
  [key: string]: any
}

export const BarDetect = ({
  width,
  height,
  off = false,
  freq = 200,
  videoStyle,
  rageMode = false,
  onDetect = console.log,
  onError = console.error,
  onProcess,
  ...props
}: BarDetectProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rageRef = useRef(rageMode)

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
      if (onProcess) return onProcess(code)
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
        onDetect(code.data)
      }
    }
    if (rageRef.current) requestAnimationFrame(tick)
  }, [rageMode])
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
        onError(error)
      })
  }, [])
  useEffect(() => {
    rageRef.current = rageMode
    if (rageRef.current) {
      const animation = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(animation)
    }
    let animation: number
    const interval = setInterval(() => {
      animation = requestAnimationFrame(tick)
    }, freq)
    return () => {
      clearInterval(interval)
      cancelAnimationFrame(animation)
    }
  }, [freq, rageMode])
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
