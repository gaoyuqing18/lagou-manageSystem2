const positionModel = require('../models/position')

class PositionController {
  constructor(){}

  async findAll(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let result = await positionModel.findAll()
    res.render('succ', {data: JSON.stringify(result)})
  }

  async save(req, res, next) {
    // 从对象众多属性中删除 companyLogo 属性  用delete
    delete req.body.companyLogo
    
    let result = await positionModel.save({  
      //删除图片logo 重新给logo赋值为静态资源中图片名称之后  在将数据放存入数据库
      ...req.body,    //
      companyLogo: req.filename
    })

    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '数据保存成功.'
        })
      })
    }
  }
}

const positionController = new PositionController()

module.exports = positionController