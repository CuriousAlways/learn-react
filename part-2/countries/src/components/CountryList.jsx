import Country from "./Country";

const CountryList = ({countries}) => {
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
        {countries.map((country) => <p key={country.cca3}> {country.name.official}</p>)}
      </div>
    );
  }
  else {
    return ( <div> NO countries found, please try other search terms</div>);
  }
}

export default CountryList;