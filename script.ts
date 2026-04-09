import * as THREE from "three";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import { string } from "three/tsl";
import gsap from "gsap";

/**
 * Debug
 */
const gui = new GUI({
    width: 300,
    title: "调试界面",
    closeFolders: false
});
// gui.close();
// gui.hide();

window.addEventListener("keydown", (event) => {
    if (event.key == 'h') {
        gui.show(gui._hidden)
    }
})

//光标
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

//画布
const canvas = document.getElementById("webgl")!!;

// 创建场景
const scene = new THREE.Scene();

// 坐标轴
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// 添加物体
// 几何体
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// 材质
const debugObject = {
  color: "#e9b66a",
  spin() {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
  },
  subdivision: 2,
};
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const cubeTweaks = gui.addFolder("立方体");
cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01).name("高度");
cubeTweaks.add(mesh, "visible").name("可见性");
cubeTweaks.add(material, "wireframe").name("线框模式");
cubeTweaks
  .addColor(debugObject, "color")
  .name("颜色")
  .onChange(() => {
    material.color.set(debugObject.color);
  });

cubeTweaks.add(debugObject, "spin").name("旋转");

cubeTweaks
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .name("三角形细分")
  .onFinishChange(() => {
    mesh.geometry.dispose(); //销毁旧的几何体
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision,
    );
  });

// const positionsArray = new Float32Array([
//     0,0,0,
//     0,1,0,
//     1,0,0
// ]);

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', positionsAttribute);
// const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
// const mesh = new THREE.Mesh(geometry, material);

// const count = 500;
// const positionsArray = new Float32Array(count * 3 * 3);
// for (let index = 0; index < positionsArray.length; index++) {
//   positionsArray[index] = Math.random() - 0.5;
// }
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// const geometry = new THREE.BufferGeometry().setAttribute(
//   "position",
//   positionsAttribute,
// );
// const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
// 组
// const group = new THREE.Group();
// scene.add(group);

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "red" }),
// );
// group.add(cube1);
// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "green" }),
// );
// cube2.position.x = -2;
// group.add(cube2);

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "blue" }),
// );
// group.add(cube3);
// cube3.position.x = 2;

//移动
// mesh.position.z = -3
// mesh.position.y = -0.6
// mesh.position.x = 1
// mesh.position.set(1, 1, 1);

// 缩放
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
// group.scale.set(2, 0.5, 0.5);

//旋转
// group.rotation.reorder("YXZ");
// group.rotation.x = Math.PI * 0.25;
// group.rotation.y = Math.PI * 0.25;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  console.log("窗口调整大小");
  //更新渲染窗口大小
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //更新相机
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
});

window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement;
  if (!fullscreenElement) {
    // 进入全屏
    canvas.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
});

// 摄像机
// 透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
); // 视野范围，宽高比
// const aspectRatio = sizes.width / sizes.height;
//正交相机
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100,
// ); // 左右上下
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// 立方体到相机的距离
// console.log(mesh.position.distanceTo(camera.position));

// 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

// Clock
// const clock = new THREE.Timer();

// gsap
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
// 动画
const tick = () => {
  // 1.更新时钟
  //   clock.update();
  // 2.获取从时钟启动到现在所经过的秒数
  //   const elapsedTime = clock.getElapsed();
  //   console.log("elapsedTime", elapsedTime);

  //   const currentTime = Date.now();
  //   const deltaTime = currentTime - time;
  //   time = currentTime;
  //   camera.position.y = Math.sin(elapsedTime);
  //   camera.position.x = Math.cos(elapsedTime);

  // 更新相机
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;

  //阻尼更新控制器
  controls.update();

  camera.lookAt(mesh.position);
  //更新物体
  //   mesh.rotation.y = elapsedTime;
  // 渲染器
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
