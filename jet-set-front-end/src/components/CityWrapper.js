import { CityCard } from "./CityCard";

export function CityWrapper(props) {
    const {cityList} = props
    return (
        <div class='main-flexbox'>
            {/* {cityList.map((cityArgs) =>
                (<CityCard props={cityArgs}></CityCard>)
            )} */}
            {cityList.map(({ name, temperature, wind}) =>
                (<CityCard name={name} temperature={temperature} wind={wind}></CityCard>)
            )}
        </div>
    )
}
