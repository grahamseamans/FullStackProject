import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

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
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef();
  // Set up state for the hovered and active state
//   const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (mesh.current.rotation.x += windToSpin(wind)));
    useFrame((state, delta) => {
        mesh.current.rotation.y += windToSpin(wind)
        mesh.current.rotation.x = mesh.current.rotation.y / 10
      })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
    //   position={position}
      position={randomPosition()}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
    //   onPointerOver={(event) => setHover(true)}
    //   onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      {/* <meshStandardMaterial color={hovered ? "hotpink" : "orange"} /> */}
      <meshStandardMaterial color={colorsFromTemp(temperature)} />
    </mesh>
  );
}

export function CityGraphics(props) {
  const {temperature, wind} = props;
  return (
    <div class="city-graphics">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box position={[-1.2, 0, 0]} temperature={temperature} wind={wind}/>
        <Box position={[1.2, 0, 0]} temperature={temperature} wind={wind} />
      </Canvas>
    </div>
  );
}

function randomPosition() {
    return [randomCoridinate(), randomCoridinate(), randomCoridinate()]
}

function randomCoridinate() {
    return Math.random() * 2
}

function windToSpin(wind) {
    return (wind / 500) +( Math.random()/10)
}

function colorsFromTemp(temp) {
    // https://stats.stackexchange.com/questions/281162/scale-a-number-between-a-range
    const maxTemp = 110;
    const minTemp = -40;
    const maxColor = 240;
    const minColor = 0;
    temp += Math.random() * 30;
    temp = temp > maxTemp ? maxTemp : temp;
    temp = temp < minTemp ? minTemp : temp;
    let color = (maxTemp - minTemp) * ((temp - minTemp) / (maxColor - minColor)) + minColor
    color = ((color - 120) * -1) + 120
    let colorString = "hsl(" + color + ", 100%, 50%)";
    return colorString 
}