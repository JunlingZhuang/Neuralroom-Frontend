import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import "../styles/outputbox.css";

function OutputBox({ modelUrl }) {
  const [fbx, setFbx] = useState(null);

  useEffect(() => {
    if (modelUrl) {
      const loader = new FBXLoader();
      loader.load(modelUrl, (object) => {
        setFbx(object);
      });
    }
  }, [modelUrl]); // 依赖于 modelUrl，当 modelUrl 改变时重新运行

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
      {fbx && <primitive object={fbx} scale={0.01} />}{" "}
      {/* 仅当 fbx 存在时，才渲染模型 */}
      <OrbitControls />
    </Canvas>
  );
}

export default OutputBox;
