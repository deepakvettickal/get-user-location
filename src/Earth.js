//sphere
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { usePosition } from "use-position";
import { Vector3 } from "three";
import { useTexture } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { vertexShader, fragmentShader } from "./earthShaders";

// import earthday from "/earthday.jpg";
import { createMarker, locations } from "./markers.js";

const Earth = ({ position, activeMarker, order, zoom, setZoom }) => {
  const { latitude, longitude, error } = usePosition();

  const mesh = useRef();

  const earthDayTexture = useTexture("/earthday.jpg");
  const earthNightTexture = useTexture("/earthnight.jpg");

  // Rotation and zoom
  const latRot = (activeMarker.lat * Math.PI) / 180;
  const lonRot = -((activeMarker.lng * Math.PI) / 180) - Math.PI / 2;

  const { scale, rotation } = useSpring({
    scale: zoom ? 1.33 : 1,
    rotation: [latRot, lonRot, 0]
    // config: {
    //   duration: 700
    // }
  });

  const radius = 2;

  useFrame(() => {
    mesh.current.rotation.y += 0.00035;
  });

  // const handleClick = (event) => {
  //   if (event.detail === 2) {
  //     setZoom((prev) => !prev);
  //   }
  // };
  return (
    <>
      <animated.group
        dispose={null}
        rotation={rotation}
        scale={scale}
        // onClick={handleClick}
      >
        <mesh
          position={[0, 0, 0]}
          ref={mesh}
          scale={[1.1, 1.1, 1.1]}
          rotation={[0, 0, 0]}
        >
          <sphereBufferGeometry attach="geometry" args={[radius, 64, 64]} />
          <shaderMaterial
            toneMapped={false}
            uniforms={{
              uDayTexture: { value: earthDayTexture },
              uNightTexture: { value: earthNightTexture },
              uSunDirection: { value: new Vector3(1.0, 0, 0) }
            }}
            //shaders
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
          />
          {/* {createMarker(locations["nullIsland"], "white")} */}
          {/* {createMarker(locations["uob"], "white")} */}
          {createMarker(latitude, longitude, "red")}
        </mesh>
      </animated.group>
    </>
  );
};

export default Earth;
// export { scaleAndRot };
