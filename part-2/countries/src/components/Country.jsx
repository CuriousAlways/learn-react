import Weather from "./Weather";

const Country = ({country}) => {
  return (
    <div>
      <h1> {country.name.official} </h1>
      <div>
        <p> capital { country.capital[0] }</p>
        <p> area { country.area } </p>
      </div>
      <div>
        <h3> languages </h3>
        <ul>
          { Object.values(country.languages).map((language) => <li key={language}>{language}</li>) }
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      <Weather city={country.capital[0]} />
    </div>
  );
}

export default Country;
