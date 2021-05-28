import { CityCard } from "./CityCard";

export function CityWrapper(props) {
    const {cityList} = props
    return (
        <div className='main-flexbox'>
            {cityList.map((city) =>
                (<CityCard key={city.name + city.temperature + city.wind} city={city}></CityCard>)
            )}
        </div>
    )
}
