const fs = require('fs')
function svgToBase64Encode(req, res) {
    debugger
    const { file: { path, originalname } } = req
    const buff = fs.readFileSync(path)
    const base64 = 'data:image/svg+xml;base64,' + buff.toString('base64')
    const name = originalname.replace('.svg', '');
    res.send({ svgName: name, svgEncode: base64 })
}

module.exports = svgToBase64Encode


