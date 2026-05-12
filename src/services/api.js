import axios from "axios";

const api = axios.create({

  baseURL: "https://nerabybackend-6.onrender.com/api"

});

export default api;