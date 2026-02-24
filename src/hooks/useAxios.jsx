import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://book-curier-server-alpha.vercel.app/'
    // baseURL: 'http://localhost:5000/'
})

const useAxios =()=>{
    return axiosInstance
}

export default useAxios;