import axios from "axios";

const API =
"https://nerabybackend-6.onrender.com/api/auth";

export const registerUser = (data) => {

  return axios.post(
    `${API}/register`,
    data
  );

};

export const loginUser = (data) => {

  return axios.post(
    `${API}/login`,
    data
  );

};