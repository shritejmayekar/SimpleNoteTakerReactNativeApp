import axios from "axios";
import { BASE_URL } from '../config';


const getAll = (endpoint, token) => {
  return axios.get(`${BASE_URL}${endpoint}`, {
    headers: {
      authorization: 'Token ' + token
    }
  }
  );
};

const getById = (endpoint) => {
  return axios.get(`${BASE_URL}${endpoint}`);
};

const get = (endpoint,id) => {
  return axios.get(`${BASE_URL}${endpoint}${id}`);
};

const create = endpoint => {
  return axios.post(`${BASE_URL}${endpoint}`,);
};

const createAdd = (endpoint,token, data) => {
  return axios.post(`${BASE_URL}${endpoint}`,data,{
    headers: {
      authorization: 'Token ' + token
    }
  });
};

const update = (endpoint,token, data) => {
  return axios.patch(`${BASE_URL}${endpoint}`,data,{
    headers: {
      authorization: 'Token ' + token
    }
  });
};



const removeData = (endpoint, token) => {
  return axios.delete(`${BASE_URL}${endpoint}`, {
    headers: {
      authorization: 'Token ' + token
    }
  }
  );
};


const removeAll = (endpoint, payload) => {
  return axios.delete(`${BASE_URL}${endpoint}`, { data: payload });
};



export default {
  getAll,
  get,
  getById,
  create,
  createAdd,
  removeAll,
  removeData,
  update
};

