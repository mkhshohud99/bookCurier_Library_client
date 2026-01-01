import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://book-curier-server-alpha.vercel.app/'
})

const useAxios =()=>{
    return axiosInstance
}

export default useAxios;