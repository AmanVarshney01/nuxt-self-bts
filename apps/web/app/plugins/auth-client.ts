import { createAuthClient } from "better-auth/vue";

export default defineNuxtPlugin(() => {
  const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : "",
  });

  return {
    provide: {
      authClient,
    },
  };
});

