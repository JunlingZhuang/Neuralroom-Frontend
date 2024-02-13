import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "../styles/inputbox.css";
function InputBox() {
  return (
    <Canvas className="input-Box-Canvas">
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />

      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} /> {/* 设置立方体的尺寸为 1x1x1 */}
        <meshStandardMaterial color="royalblue" /> {/* 设置材质颜色 */}
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}

export default InputBox;
