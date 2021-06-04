import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { colorsFromTemp } from "./Utils";
/*
Cubes:
Get random number of them

Lighting:
see if you can get 

spinning:
log the wind to get a more normaized value
scale the logged value
add that to the spin

Colors:
So I want a funciton that:
Takes in a temperature
puts it to a color
- lets go rainbow 
    - red is hottest
    - blue is coldest
- get two colors that are similar to the main color
- randomly assign those to the cubes
*/

function Box(props) {
  const { temperature, wind } = props;
  const mesh = useRef();
  const [active, setActive] = useState(false);
  useFrame((state, delta) => {
    mesh.current.rotation.y += windToSpin(wind);
    mesh.current.rotation.x = mesh.current.rotation.y / 10;
  });
  return (
    <mesh
      position={randomPosition()}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
    >
      <boxGeometry args={[1.2, 1.1, 1]} />
      <meshStandardMaterial color={colorsFromTemp(temperature)} />
    </mesh>
  );
}

export function CityGraphics(props) {
  const { city } = props;
  const temp = city.weather.main.feels_like;
  const windSpeed = city.weather.wind.speed;
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box temperature={temp} wind={windSpeed} />
      <Box temperature={temp} wind={windSpeed} />
    </Canvas>
  );
}

function randomPosition() {
  return [randomCoridinate(), randomCoridinate() / 2, randomCoridinate()];
}

function randomCoridinate() {
  return (Math.random() - 0.5) * 2;
}

function windToSpin(wind) {
  return wind / 500 + Math.random() / 10;
}
