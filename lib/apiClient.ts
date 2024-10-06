import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, //環境変数の登録
  headers: {
    "Content-type": "application/json", //形式の登録
  },
});

export default apiClient;
