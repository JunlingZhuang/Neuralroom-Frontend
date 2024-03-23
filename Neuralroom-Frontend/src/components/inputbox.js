import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "../styles/inputbox.css";
function InputBox({ boxSize }) {
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
        <boxGeometry args={[boxSize.x, boxSize.y, boxSize.z]} />
        <meshStandardMaterial color="royalblue" /> 
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}

export default InputBox;
