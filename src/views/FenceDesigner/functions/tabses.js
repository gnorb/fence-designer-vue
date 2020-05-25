export function getAllObjectsWidth (tabs) {
    let allObjectsWidth = 0
    for (let i in tabs) {
        if (tabs[i].objectTypeId === 1 || tabs[i].objectTypeId === 2) {
            allObjectsWidth += parseInt(tabs[i].width)
        } else if (tabs[i].objectTypeId === 3 || tabs[i].objectTypeId === 4) {
            allObjectsWidth += ((parseInt(tabs[i].brick.width) * parseInt(tabs[i].width)))
        }
    }
    return allObjectsWidth
}

export function getSectionMaxWidth (tabs, sectionWidth) {
    let brickWidth = tabs[0].brick.width
    let sectionMaxWidth = parseInt(sectionWidth) + brickWidth
    // if (tabs[tabs.length - 1].objectType === 4 && tabs[tabs.length - 1].width !== 1) {
    //     sectionMaxWidth += brickWidth
    // }
    return sectionMaxWidth
}