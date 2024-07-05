import { Posts } from "./App";

const baseUrl = "https://jsonplaceholder.typicode.com"

export const getFollowers = async (page: number): Promise<Posts[]> => {
  const res = await fetch(`${baseUrl}/posts?_limit=5&_start=${page}`);
  const json = res.json();
  return json;
}

