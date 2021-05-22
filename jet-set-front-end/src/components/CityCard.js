

export function CityCard(props) {
    const { name, temperature } = props;
    return (
        <span>{name}, {temperature}</span>
    )
}

// export default CityCard;
