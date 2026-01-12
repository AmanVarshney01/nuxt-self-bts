import type { AppRouterClient } from "@my-better-t-app-3/api/routers/index";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

export default defineNuxtPlugin(() => {
  const event = useRequestEvent();

  const link = new RPCLink({
    url: `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3001"}/rpc`,
    headers: event?.headers,
  });

  const client: AppRouterClient = createORPCClient(link);
  const orpcUtils = createTanstackQueryUtils(client);

  return {
    provide: {
      orpc: orpcUtils,
    },
  };
});
