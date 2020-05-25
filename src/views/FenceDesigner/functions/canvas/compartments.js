import store from '../../../../store/index.js'

export function drawMainCompartment (canvas, canvasHTML, globalSettings) {
    drawCompartmentTop(canvas, canvasHTML, globalSettings)
    drawCompartmentBottom(canvas, canvasHTML, globalSettings)
}

export function drawObjectsCompartment (canvas, canvasHTML, globalSettings, tabObjects) {
    if (tabObjects.length > 0) {
        let point = parseInt(globalSettings.margin)
        // let Y1 = canvasHTML.height - parseInt(globalSettings.margin)
        let Y2 = parseInt(globalSettings.margin)
        let Y = parseInt(globalSettings.margin)
        // drawDashCompartmentVertical(canvas, point, Y1, Y2)
        for (let i in tabObjects) {
            let objectType = tabObjects[i].objectTypeId
            let objectWidth = 0

            if (objectType === 4 || objectType === 3) {
                objectWidth = (parseInt(tabObjects[i].width) * parseInt(tabObjects[i].brick.width))
            } else if (objectType === 1 || objectType === 2) {
                objectWidth = parseInt(tabObjects[i].width)
            }

            let X = point + objectWidth
            // drawCompartmentDot(canvas, X, Y1)
            drawCompartmentDot(canvas, X, Y2)
            // drawDashCompartmentVertical(canvas, X, Y1, Y2)
            let X1 = point
            let X2 = point + objectWidth
            drawHorizontalCompartmentLengthAboveLine(canvas, X1, X2, Y, objectWidth)
            point += objectWidth
        }
    }
}

// function drawDashCompartmentVertical (canvas, X, Y1, Y2) {
//     canvas.beginPath()
//     canvas.strokeStyle = store.state.configuration.canvas.compartmentsColor
//     canvas.setLineDash([3, 3])
//     canvas.moveTo(X, Y1)
//     canvas.lineTo(X, Y2)
//     canvas.stroke()
//     canvas.setLineDash([])
//     drawCompartmentDot(canvas, X, Y1)
//     drawCompartmentDot(canvas, X, Y2)
// }

function drawCompartmentBottom (canvas, canvasHTML, globalSettings) {
    let Y = canvasHTML.height - parseInt(globalSettings.margin)
    let X1 = parseInt(globalSettings.margin)
    let X2 = canvasHTML.width - parseInt(globalSettings.margin)
    let length = canvasHTML.width - (2 * parseInt(globalSettings.margin))

    canvas.beginPath()
    canvas.strokeStyle = store.state.configuration.canvas.compartmentsColor
    canvas.moveTo(X1, Y)
    canvas.lineTo(X2, Y)
    canvas.stroke()
    drawCompartmentDot(canvas, X1, Y)
    drawCompartmentDot(canvas, X2, Y)
    drawHorizontalCompartmentLengthUnderLine(canvas, X1, X2, Y, length)
}

function drawCompartmentTop (canvas, canvasHTML, globalSettings) {
    let Y = parseInt(globalSettings.margin)
    let X1 = parseInt(globalSettings.margin)
    let X2 = canvasHTML.width - parseInt(globalSettings.margin)

    canvas.beginPath()
    canvas.strokeStyle = store.state.configuration.canvas.compartmentsColor
    canvas.moveTo(X1, Y)
    canvas.lineTo(X2, Y)
    canvas.stroke()
    drawCompartmentDot(canvas, X1, Y)
    drawCompartmentDot(canvas, X2, Y)
}

function drawCompartmentDot (canvas, X, Y) {
    canvas.beginPath()
    canvas.arc(X, Y,3,0,2*Math.PI);
    canvas.fillStyle = store.state.configuration.canvas.compartmentsColor
    canvas.fill();
}

function drawHorizontalCompartmentLengthUnderLine (canvas, X1, X2, Y, length) {
    let X = (X1 + X2) / 2
    canvas.beginPath()
    canvas.font = '14px Arial'
    canvas.textAlign = 'center'
    canvas.fillText(length + ' ' + store.state.unitOfMeasure, X, Y + 15)
}

function drawHorizontalCompartmentLengthAboveLine (canvas, X1, X2, Y, length) {
    let X = (X1 + X2) / 2
    canvas.beginPath()
    canvas.font = '14px Arial'
    canvas.textAlign = 'center'
    canvas.fillText(length + ' ' + store.state.unitOfMeasure, X, Y - 10)
}