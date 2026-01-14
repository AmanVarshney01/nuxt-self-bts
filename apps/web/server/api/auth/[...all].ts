import { auth } from "@my-better-t-app-3/auth";

export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
