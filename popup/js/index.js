layui.use(() => {
  const { layer, form, table, jquery: $ } = layui

    //第一个实例
    // table.render({
    //   elem: '#demo'
    //   ,height: 312
    //   ,url: './user.json'//数据接口
    //   ,page: true //开启分页
    //   ,cols: [[ //表头
    //     {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
    //     ,{field: 'username', title: '用户名', width:80}
    //     ,{field: 'sex', title: '性别', width:80, sort: true}
    //     ,{field: 'city', title: '城市', width:80} 
    //     ,{field: 'sign', title: '签名', width: 177}
    //     ,{field: 'experience', title: '积分', width: 80, sort: true}
    //     ,{field: 'score', title: '评分', width: 80, sort: true}
    //     ,{field: 'classify', title: '职业', width: 80}
    //     ,{field: 'wealth', title: '财富', width: 135, sort: true}
    //   ]]
    // });

  // Layer open & close
  let additionLayer
  $('#addition').click((event) => {
    additionLayer = layer.open({
      type: 1,
      title: '添加任务',
      skin: 'mits-layer',
      area: ['520px', '320px'],
      closeBtn: 0,
      anim: 2,
      shadeClose: false,
      content: $('#addition-form')
    });
  })

  $('#addition-cancel').click(() => {
    layer.close(additionLayer)
  })

  // form
  form.verify({
    taskname(value) {
      if(!value) {
        return '必须填写任务名称'
      }
      if(Object.prototype.hasOwnProperty.call(getTaskList(), value)) {
        return '该任务已存在'
      }
    }
  });

  form.on('submit(addition-submit)', ({ field: data }) => {
    addTask(data)
  })
})

const addTask = (source) => {
  const taskList =  getTaskList()
  const list = JSON.stringify(Object.assign({}, taskList, { [source.taskname]: source }))
  window.localStorage.setItem('task', list)
}

const getTaskList = () => {
  return JSON.parse(window.localStorage.getItem('task') ?? '{}')
}
