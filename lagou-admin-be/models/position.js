const db = require('../utils/db')

class PositionModel {
  constructor() {
    let PositionSchema = {
      companyLogo: String,
      companyName: String,
      positionName: String,
      city: String,
      salary: String,
      createTime: String
    }
    this.positionModel = db.model('positions', PositionSchema)
  }

  // 职位信息保存
  save(data) {
    let position = new this.positionModel({
      ...data,
      createTime: '2019年6月21日'
    })

    return position.save()
  }

  // 查询所有数据
  findAll() {
    return this.positionModel.find({}).sort({_id: -1})
  }
// 查询单条数据
findOne(id) {
  return this.positionModel.findById(id)
}
//条件查询多条数据
findMany(keywords) {
  let regExp = new RegExp(keywords, 'i')
  //不区分大小写
  return this.PositionModel.find({}).or([{companyName:regExp},{positionName:regExp},{city:regExp},{salary:regExp}])
}

  //删除数据
  delete(id){
    return this.positionModel.findByIdAndRemove(id)
  }

  //修改数据  传入id 以及要修改的数据
  update(id, update) {
    return this.positionModel.findByIdAndUpdate(id,update)
  }
}

const positionModel = new PositionModel()

module.exports = positionModel