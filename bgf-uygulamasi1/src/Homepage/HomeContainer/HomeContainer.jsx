import "./homeContainer.css";
import { Suspense,useEffect, useState } from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Preload, useGLTF} from "@react-three/drei";

const HomeContainer = () => {

  const computer = useGLTF("./CalismaMasasi.glb");
  return (
  
      <mesh  scale={[0.8, 0.8, 0.8]} receiveShadow position={[0, -2.5, 0]}>
        
        <hemisphereLight intensity={1.5}
        groundColor="#e8e8e8" 
        color={"#ffffff"}
         />
        <pointLight intensity={45} />
        <spotLight 
        position={[-20, 50, 10]}
        angle={1.2}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}/>
        
        <primitive 
        object={computer.scene} 
        scale={[10, 10, 10]}
        position={[0, -2, -1.5]}
        rotation={[0, 1.2, 0]}
         />
      </mesh>
      
  );
};

const ComputerCanvas= () =>{
  return(
    <Canvas 
    className="canvas"
    style={{height: "600px", width: "100vw"}}
    shadows
    camera={{position:[34,15,5], fov: 28}}
    gl={{preserveDrawingBuffer: true}}
    

    >
      <Suspense>
      <OrbitControls 
         enableZoom={false}
         maxPolarAngle={Math.PI / 2}
         minPolarAngle={Math.PI / 3}
         />

          <HomeContainer/>    
      </Suspense>

    </Canvas>
  )
}

export default ComputerCanvas;
