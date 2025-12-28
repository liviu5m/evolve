import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getWorkoutsByUser(userId: number) {
  const response = await axios.get(`${baseUrl}/api/workout/user`, {
    params: { userId },
    withCredentials: true,
  });
  return response.data;
}

