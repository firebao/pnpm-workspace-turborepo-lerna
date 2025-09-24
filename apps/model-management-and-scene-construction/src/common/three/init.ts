/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-26 17:46:02
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-08-13 09:34:33
 * @Description : ThreeJs初始化
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import * as THREE from 'three'
import { debounce } from 'lodash'
import { ForcePerspectiveCamera } from 'src/common/three/ForcePerspectiveCamera'
import { loadTexs } from 'src/common/three/loadTexs'
import { CameraController } from 'src/common/three/CameraController'
import { GUI } from 'src/common/three/GUI'
import { Beam } from 'src/common/three/Beam'
import { Node } from 'src/common/three/Node'
import { FloatPoints } from 'src/common/three/FloatPoints'
import { Bg } from 'src/common/three/Bg'
import { BgLine } from 'src/common/three/BgLine'
import Tex1 from './img/tex_gui01.png'
import Tex2 from './img/tex_gui02.png'
import Tex3 from './img/tex_gui03.png'

export default function(canvas: HTMLCanvasElement) {
  /**
   ****************
   * 定义变量
   ****************
   */
  const gl = canvas.getContext('webgl2')
  if (!gl) {
    console.error('浏览器不支持 WebGL 2.0')
  }
  const resolution = new THREE.Vector2()
  const mousemove = new THREE.Vector2()

  // 渲染器配置 （使用WebGL2 上下文）
  const renderer = new THREE.WebGLRenderer({
    alpha: true,                                          // 支持透明背景
    antialias: true,                                      // 开启抗锯齿
    canvas: canvas,                                       // 绑定到页面 canvas 元素
    context: gl as WebGL2RenderingContext                 // 显式传入 WebGL2 上下文
  })

  // 渲染器尺寸配置
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // 背景颜色为透明
  renderer.setClearColor(0x000000, 0)


  // 场景和相机
  const scene = new THREE.Scene()                         // 3D场景容器
  const camera = new ForcePerspectiveCamera()             // 自定义透视相机
  const cameraController = new CameraController(camera)   // 相机控制器
  const clock = new THREE.Clock()                         // 动画时钟
  camera.far = 50000
  camera.setFocalLength(24)

  /**
   *********************
   * 定义场景中展示的要素
   *********************
   */
  const texs = { gui1: Tex1, gui2: Tex2, gui3: Tex3 }     // gui元素纹理
  const gui = new GUI()                                   // gui元素
  const beam = new Beam()
  const node = new Node()
  const floatPoints = new FloatPoints()
  const bg = new Bg()
  const bgLine1 = new BgLine()
  const bgLine2 = new BgLine()


  /**
   *********************
   * 定义渲染函数
   *********************
   */
  const render = () => {
    // 获取时间增量(上一帧到当前帧d的时间差，单位：秒)
    const time = clock.getDelta()
    // 更新GUI元素动画状态
    gui.render(time)
    beam.render(time)
    node.render(time)
    floatPoints.render(time)
    bg.render(time)
    bgLine1.render(time, 0.1, 0.1, 0.3)
    bgLine2.render(time, -0.2, 0.02, -0.8)

    // 根据鼠标位置和时间更新相机视角
    cameraController.render(time, mousemove)
    // 将场景通过相机渲染到canvas
    renderer.render(scene, camera)
  }

  // 动画循环
  const renderLoop = () => {
    render()
    requestAnimationFrame(renderLoop)
  }

  // 窗口大小变化时调整相机
  const resizeCamera = () => {
    camera.aspect = resolution.x / resolution.y
    camera.updateProjectionMatrix()
  }

  // 窗口大小变化时调整相机和渲染器
  const resizeWindow = () => {
    resolution.set(document.body.clientWidth, window.innerHeight)
    canvas.width = resolution.x
    canvas.height = resolution.y
    resizeCamera()
    renderer.setSize(resolution.x, resolution.y)
  }

  // 事件监听（窗口大小变化、鼠标移动）
  const on = () => {
    window.addEventListener('resize', debounce(resizeWindow, 1000))
    window.addEventListener('mousemove', (event) => {
      // 将鼠标坐标归一化到[-1, 1]范围(用于相机控制)
      mousemove.set(
        event.clientX / resolution.x * 2.0 - 1.0,
        -(event.clientY / resolution.y * 2.0 - 1.0)
      )
    })
    window.addEventListener('mouseout', () => {
      // 鼠标移出窗口时重置鼠标位置
      mousemove.set(0, 0)
    })
  }

  /**
   *********************
   * 场景初始化
   *********************
   */
  const init = () => {
    // 加载纹理资源(异步)
    loadTexs(texs, (loadedTexs) => {
      // 用加载的纹理创建gui元素
      gui.createObj( [loadedTexs.gui1, loadedTexs.gui2, loadedTexs.gui3])
      beam.createObj()
      node.createObj()
      floatPoints.createObj()
      bg.createObj()
      bgLine1.createObj(1200, 284.1, 398.6, 601.2, 828.4)
      bgLine2.createObj(2400, 222.6, 412.4, 683.9, 961.2)

      if (gui.obj) scene.add(gui.obj)
      if (beam.obj) scene.add(beam.obj)
      if (node.obj) scene.add(node.obj)
      if (node.objWire) scene.add(node.objWire)
      if (node.objPoints) scene.add(node.objPoints)
      if (floatPoints.obj) scene.add(floatPoints.obj)
      if (bg.obj) scene.add(bg.obj)
      if (bg.obj) bg.obj.position.set(0, 0, -2000)
      if (bgLine1.obj) scene.add(bgLine1.obj)
      if (bgLine2.obj) scene.add(bgLine2.obj)


      // 添加网格辅助以及坐标轴辅助
      // const gridHelper = new THREE.GridHelper(100, 100)
      // scene.add(gridHelper)

      // const axesHelper = new THREE.AxesHelper(500)
      // scene.add(axesHelper)


      // 设置背景色位黑色（不透明）
      renderer.setClearColor(0x000000, 1.0)
      // 初始化相机位置和目标点
      cameraController.init([0, 0, 1000], [0, 0, 0])

      // 启动时钟
      clock.start()
      // 绑定事件监听
      on()
      // 初始化窗口尺寸
      resizeWindow()
      // 启动动画循环
      renderLoop()
    })
  }

  // 启动初始化
  init()
}
