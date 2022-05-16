import React, { useEffect, useRef, useState } from 'react'
// import useCanvas from './useCanvas'

interface CanvasProps {
}

function resizeCanvas(canvas) {
	console.log('resize')
    const { width, height } = canvas.getBoundingClientRect()
    
    if (canvas.width !== width || canvas.height !== height){
		const { devicePixelRatio : ratio = 1 } = window
		const context = canvas.getContext('2d')
		canvas.width = width * ratio
		canvas.height = height * ratio
		context.scale(ratio, ratio)
		return true
    }

    return false
}

// function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
    
// 	const { width, height } = canvas.getBoundingClientRect()

// 	if (canvas.width !== width || canvas.height !== height) {
// 		canvas.width = width
// 		canvas.height = height
// 		return true // here you can return some usefull information like delta width and delta height instead of just true
// 		// this information can be used in the next redraw...
// 	}

// 	return false
// }

const Canvas = (props: CanvasProps) => {
	const {...rest} = props
	// Personalized Hook for Canvas
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const [y, sety] = useState(10);

	const keyDownHandler = (event: React.KeyboardEvent) => {
		if (event.code === "ArrowUp")
		{
			console.log(`ArrowUp: ${y}`)
			if (y > 10)
				sety(y - 20);
		}
		else if (event.code === "ArrowDown")
		{
			sety(y + 20)
		}
	}
	
	const draw = (ctx: CanvasRenderingContext2D) => {
		console.log('ciao')
		// ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.fillStyle = 'white'
		ctx.fillRect(50, y, 20, 150)
		ctx.fill()
	}

	useEffect(() => {
    
		const canvas = canvasRef.current
		if (canvas)
		{
			const context = canvas.getContext('2d')
			if (context)
			{
				let animationFrameId: number
			
				const render = () => {
					// predraw(canvas)
					canvas.height = canvas.width * 3/4
					draw(context)
					// Calls render recursively
					// animationFrameId = window.requestAnimationFrame(render)
					// postdraw(frameCount, context)
				}
				// Resize canvas before the animation loop otherwise isn't gonna
				// be responsive to vw.
				resizeCanvas(canvas)
				render()
			}
			// return () => {
			// 	window.cancelAnimationFrame(animationFrameId)
			// }
		}
	}, [draw, y])
  
	return <canvas ref={canvasRef} onKeyDown={keyDownHandler} tabIndex={0}/>
}

export default Canvas