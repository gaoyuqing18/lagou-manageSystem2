var express = require('express')
var router = express.Router()

const positionController = require('../constrollers/position')
const oAuthBase = require('../middlewares/oAuth-base')
const fileUpload = require('../middlewares/upload-file')

router.route('/')
  .all(oAuthBase)  //登录认证
  .get(positionController.findAll)  //查询数据库所有数据
  .post(fileUpload.uploadFile, positionController.save)
  //先将图片存入服务器静态资源   再将用户添加的信息和图片在静态资源上的文件名称存入 数据库
  .delete(positionController.delete)

  router.get('/find',positionController.findMany )
  router.get('/one', positionController.findOne)
  router.post('/update',fileUpload.uploadFile,positionController.update)

  
module.exports = router