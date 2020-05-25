import { drawMainCompartment, drawObjectsCompartment } from './canvas/compartments'
import { drawFenceObjects } from './canvas/fenceObjects'

export function drawCanvas (canvas, canvasHTML, globalSettings, tabObjects) {
    canvas.clearRect(0, 0, canvasHTML.width, canvasHTML.height)
    drawMainCompartment(canvas, canvasHTML, globalSettings)
    drawObjectsCompartment(canvas, canvasHTML, globalSettings, tabObjects)
    drawFenceObjects(canvas, canvasHTML, globalSettings, tabObjects)
}