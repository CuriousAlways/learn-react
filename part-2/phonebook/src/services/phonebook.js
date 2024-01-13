import axios from 'axios';

const BaseUrl = 'http://localhost:3001/persons'

const createPerson = (newPerson) => {
  return axios
          .post(BaseUrl, newPerson)
          .then((response) => {
            console.log(`new phonebook created successfully`);
            console.log(response.data);
            return response.data;
          });
}

export default {
  createPerson: createPerson

}
