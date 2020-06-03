import { drawMainCompartment, drawTabsCompartment } from './canvas/compartments'
import { drawFenceObjects } from './canvas/fenceObjects'

export function drawCanvas (canvas, canvasHTML, globalSettings, tabs) {
    let tabObjects = []
    for (let i in tabs) {
        for (let j in tabs[i].objects) {
            tabObjects.push(tabs[i].objects[j])
        }
    }
    canvas.clearRect(0, 0, canvasHTML.width, canvasHTML.height)
    drawMainCompartment(canvas, canvasHTML, globalSettings)
    // drawObjectsCompartment(canvas, canvasHTML, globalSettings, tabObjects)
    drawTabsCompartment(canvas, canvasHTML, globalSettings, tabs)
    drawFenceObjects(canvas, canvasHTML, globalSettings, tabObjects)
}