import type {user} from "../Types/user";

const API_URL =
  "https://jsonplaceholder.typicode.com/users";
 

export async function getUsers(): Promise<user[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("gagal mengambil data dari API.");
  }

  return await response.json();
  
}
