import { CityCard } from "./CityCard";

export function CityWrapper(props) {
  const { cityList, className } = props;
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
