import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"; 
import "../styles/outputbox.css";
import * as THREE from "three";

function OutputBox({ modelUrl }) {
  const [model, setModel] = useState(null);

  useEffect(() => {
    if (modelUrl) {
      const extension = modelUrl.split(".").pop().toLowerCase();
      let loader = null;
      if (extension === "obj") {
        loader = new OBJLoader();
      } else if (extension === "fbx") {
        loader = new FBXLoader();
      }

      if (loader) {
        loader.load(modelUrl, (object) => {
          object.traverse((child) => {
            if (child.isMesh) {
              child.material.side = THREE.DoubleSide; 
            }
          });
          setModel(object);
        });
      }
    }
  }, [modelUrl]);

  return (
    <Canvas className="output-Box-Canvas">
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[10, 10, 10]} />
      {model && <primitive object={model} scale={0.01} />}{" "}
      <OrbitControls />
    </Canvas>
  );
}

export default OutputBox;
