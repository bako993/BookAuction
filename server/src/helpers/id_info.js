export function findHighestId(data) {
    let highestId = -1
    data.forEach(item => {
        if (item.id > highestId)
        { highestId = item.id }
    })
    return highestId
}

export function isIdNumeric (id) {
    return typeof id === 'number' && Number.isInteger(id);

}
