import axios from "axios";

const api = axios.create({
  baseURL : 'https://brasilapi.com.br/api/feriados/v1'
})

export default api