import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import React from "react";
import "../styles/outputbox.css";

function OutputBox({ boxSize }) {
  const fbx = useLoader(FBXLoader, process.env.PUBLIC_URL + "/models/test.fbx");

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
      <primitive object={fbx} scale={0.01} /> {/* 调整模型的缩放以适应场景 */}
      <OrbitControls />
    </Canvas>
  );
}

export default OutputBox;
