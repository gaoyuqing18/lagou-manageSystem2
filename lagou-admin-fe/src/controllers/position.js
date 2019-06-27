import positionTpl from '../views/position-list.hbs'
import positionAddTpl from '../views/position-add.hbs'
import oAuth from '../utils/oAuth'

export const render = async (req, res, next) => {
  let result = await oAuth()
  if (result.data.isSignin) {
    $.ajax({
      url: '/api/position',
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        res.render(positionTpl({
          data: result.data,
          hasResult: result.data.length > 0
        }))
      }
    })
    bindPositionListEvent(res)
  } else {
    res.go('/')
  }
}

export const add = (req, res, next) => {
  res.render(positionAddTpl({}))  //渲染添加模板
  bindPositionAddEvent(res) //定义后退 提交按钮逻辑
}

function bindPositionListEvent(res) {
  $('#router-view').on('click', '#addbtn', (e) => {  //事件代理到插座上
    res.go('/position_add')
  })
}

function bindPositionAddEvent(res) {
  $('#posback').on('click', (e) => {  //后退按钮
    res.back()  //路由其实是hash  可以记录浏览路径有back方法
  })

  $('#possubmit').on('click', (e) => {
    $('#possave').ajaxSubmit({   //因为提交二进制流图片 不能使用ajax   此处使用ajaxSubmit方法
      resetForm: true,
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        res.back()
      }
    })
  })
}