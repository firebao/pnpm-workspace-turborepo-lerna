import { Engine, Scene, MeshBuilder, ArcRotateCamera, Vector3, HemisphericLight } from "@babylonjs/core"

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement
const engine = new Engine(canvas, true)


let angle = 0;
let box

const createScene = () => {
    const scene = new Scene(engine)

    // 创建相机
    const camera = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 5, Vector3.Zero(), scene)
    camera.attachControl(canvas, true)

    // 创建光源
    const light = new HemisphericLight("light1", Vector3.Up(), scene)
    light.intensity = 0.7

    // 创建立方体
    box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

    return scene
}
const scene = createScene()

scene.debugLayer.show()
scene.onBeforeRenderObservable.add(() => {
    angle += 0.01;
    box.rotation.y = angle;
});

engine.runRenderLoop(() => {
    scene.render()
})

window.addEventListener("resize", () => {
    engine.resize()
})