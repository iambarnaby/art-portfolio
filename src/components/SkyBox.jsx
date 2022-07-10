import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useEffect } from 'react';
import bk from '../assets/skybox-assets/FS003_Day_Cubemap_back.png';
import dn from '../assets/skybox-assets/FS003_Day_Cubemap_down.png';
import ft from '../assets/skybox-assets/FS003_Day_Cubemap_front.png';
import lf from '../assets/skybox-assets/FS003_Day_Cubemap_left.png';
import rt from '../assets/skybox-assets/FS003_Day_Cubemap_right.png';
import up from '../assets/skybox-assets/FS003_Day_Cubemap_up.png';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const SkyBox = () => {
  useEffect(()=>{
    const scene = new THREE.Scene();
    /* SKYBOX TEST
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000);
    const canvas = document.getElementById('myThreeJsCanvas')
    camera.position.set(-900, -200, -900);
    

    //renderer
    const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //interaction
    let controls = new OrbitControls(camera, renderer.domElement);
   
    //store skybox materials in array
    let materialArray = [];
    let texture_bk = new THREE.TextureLoader().load( '../public/skybox-assets/cocoa_bk.jpg'  )
    let texture_dn = new THREE.TextureLoader().load( '../public/skybox-assets/cocoa_dn.jpg'  )
    let texture_ft = new THREE.TextureLoader().load( '../public/skybox-assets/cocoa_ft.jpg'  )
    let texture_lf = new THREE.TextureLoader().load( '../public/skybox-assets/cocoa_lf.jpg'  )
    let texture_rt = new THREE.TextureLoader().load( '../public/skybox-assets/cocoa_rt.jpg'  )
    let texture_up = new THREE.TextureLoader().load( '../public/skybox-assets/cocoa_up.jpg'  )

    materialArray.push( new THREE.MeshBasicMaterial({map: texture_bk}))
    materialArray.push( new THREE.MeshBasicMaterial({map: texture_dn}))
    materialArray.push( new THREE.MeshBasicMaterial({map: texture_ft}))
    materialArray.push( new THREE.MeshBasicMaterial({map: texture_lf}))
    materialArray.push( new THREE.MeshBasicMaterial({map: texture_rt}))
    materialArray.push( new THREE.MeshBasicMaterial({map: texture_up}))

    //skybox BoxGeometry

    for (let i = 0; i < 6; i++) {
      materialArray[i].side = THREE.BackSide
    }

    const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000)
    const skybox = new THREE.Mesh(skyboxGeo, materialArray)
    scene.add(skybox)

    const animate = () =>{
      renderer.render(scene, camera)
      window.requestAnimationFrame(animate);
      controls.update();
    }
    animate();
*/

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      45,
      30000
    );
    camera.position.set(-900, -200, -900);
    const canvas = document.getElementById('skybox');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    const updateCanvas = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
    }
    updateCanvas();

    //changing skybox backside mesh to custom images
    let materialArray = [];
    let texture_bk = new THREE.TextureLoader().load( bk )
    let texture_dn = new THREE.TextureLoader().load( dn )
    let texture_ft = new THREE.TextureLoader().load( ft )
    let texture_lf = new THREE.TextureLoader().load( lf )
    let texture_rt = new THREE.TextureLoader().load( rt )
    let texture_up = new THREE.TextureLoader().load( up )

    materialArray.push( new THREE.MeshBasicMaterial({map: texture_ft}))
    materialArray.push( new THREE.MeshBasicMaterial({map: texture_bk}))
    materialArray.push( new THREE.MeshBasicMaterial({map: texture_up}))
    materialArray.push( new THREE.MeshBasicMaterial({map: texture_dn}))
    materialArray.push( new THREE.MeshBasicMaterial({map: texture_rt}))
    materialArray.push( new THREE.MeshBasicMaterial({map: texture_lf}))
    
    console.log(materialArray)

    for (let i = 0; i < 6; i++) {
      materialArray[i].side = THREE.BackSide
    }



    //skybox BoxGeometry
    const boxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    //const boxMaterial = new THREE.MeshBasicMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, materialArray);
    scene.add(boxMesh);
    
    // add interaction to 3D object
    const controls = new OrbitControls(camera, renderer.domElement)

    //add custom model
    const loader = new GLTFLoader();
    loader.load( '/gltf-test/scene.gltf', ( gltf ) => {
      const shed = gltf.scene.children[0];
      shed.scale.set(20, 20, 20);
      scene.add( gltf.scene );
      renderer.render(scene, camera)
    })

    //add lighting

    const ambientLight = new THREE.AmbientLight(0xFFA14A, 2);
    ambientLight.castShadow = true;
    scene.add(ambientLight)
    
    //spotlight

    const spotLight = new THREE.SpotLight( 0xffffff, 3 );
    spotLight.position.set( 100, 1000, 100 );

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

scene.add( spotLight );

    //animate
    const animate = () => {
      controls.update();
      //boxMesh.rotation.x += 0.01;
      //boxMesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, [window.innerHeight, window.innerWidth])
  return(
   <canvas id="skybox" />
  )
}

export default SkyBox;
