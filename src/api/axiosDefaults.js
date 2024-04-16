import axios from "axios";

axios.defaults.baseURL = "https://drf-api-mm-f68b541c99c7.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;