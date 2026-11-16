import axios from 'axios'
let API = axios.create({
    // api is given in vite.config.js file
    baseURL: "/api/",

    // withCredentials: true allows the browser to send and receive the Spring Security 
    // session cookie.
    withCredentials: true
})
export default API;