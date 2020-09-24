import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5001/clone-80dc3/us-central1/api', //clound function url
  baseURL: 'https://amazonclonebe.herokuapp.com/', //clound function url
});

export default instance;
