import React, { useRef} from "react";
import { Suspense,useEffect, useState } from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, useGLTF, Html} from "@react-three/drei";

const Model = () => {
  const meshRef = useRef();
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      const maxRotation = Math.PI / 15; // 22.5 derece
      const minRotation = -Math.PI / 15; // -22.5 derece

      setTargetRotation({
        x: Math.max(minRotation, Math.min(maxRotation, y * Math.PI)),
        y: Math.max(minRotation, Math.min(maxRotation, x * Math.PI)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += (targetRotation.x - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (targetRotation.y - meshRef.current.rotation.y) * 0.1;
    }
  });



  const computer = useGLTF("./CalismaMasasi.glb");
  return (
  
      <mesh scale={[1, 1, 1]} receiveShadow position={[0, -2.5, 0]}>
        
        <hemisphereLight intensity={150}
        groundColor={"#111111"}
        color={"#020100"}
         />
        <pointLight intensity={8} />
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
         
      </mesh>
      
      
  );
};

const ComputerCanvas= () =>{
  return(
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Canvas 
      className="canvas"
      style={{height: "600px", width: "100vw"}}
      shadows
      camera={{position:[34,20,15], fov: 28}}
      gl={{preserveDrawingBuffer: true}}
      

      >
        <Suspense fallback={null}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.7}
          minPolarAngle={Math.PI / 3.1}
          target={[0, 0, 0]} // Kameranın odaklanacağı noktayı belirle
          />
            <Model/> 
            <Html position={[0, -10, 0]} >
        <button className="my-button" onClick={() => alert("Button Clicked!")}>
          Start Simulation
        </button>
      </Html>   
        </Suspense>
      </Canvas>
      
    </div>
    
  )
}

export default ComputerCanvas;
