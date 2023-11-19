import React, { useContext, useEffect, useRef } from 'react'
import { confetti } from 'tsparticles-confetti'
import options from './confettisShapeOptions';
import { ConfettiContext } from '../../../utils/context';

export default function Confettis({ canvasId }) {
    const { fired } = useContext(ConfettiContext)
    const canvasRef = useRef()
    let count = 30
    const defaults = {
        origin: { y: 0.7 },
    };

    useEffect(() => {
        if (!fired) return
        for (let i = 0; i < 2; i++) {
            const myX = i % 2 === 0 ? 0.1 : 0.9
            let myOrigin = { x: myX, y: 0.2 }
            setTimeout(() => {
                canvasRef.confettis({
                    origin: myOrigin,
                    spread: 270,
                    ticks: 200,
                    gravity: 1,
                    decay: 0.94,
                    startVelocity: 20,
                    particleCount: count,
                    scalar: 3,
                    shapes: ["image"],
                    shapeOptions: options,
                });
            }, 300 * i)
        }
    }, [fired])

    useEffect(() => {
        (async () => {
            canvasRef.confettis = await confetti.create(canvasRef.current, { resize: true });
        })()
    }, [])

    return (
        <>
            <canvas className={`canvas__confettis canvas__confettis__${canvasId}`} ref={canvasRef}></canvas>
        </>
    )
}
