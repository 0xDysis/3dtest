let scene, camera, renderer, geometry, material, mesh;
let noise = new SimplexNoise();
let time = 0;


function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer({antialias: true});
  
    let canvas = document.querySelector('#threeCanvas');
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    canvas.appendChild(renderer.domElement);
  }
  
  

  function createGeometry() {
    geometry = new THREE.PlaneGeometry(20, 20, 100, 100);
    material = new THREE.MeshBasicMaterial({wireframe: true, color: 0xcccccc});
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2; // Rotate the mesh to face the camera
  
    scene.add(mesh);
  }
  

  function updateGeometry() {
    let positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      let x = positions[i];
      let y = positions[i + 1];
      let value = noise.noise2D(x / 10 + time, y / 10 + time);
  
      positions[i + 2] = value;
    }
  
    geometry.attributes.position.needsUpdate = true;
  }
  
  

  function animate() {
    requestAnimationFrame(animate);
  
    time += 0.01; // Adjust this value to control the speed of the animation
    updateGeometry();
  
    renderer.render(scene, camera);
  }
  

init();
createGeometry();
animate();

