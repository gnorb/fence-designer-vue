export function drawFenceObjects (canvas, canvasHTML, globalSettings, tabObjects) {
    let point = parseInt(globalSettings.margin)
    for (let i in tabObjects) {
        let objectType = tabObjects[i].objectTypeId
        let objectWidth = 0
        let nextIndex = parseInt(i) + 1
        let previousIndex = parseInt(i) - 1

        if (objectType === 4 || objectType === 3) {
            objectWidth = drawGridInsideObject(canvas, canvasHTML, globalSettings, tabObjects[previousIndex], tabObjects[i], tabObjects[nextIndex], point)
        } else if (objectType === 1 || objectType === 2) {
            objectWidth = parseInt(tabObjects[i].width)
        }
        point += objectWidth
    }
}

function drawGridInsideObject(canvas, canvasHTML, globalSettings, previousObject, object, nextObject, point) {
    let objectWidth = parseInt(object.width) * parseInt(object.brick.width)

    let levelDistanceHeight = parseInt(object.brick.height) * parseInt(object.level)
    let bottom = canvasHTML.height - parseInt(globalSettings.margin) - levelDistanceHeight
    for (let i = 0; i < parseInt(object.height); i++) {
        let brickHeight = parseInt(object.brick.height)
        let brickWidth = parseInt(object.brick.width)
        bottom -= brickHeight
        let rowStart = point
        let rowStop = point + objectWidth
        canvas.beginPath()
        canvas.moveTo(rowStart, bottom)
        canvas.lineTo(rowStop, bottom)
        canvas.stroke()

        let left = point
        for (let j = 0; j <= (parseInt(object.width)); j++) {
            if (globalSettings.configurationId === 1) { // ogrodzenia splitowane
                if (j === 0 && (previousObject === undefined || (previousObject && previousObject.height <= i))) {
                    // jeśli jest to pierwszy obiekt w ogrodzeniu, uzupełniam puste kreski od skrajnej krawędzi początka
                    drawObjectVerticalLine(canvas, left, bottom + brickHeight, bottom)
                }
                if (j === parseInt(object.width)) {
                    if ((nextObject === undefined || (nextObject && nextObject.height <= i))) {
                        drawObjectVerticalLine(canvas, left, bottom + brickHeight, bottom)
                    }
                } else {
                    if (isEven(i)) { // parzyste
                        drawObjectVerticalLine(canvas, left + object.brick.widthLeft, bottom + brickHeight, bottom)
                    }  else if (isOdd(i)) {
                        drawObjectVerticalLine(canvas, left + object.brick.widthRight, bottom + brickHeight, bottom)
                    }
                }
            } else if (globalSettings.configurationId === 2) { // ogrodzenia gładkie
                drawObjectVerticalLine(canvas, left, bottom + brickHeight, bottom)
            }
            left += brickWidth
        }
    }

    return objectWidth;
}

function drawObjectVerticalLine (canvas, X, Y1, Y2) {
    canvas.beginPath()
    canvas.moveTo(X, Y1)
    canvas.lineTo(X, Y2)
    canvas.stroke()
}

function isEven(n) {
    return n % 2 == 0;
}

function isOdd(n) {
    return Math.abs(n % 2) == 1;
}