const positionModel = require('../models/position')

class PositionController {
  constructor(){}

  async findAll(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let result = await positionModel.findAll()
    res.render('succ', {data: JSON.stringify(result)})
  }

  async findOne(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let result = await positionModel.findOne(req.query.id)
    //positionModel.findOne(req.query.id)数据库中的函数
    res.render('succ', {data: JSON.stringify(result)})
  }

  async findMany(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')

    
    let result = await positionModel.findMany(keywords)
    if (result) {
      res.render('succ', {
        data: JSON.stringify(result)
      })
    }
  }



  //添加
  async save(req, res, next) {
    // 从对象众多属性中删除 companyLogo 属性  用delete
    delete req.body.companyLogo
    console.log(req.body)
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

  //根据id删除某一项数据
async delete(req, res, next) {
  let result = await positionModel.delete(req.body.id)
  console.log(req.body.id)
  if(result){
    res.render('succ', {
      data: JSON.stringify({
        message: '数据删除成功.'
      })
    })
  }else{
    res.render('fail', {
      data: JSON.stringify({
        message: '数据删除失败.'
      })
    })
  }
}

async update(req, res, next){
  res.set('Content-Type', 'application/json; charset=utf-8')
    delete req.body.companyLogo
req.body = req.filename ? {...req.body, companyLogo: req.filename}:req.body;
  let result = await positionModel.update(req.body.id,req.body)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '数据修改成功.'
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '数据修改失败.'
      })
    })
  }

}


}

const positionController = new PositionController()

module.exports = positionController