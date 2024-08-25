import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUserType, selectRefreshToken, resetAuthState, setToken, setRefreshToken } from "../redux";
import axios from "axios";
import { API_BASE_URL, SUCCESS_STATUS_CODE } from "../shared/constants";
import { useNavigate } from "react-router-dom";

const MAX_RETRIES = 3;

const useAPI = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const refreshToken = useSelector(selectRefreshToken);
    const userType = useSelector(selectUserType);
    const navigate = useNavigate();

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh_token`, {}, {
                headers: {
                    'refresh': 'true',
                    'Authorization': refreshToken,
                }
            });
            if (response.status === SUCCESS_STATUS_CODE && response.data.result) {
                dispatch(setToken(response.data.result.token));
                dispatch(setRefreshToken(response.data.result.refreshToken));
                return response.data.result.token;
            }
            throw new Error('Failed to refresh token');
        }
        catch (err) {
            return null;
        }
    };

    const CALL = async (method, url, body = {}, retries = 0, newToken, formData = false, needAllResponse = false) => {
        const headers = {
            'Authorization': newToken ? newToken : token,
            "ngrok-skip-browser-warning": "69420",

        };
        if (userType) {
            headers.Usertype = userType;
        }
        if (formData) {
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(body);
        }
        const config = {
            method,
            maxBodyLength: Infinity,
            url: `${API_BASE_URL}${url}`,
            headers,
            data: body
        };

        try {
            const response = await axios(config);
            if (response.status === SUCCESS_STATUS_CODE && response.data.result) {
                return needAllResponse ? response : response.data.result ?? "  ";
            } else if (response.status === 401 && refreshToken) {
                // const newAccessToken = await refreshAccessToken();
                const newAccessToken ="   ";
                if (newAccessToken && retries < MAX_RETRIES) {
                    return await CALL(method, url, body, retries + 1, newToken, formData, needAllResponse);
                }
            }
            else {
                return needAllResponse ? response : response.data.result;
            }
            throw new Error('Something went wrong');
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data) {
                console.log(error.response.data, needAllResponse)
                return error.response;  
            }
            error = await JSON.parse(JSON.stringify(error));
            if (error.status === 401 && refreshToken) {
                const newToken = await refreshAccessToken();
                if (newToken && retries < MAX_RETRIES) {
                    return await CALL(method, url, body, retries + 1, newToken, formData, needAllResponse);
                } else {
                    dispatch(resetAuthState());
                    navigate("/user/login");
                }
            }
            return null;
        }
    };

    const GET = (url, queryParamObj = {}) => {
        const queryString = Object.keys(queryParamObj)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParamObj[key])}`)
            .join('&');
        const fullUrl = queryString ? `${url}?${queryString}`: url;
        return CALL('GET', fullUrl);
    };

    const POST = (url, body, formData = false, needAllResponse = false) => {
        return CALL('POST', url, body, null, null, formData, needAllResponse);
    }

    const PUT = (url, body, formData = false, needAllResponse = false) => {
        return CALL('PUT', url, body, null, null, formData, needAllResponse);
    }

    return {
        GET,
        POST,
        PUT
    }
}

export default useAPI;