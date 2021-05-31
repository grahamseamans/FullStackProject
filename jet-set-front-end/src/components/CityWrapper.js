import { CityCard } from "./CityCard";
import { useCityContext } from "./CityContext"


export function CityWrapper(props) {
  const { cityList } = useCityContext();
  const { className } = props;
  return (
    <div className={`main-flexbox ${className}`}>
      {cityList.map((city) => (
        <CityCard
          key={city.name + city.state + city.country}
          city={city}
        ></CityCard>
      ))}
    </div>
  );
}
