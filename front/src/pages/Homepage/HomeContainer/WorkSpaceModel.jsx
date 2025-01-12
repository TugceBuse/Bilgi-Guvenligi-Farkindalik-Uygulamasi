import React, { useRef} from "react";
import { Suspense,useEffect, useState } from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, useGLTF, Html, useAnimations} from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
 
const Model = () => {

  const computer = useGLTF("./CalismaMasasi.glb");
  const meshRef = useRef();
  const [isRotating, setIsRotating] = useState(true);

  useFrame(() => {
    if (isRotating && meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Y ekseninde döndür
    }
  });
  const handleClick = () => {
    setIsRotating(!isRotating); // Rotasyonu başlat veya durdur
  };

  
  return (
  
      <a.mesh  ref={meshRef} scale={[1, 1, 1]} receiveShadow position={[0, -2.5, 0]} onClick={handleClick} 

      >
        
        <hemisphereLight intensity={200}
        groundColor={"#111111"}
        color={"#020100"}
         />
        <pointLight 
        position={[1,9.5, -1]}
        intensity={25} />
        <spotLight 
        position={[0, 10, 10]}
        angle={0.3}
        penumbra={0.5}
        intensity={2}
        castShadow
        shadow-mapSize={1024}/>
        
        <primitive 
        object={computer.scene} 
        scale={[10, 10, 10]}
        position={[0, -2, -1.5]}
        rotation={[0, 1.2, 0]}
         />
         
      </a.mesh>
  );
};

const ComputerCanvas= () =>{
  
  return(
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "76vh" }}>
      <Canvas 
      className="canvas"
      style={{height: "600px", width: "100vw"}}
      shadows
      camera={{position:[34,20,15], fov: 28}}
      gl={{preserveDrawingBuffer: true}}
      >
        
        <Suspense fallback={null}>
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.7}
          minPolarAngle={Math.PI / 3.1}
          target={[0, 0, 0]} // Kameranın odaklanacağı noktayı belirle
          
          />
            <Model/> 
            <Html position={[0, -10, 0]} >
        <button className="my-button" >
         Start Animation
        </button>
      </Html>   
        </Suspense>
       
      </Canvas>
      
    </div>
    
  )
}


export default ComputerCanvas;
