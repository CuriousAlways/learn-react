import Country from "./Country";

const CountryList = ({countries, setSearchTerm}) => {
  const showCountryHandler = (event) => {
    const countryCcaCode = event.target.id;
    const country = countries.find((country) => country.cca3 === countryCcaCode);

    setSearchTerm(country.name.official)
  }

  if(countries.length === 1){
    return (
      <div>
        {countries.map((country) => <Country country={country} key={country.cca3} />)}
      </div>
    );
  }
  else if(countries.length > 10) {
    return (<p>Too many matches, specify another filter</p>);
  }
  else if(countries.length > 1 && countries.length < 10) {
    return (
      <div>
        {countries.map((country) => <p key={country.cca3}> {country.name.official} <button id={country.cca3} onClick={showCountryHandler}>Show</button></p>)}
      </div>
    );
  }
  else {
    return ( <div> NO countries found, please try other search terms</div>);
  }
}

export default CountryList;