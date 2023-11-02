function xyToTileChar(x, y) {
    return [
        Math.floor(x / tileC),
        Math.floor(y / tileR),
        x - Math.floor(x / tileC) * tileC,
        y - Math.floor(y / tileR) * tileR
    ]
}

function tileCharToXY(tx, ty, cx, cy) {
    return [
        tx * tileC + cx,
        ty * tileR + cy
    ];
}

function placeUrlLinkAt(tileX, tileY, charX, charY, url) {
    network.link({tileX, tileY, charX, charY}, "url", {url: url});
}

function placeUrlLinkAtXY(x, y, url) {
    placeUrlLinkAt(...xyToTileChar(x, y), url);
}

function placeUrlLink(url) {
    placeUrlLinkAt(...cursorCoords, url);
}

function placeCoordLinkAt(tileX, tileY, charX, charY, toX, toY) {
    network.link({tileX, tileY, charX, charY}, "coord", {x: toX, y: toY});
}

function placeCoordLinkAtXY(fromX, fromY, toX, toY) {
    placeCoordLinkAt(...xyToTileChar(fromX, fromY), toX, toY);
}

function placeCoordLink(toX, toY) {
    placeCoordLinkAt(...cursorCoords, toX, toY);
}

function writeString(str) {
    for (let char of str)
        writeChar(chat);
}

return {
    xyToTileChar,
    tileCharToXY,
    placeUrlLinkAt,
    placeUrlLinkAtXY,
    placeUrlLink,
    placeCoordLinkAt,
    placeCoordLinkAtXY,
    placeCoordLink,
    writeString
}