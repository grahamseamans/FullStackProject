import { CityGraphics } from "./CityGraphics";

export function CityCard(props) {
  const { name, temperature, wind } = props;
  return (
    <span class='city-card'>
      {name}, (<CityGraphics temperature={temperature} wind={wind}></CityGraphics>),{" "}
      {temperature}
    </span>
  );
}

// export default CityCard;
