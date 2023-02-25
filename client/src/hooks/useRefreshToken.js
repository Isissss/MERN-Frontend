import axios from '../api/axios';
import { useContext } from 'react';
import { AuthContext } from "../context/AuthProvider";
const useRefreshToken = () => {
    const { auth, setAuth } = useContext(AuthContext);


    const refresh = async () => {
        const response = await axios.get('auth/refresh', {
            withCredentials: true
        });
        setAuth({
            username: response.data.username,
            accessToken: response.data.accessToken
        }
        );

    }
    return refresh;
}

export default useRefreshToken;