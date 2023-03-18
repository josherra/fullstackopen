import numeral from "numeral";

export const Country = ({ country }) => {
  const population = numeral(country.population);
  const area = numeral(country.area);

  return (
    <div className="country">
      <h1>{country.name.official}</h1>
      <img src={country.flags.svg} alt={country.flags.alt} />
      <p>Population: {population.format("0,0")}</p>
      <p>
        Area: {area.format("0,0.00")}km<sup>2</sup>
      </p>
      <h3>Languages:</h3>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>
    </div>
  );
};
