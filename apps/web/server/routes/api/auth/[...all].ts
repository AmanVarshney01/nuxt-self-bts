import { auth } from "@my-better-t-app-3/auth";

export default defineEventHandler(async (event) => {
  return auth.handler(toWebRequest(event));
});
