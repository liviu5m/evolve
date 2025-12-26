import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getShoppingItemsByUserId(userId: number) {
  const response = await axios.get(`${baseUrl}/api/shopping-item`, {
    params: {
      userId,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function purchaseShoppingItem(itemId: number) {
  const response = await axios.put(
    `${baseUrl}/api/shopping-item/${itemId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function uncheckShoppingItems(userId: number) {
  const response = await axios.put(
    `${baseUrl}/api/shopping-item/uncheck`,
    { userId },
    {
      withCredentials: true,
    }
  );
  return response.data;
}
