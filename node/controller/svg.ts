const fs = require('fs')
export function svgToBase64Encode(req, res) {
    const { file: { path, originalname } } = req
    const buff = fs.readFileSync(path)
    const base64 = 'data:image/svg+xml;base64,' + buff.toString('base64')
    const name = originalname.replace('.svg', '');
    res.send({ svgName: name, svgEncode: base64 })
}

