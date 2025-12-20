import type { ProgressData } from "@/lib/Types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function updateProgressData(
  userId: number,
  date: Date,
  data: ProgressData
) {
  const response = await axios.put(
    `${baseUrl}/api/progress`,
    { ...data, userId, date: date.toISOString().split("T")[0]},
    { withCredentials: true }
  );
  return response.data;
}

export async function getCurrentProgress(userId: number, date: Date) {
  const response = await axios.get(`${baseUrl}/api/progress`, {
    params: {
      userId,
      date: date.toISOString().split("T")[0],
    },
    withCredentials: true,
  });
  return response.data;
}
