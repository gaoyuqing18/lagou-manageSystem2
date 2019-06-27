const multer = require('multer') // multer可以处理接受 multipart/form-data 二进制流型数据
const path = require('path')
const randomString = require('node-random-string')  //生成图片名称随机串

class FileUpload {
  _fileFilter(req, file, cb) {
    let mimeRegexp = new RegExp('(image\/png|image\/jpg|image\/jpeg|image\/gif)', 'gi')
    if (mimeRegexp.test(file.mimetype)) {  //验证传入图片类型
      cb(null, true)
    } else {
      cb(null, false)
      cb(new Error('文件格式不正确'))
    }
  }

  uploadFile(req, res, next) {
    let filename = ''

    // storeage 定义文件存储信息
    let storage = multer.diskStorage({  
      //multer使用磁盘存储到内存中 multer.diskStorage  里面写目标文件位置及文件名

      // 目标文件夹位置
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/upload'))
      },

      // 目标文件名
      filename: (req, file, cb) => {
        let fileOriName = file.originalname  //用户计算机上的文件的名称
        let lastDot = fileOriName.lastIndexOf('.')
        let extFilename = fileOriName.slice(lastDot) //截取图片扩展名

        let rs = randomString({
          length: 10,
          lowerCase: true
        });

        filename = rs + extFilename  //生成十位随机串 拼接原扩展名 得到图片文件名 放入目标文件夹
        cb(null, filename)
      }
    })

    var upload = multer({
      storage,//storage：storage
      limits: {
        fileSize: 1024 * 1024
      },
      fileFilter: fileUpload._fileFilter //过滤图片文件格式
    }).single('companyLogo')  
    //single('companyLogo') 接受一个以 companyLogo 命名的文件。这个文件的信息保存在 req.file。

    
    upload(req, res, (err) => {
      if (err) {
        res.render('fail', {
          data: JSON.stringify(err.message)
        })
      } else {
        // 传递filename 到下个中间件
        req.filename = filename
        next()
      }
    })
  }
}

const fileUpload = new FileUpload()

module.exports = fileUpload