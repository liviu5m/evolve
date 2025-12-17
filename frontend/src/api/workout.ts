import { useAppContext } from "@/lib/AppProvider";
import type { User } from "@/lib/Types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getWorkoutByUser(userId: number) {
  const response = await axios.get(`${baseUrl}/api/workout/user`, {
    params: { userId },
    withCredentials: true,
  });
  return response.data;
}

export async function generateFitnessPlan(user: User | null) {
  const response = await axios.put(
    `${baseUrl}/api/user/plan/${user?.id}`,
    {
      user,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
}
