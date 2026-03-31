import * as THREE from 'three';

const canvas = document.getElementById("webgl")!!;

// 创建场景
const scene = new THREE.Scene();

// 添加物体
// 几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
//材质
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


const sizes = {
    width: 800,
    height: 600,
}

// 摄像机
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height); // 视野范围，宽高比
camera.position.z = 3
scene.add(camera);

// 渲染器
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

