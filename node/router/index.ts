import api from './api'
import multer from 'multer'
import express from 'express'

const router = express.Router()
const upload = multer({ dest: "uploads/" }).single('file')
api.filter(i => !i.fileUpload).forEach(({ method, path, controller }) => { router[method](path, controller) })
api.filter(i => i.fileUpload).forEach(({ method, path, controller }) => { router[method](path, upload, controller) })

export default router




// server.use(upload.single('myfile'));  // 上传单个文件
// server.use(upload.array('myfile'));  // 上传多个文件

