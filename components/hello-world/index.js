Component({
  options: {
    addGlobalClass: true, //接受外部样式的影响
    multipleSlots: false //在组件定义时的选项中启用多 slot 支持
  },
  //props
  properties: {
    title: {
      type: String,
      value: 'Hello World'
    }
  },
  data: {},
  // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
  lifetimes: {
    // 在组件实例刚刚被创建时执行
    created() {},
    // 在组件实例进入页面节点树时执行
    attached() {},
    // 在组件在视图层布局完成后执行
    ready() {},
    // 在组件实例被移动到节点树另一个位置时执行
    moved() {},
    // 在组件实例被从页面节点树移除时执行
    detached() {}
  },

  // 组件所在页面的生命周期函数
  pageLifetimes: {
    // 组件所在的页面被展示时执行
    show() {},
    // 组件所在的页面被隐藏时执行
    hide() {},
    // 组件所在的页面尺寸变化时执行
    resize() {}
  },
  // 数据监听器
  observers: {
    title(newVal) {
      console.log(newVal,'newVal')
    }
  },
  methods: {
    /* 点击能量球 */
    onEnergyBall() {
      this.triggerEvent('close', this.properties.item)
    }
  }
})
