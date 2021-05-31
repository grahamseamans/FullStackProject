import { CityCard } from "./CityCard";

export function CityWrapper(props) {
    const {cityList} = props
    return (
        <div className='main-flexbox'>
            {cityList.map((city) =>
                (<CityCard key={city.name + city.state + city.country} city={city}></CityCard>)
            )}
        </div>
    )
}
