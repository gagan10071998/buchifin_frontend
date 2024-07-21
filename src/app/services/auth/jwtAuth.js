import jwtAxios from "axios";

const jwtAuthAxios = jwtAxios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
        'Content-Type': 'application/json'
    }
});

jwtAuthAxios.interceptors.response.use(
    res => res,
    err => {
        if(err.response && err.response.data.type === "token-invalid") {
            //todo logout the user
        }
        return Promise.reject(err);
    }
);

export const setAuthToken = (token) => {
    if(token) {
        jwtAuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        sessionStorage.setItem('token', token);
    } else {
        delete jwtAuthAxios.defaults.headers.common['Authorization'];
        sessionStorage.removeItem('token');
    }
};

export const getAuthToken = () => {
    return sessionStorage.getItem("token");
};

//todo: define interceptors and other configuration like baseURL, headers etc. here
export default jwtAuthAxios;