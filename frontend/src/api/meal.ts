import type { MealLog, User } from "@/lib/Types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getMealsByUserId(userId: number) {
  const response = await axios.get(`${baseUrl}/api/meal/user`, {
    params: { userId },
    withCredentials: true,
  });
  return response.data;
}

export async function regenerateMealFunction(
  mealKey: string,
  mealId: number,
  userId: number
) {
  const response = await axios.put(
    `${baseUrl}/api/meal/regenerate`,
    {
      mealKey,
      mealId,
      userId,
    },
    { withCredentials: true }
  );
  return response.data;
}
