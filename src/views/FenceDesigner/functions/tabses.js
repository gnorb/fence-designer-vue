export function getAllObjectsWidth (tabs) {
    let allObjectsWidth = 0
    for (let i in tabs) {
        for (let j in tabs[i].objects) {
            if (tabs[i].objects[j].objectTypeId === 1 || tabs[i].objects[j].objectTypeId === 2) {
                allObjectsWidth += parseInt(tabs[i].objects[j].width)
            } else if (tabs[i].objectTypeId === 3 || tabs[i].objectTypeId === 4) {
                allObjectsWidth += ((parseInt(tabs[i].objects[j].brick.width) * parseInt(tabs[i].objects[j].width)))
            }
        }
    }
    return allObjectsWidth
}

export function getSectionMaxWidth (tabs, sectionWidth) {
    let brickWidth = tabs[0].objects[0].brick.width
    let sectionMaxWidth = parseInt(sectionWidth) + brickWidth
    // if (tabs[tabs.length - 1].objectType === 4 && tabs[tabs.length - 1].width !== 1) {
    //     sectionMaxWidth += brickWidth
    // }
    return sectionMaxWidth
}