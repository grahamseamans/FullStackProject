import { CityCard } from "./CityCard";

export function CityWrapper(props) {
    const {cityList} = props
    return (
        <div className='main-flexbox'>
            {cityList.map((city) =>
                (<CityCard key={city.name.name + city.weather.main.feels_like + city.weather.wind.speed} city={city}></CityCard>)
            )}
        </div>
    )
}
