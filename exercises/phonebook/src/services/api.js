import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((response) => response.data);
};

export const create = (newObject) => {
  const req = axios.post(baseUrl, newObject);
  return req.then((response) => response.data);
};

export const removePerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((response) => response.data);
};

export const updatePerson = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((response) => response.data);
};
