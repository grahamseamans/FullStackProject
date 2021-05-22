import { CityCard } from "./CityCard";

export function CityWrapper(props) {
    const {cityList} = props
    return (
        <div>
            {cityList.map(({ name, temperature }) =>
                (<CityCard name={name} temperature={temperature}></CityCard>)
            )}
        </div>
    )
}
