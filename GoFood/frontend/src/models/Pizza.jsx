import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Pizza(props) {
  const { nodes, materials } = useGLTF("/pizza.gltf");
  return (
    <group {...props} dispose={null} rotation={[-Math.PI / 6, 0, 0]}>
      <group position={[0.007, 0.07, -0.002]} rotation={[-0.201, 0, 0]}>
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Object_12.geometry}
          material={materials.Material}
        />
      </group>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.Material}
        position={[-0.099, 0.032, -0.235]}
        rotation={[-0.433, -0.128, 0.27]}
        scale={[0.038, 0.067, 0.038]}
      />
      <mesh
        geometry={nodes.Object_6.geometry}
        material={materials.Material}
        position={[-0.079, -0.033, -0.371]}
        rotation={[-0.501, 0, 0.454]}
        scale={[0.038, 0.067, 0.038]}
      />
      <mesh
        geometry={nodes.Object_14.geometry}
        material={materials.Material}
        position={[0.015, 0.079, -0.088]}
        rotation={[-2.964, 1.355, 2.993]}
        scale={0.075}
      />
      <mesh
        geometry={nodes.Object_16.geometry}
        material={materials.Material}
        position={[-0.042, 0.023, -0.272]}
        rotation={[-0.712, 0.56, 0.295]}
        scale={0.075}
      />
      <mesh
        geometry={nodes.Object_18.geometry}
        material={materials.Material}
        position={[-0.112, 0.088, 0.012]}
        rotation={[-3.083, -0.147, 3.129]}
        scale={0.075}
      />
      <mesh
        geometry={nodes.Object_20.geometry}
        material={materials.Material}
        position={[0.107, 0.088, 0.062]}
        rotation={[-0.062, 0.342, 0]}
        scale={0.075}
      />
      <mesh
        geometry={nodes.Object_22.geometry}
        material={materials.Material}
        position={[0.059, 0.01, -0.294]}
        rotation={[-0.433, 0, 0]}
        scale={[0.038, 0.067, 0.038]}
      />
      <mesh
        geometry={nodes.Object_24.geometry}
        material={materials.Material}
        position={[-0.132, 0.068, -0.082]}
        rotation={[-0.074, 0, 0]}
        scale={[0.038, 0.067, 0.038]}
      />
      <mesh
        geometry={nodes.Object_26.geometry}
        material={materials.Material}
        position={[0.004, 0.078, 0.143]}
        rotation={[-0.041, 0, 0]}
        scale={[0.038, 0.067, 0.038]}
      />
      <mesh
        geometry={nodes.Object_28.geometry}
        material={materials.Material}
        position={[0.118, 0.069, -0.086]}
        rotation={[-0.041, 0, 0]}
        scale={[0.038, 0.067, 0.038]}
      />
      <mesh
        geometry={nodes.Object_30.geometry}
        material={materials.Material}
        position={[-0.024, 0.084, 0.011]}
        rotation={[Math.PI, -1.52, Math.PI]}
        scale={0.074}
      />
      <mesh
        geometry={nodes.Object_32.geometry}
        material={materials.Material}
        position={[0.188, 0.084, 0.159]}
        rotation={[Math.PI, -1.52, Math.PI]}
        scale={0.074}
      />
      <mesh
        geometry={nodes.Object_34.geometry}
        material={materials.Material}
        position={[-0.212, 0.086, 0.137]}
        rotation={[3.095, 0.687, -3.079]}
        scale={0.074}
      />
      <mesh
        geometry={nodes.Object_36.geometry}
        material={materials.Material}
        position={[-0.004, 0.049, -0.204]}
        rotation={[2.863, 0.773, -3.074]}
        scale={0.074}
      />
      <mesh
        geometry={nodes.Object_38.geometry}
        material={materials.Material}
        position={[-0.001, -0.042, -0.394]}
        rotation={[-0.577, 0, 0]}
        scale={0.074}
      />
      <mesh
        geometry={nodes.Object_40.geometry}
        material={materials.Material}
        position={[0, -0.015, 0]}
      />
    </group>
  );
}

useGLTF.preload("/pizza.gltf");
