import axios from "axios";

export const baseURL = axios.create({
  baseURL: "http://localhost:3000/books",
  headers: { "Content-Type": "application/json" },
});
