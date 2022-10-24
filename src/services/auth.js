import { baseApi } from "../plugins/axios";

const api = '/auth/login';

const login = (body) => baseApi.post(`${api}/login`, body);

export { login };