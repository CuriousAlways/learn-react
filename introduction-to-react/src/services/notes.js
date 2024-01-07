import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes'

// promises then also returns a promise
const getAll = () => {
               return axios
                      .get(baseUrl)
                      .then((response) => response.data);
              }

const update = (id, newObj) => {
                return axios
                        .put(`${baseUrl}/${id}`, newObj)
                        .then((response) => response.data);
              }
const create = (newObj) => {
                return axios
                        .post(baseUrl, newObj)
                        .then((response => response.data));
              }

export default {
  getAll: getAll,
  create: create,
  update: update
}