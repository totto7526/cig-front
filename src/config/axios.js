import axios from "axios"

const clienteAxios = axios.create({
    baseURL:'https://cig-application.herokuapp.com/'
})
export default clienteAxios;