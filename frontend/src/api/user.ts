import axios from "axios";
import type { LoginData, SignupData } from "../lib/Types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function signUpUser(data: SignupData) {
  const response = await axios.post(`${baseUrl}/auth/signup`, data);
  return response.data;
}

export async function checkVerificationCode(
  verificationCode: string,
  userId: number
) {
  const response = await axios.post(`${baseUrl}/auth/verify`, {
    verificationCode,
    userId,
  });
  return response.data;
}

export async function resendVerificationCode(userId: number) {
  const response = await axios.post(`${baseUrl}/auth/resend`, {
    userId,
  });
  return response.data;
}

export async function loginUser(data: LoginData) {
  const response = await axios.post(`${baseUrl}/auth/login`, data, {
    withCredentials: true,
  });
  return response.data;
}

export async function getUser() {
  const response = await axios.get(`${baseUrl}/auth/jwt`, {
    withCredentials: true,
  });
  return response.data;
}
