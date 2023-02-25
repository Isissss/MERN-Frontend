import axios from "../api/axios";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import useAuth from "./useAuth";
const useLogout = () => {

    const { setPersist } = useContext(AuthContext);
    const { setAuth } = useAuth();
    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('auth/logout', {
                withCredentials: true
            });
            setPersist(false);
            console.log(response.data.message);
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout