import { createRouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { appRouter } from "@my-better-t-app-3/api/routers/index";
import { createContext } from "@my-better-t-app-3/api/context";

/**
 * Server-side oRPC plugin for SSR optimization.
 * Uses createRouterClient for direct procedure calls without HTTP overhead.
 *
 * @see {@link https://orpc.dev/docs/adapters/nuxt#optimize-ssr}
 */
export default defineNuxtPlugin(async () => {
  const event = useRequestEvent();

  const context = await createContext({
    headers: event?.headers ?? new Headers(),
  });

  const client = createRouterClient(appRouter, {
    context,
  });

  const orpc = createTanstackQueryUtils(client);

  return {
    provide: {
      orpc,
    },
  };
});
