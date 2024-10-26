import axios from "axios";

const fetchClient = () => {
  const defaultOptions = {
    baseUrl: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*"
    }
  };

  // Create instance
  const instance = axios.create(defaultOptions);
  
  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization =  token ? `Bearer ${token}` : "";
    return config;
  });
  

};

export default fetchClient;