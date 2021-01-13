import axios from "axios";

// Setup base api url
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
