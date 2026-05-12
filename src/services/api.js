import axios from "axios";

const api = axios.create({

  baseURL:
    "https://nerabybackend-3.onrender.com/api"

});

export default api;