import countriesService from "./services/countriesService";
import CountryList from "./components/CountryList";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const changeHandler = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredCountriesList = () => {
    return countries.filter((country) => country.name.official.toLowerCase().includes(searchTerm.toLowerCase()));
  }



  useEffect(()=> {
     countriesService.countryList().then((countryData) => {
      setCountries(countryData);
     });
  }, []);

  if(!countries) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <div>
        find countries <input type='text' value={searchTerm} onChange={changeHandler}/>
      </div>
      {searchTerm && <CountryList countries={filteredCountriesList()} setSearchTerm={setSearchTerm} />}
    </div>
  )
}

export default App
