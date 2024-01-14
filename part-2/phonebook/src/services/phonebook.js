import axios from 'axios';

const BaseUrl = 'http://localhost:3001/persons'

const getPerson = () => {
  return axios
          .get(BaseUrl)
          .then(response => response.data );
}

const createPerson = (newPerson) => {
  return axios
          .post(BaseUrl, newPerson)
          .then((response) => {
            return response.data;
          });
}

const destroyPerson = (id) => {
  return axios
          .delete(`${BaseUrl}/${id}`)
          .then((response) => response.data );
}

const updatePerson = (id, updatedPerson) => {
  return axios
          .put(`${BaseUrl}/${id}`, updatedPerson)
          .then((response) => {
            return response.data;
          })
}

export default {
  getPerson: getPerson,
  createPerson: createPerson,
  destroyPerson: destroyPerson,
  updatePerson: updatePerson
}
