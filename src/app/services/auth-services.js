import jwtAuthAxios from "./auth/jwtAuth";

const authServices = {};

authServices.getCurrentUser = async () => {
    const {data} = await jwtAuthAxios.get("/auth");
    return data;
};

//loginCreds must be {email: "abc@example.com", password: "ABC123DEF"}
authServices.signIn = async (loginCreds) => {
    const {data} = await jwtAuthAxios.post('/auth', loginCreds);
    return data;
};

export default authServices;