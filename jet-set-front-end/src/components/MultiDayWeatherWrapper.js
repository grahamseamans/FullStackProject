import { ForecastDisp } from "./ForecastDisp";

export function MultiDayWeatherWrapper(props) {
    const { multiWeather } = props;
    const multiWeatherList = multiWeather.days || []

    return (
      <div className={`main-flexbox `}>
        {multiWeatherList.map((day) => (
          <ForecastDisp
            key={day}
            day={day}
          />
        ))}
      </div>
    );
  }