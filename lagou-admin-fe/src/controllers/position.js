import positionTpl from '../views/position-list.hbs'
import positionAddTpl from '../views/position-add.hbs'
import positionUpdateTpl from '../views/position-update.hbs'
import oAuth from '../utils/oAuth'
import randomstring from 'randomstring'
import _ from 'lodash'
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
  res.render(positionAddTpl({}))  //只是渲染添加模板  不需要请求数据
  bindPositionAddEvent(res) //定义后退 提交按钮逻辑
}

export const update = (req,res, next) => {
  $.ajax({
    url: 'api/position/one',
    data: {
      id: req.params.id  //地址栏params有id
    },
    headers: {
      'X-Access-Token': localStorage.getItem('token')
    },
    success(result) {
      if(result.ret){
       res.render(positionUpdateTpl({
              ...result.data  //请求position接口 回填数据
       }))
      }else {
        alert(result.data)

      }
    }

  })
  bindPositionUpdateEvent(req, res)
}

function bindPositionListEvent(res) {
  //添加
  $('#router-view').off('click', '#addbtn').on('click', '#addbtn', (e) => {  //事件代理到插座上
    res.go('/position_add')
  })

//删除
$('#router-view').off('click', '.btn-delete').on('click', '.btn-delete', function(e) {  
  $.ajax({
    url: '/api/position',
    type: 'DELETE',
    data: {
      id: $(this).closest('tr').attr('data-id')
    },
    headers: {
      'X-Access-Token': localStorage.getItem('token')
    },
    success: (result)=> {
      if(result.ret) {
       res.go('/position/'+randomstring.generate(7))
        
      }else{
        alert(result.data)
      }
    },
    error:  (XMLHttpRequest, textStatus, errorThrown)=> {
      // 状态码
      console.log(XMLHttpRequest.status);
      // 状态
      console.log(XMLHttpRequest.readyState);
      // 错误信息   
      console.log(textStatus);
  }
  })
})

//修改
$('#router-view').off('click', '.btn-update').on('click', '.btn-update', function(e) {
  
  res.go('/position_update/' + $(this).closest('tr').attr('data-id'))
})
}

function bindPositionAddEvent(res) {
  $('#posback').off('click').on('click', (e) => {
    res.back()
    //路由其实是hash  可以记录浏览路径有back方法
  })

  $('#possubmit').off('click').on('click', (e) => {
    $('#possave').ajaxSubmit({
      //因为提交二进制流图片 不能使用ajax   此处使用ajaxSubmit方法
      resetForm: true,
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        if (result.ret) {
          res.back()
        } else {
          alert(result.data)
        }
      }
    })
  })
}

function bindPositionUpdateEvent(req, res) {
  $('#router-view').off('click', '#posback').on('click', '#posback', (e) => {
    res.back()
  })

  $('#router-view').off('click', '#possubmit').on('click', '#possubmit', (e) => {
    $('#posupdate').ajaxSubmit({
      resetForm: true,
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        if (result.ret) {
          res.back()
        } else {
          alert(result.data)
        }
      }
    })
    
  })
}