import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // <- required for Sanctum cookies
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  withXSRFToken: true,
});

export async function getCsrfCookie() {
  // Must be called before POSTing to /login or /register
  await api.get("/sanctum/csrf-cookie");
  console.log(document.cookie);
}

export async function registerUser(name: string, email: string, password: string) {
  await getCsrfCookie();
  return api.post("/register", {
    name,
    email,
    password,
    password_confirmation: password,
  });
}

export async function loginUser(email: string, password: string) {
  await getCsrfCookie();
  return api.post("/login", { email, password });
}

export function logoutUser() {
  return api.post("/logout");
}

export function getMe() {
  return api.get("/api/user");
}
