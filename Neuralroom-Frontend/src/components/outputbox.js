import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import "../styles/outputbox.css";
import * as THREE from "three";

function OutputBox({ modelData }) {
  const [model, setModel] = useState(null);

  useEffect(() => {
    if (modelData) {
      const loader = new OBJLoader();
      // Parse the model data and set the model state
      const object = loader.parse(modelData);
      object.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            metalness: 0.1, 
            roughness: 0.5, 
            side: THREE.DoubleSide, 
            color: "#cc7b32",
          });
        }
      });
      setModel(object);
    }
  }, [modelData]);

  return (
    <Canvas className="output-Box-Canvas" camera={{ fov: 80 }} shadows>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        castShadow
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[10, 10, 10]} />
      <fog attach="fog" args={["#cc7b32", 16, 20]} />
      {model && <primitive object={model} scale={0.5} />} <OrbitControls />
    </Canvas>
  );
}

export default OutputBox;
