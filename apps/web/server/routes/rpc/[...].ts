import { RPCHandler } from "@orpc/server/fetch";
import { onError } from "@orpc/server";
import { BatchHandlerPlugin } from "@orpc/server/plugins";
import { appRouter } from "@my-better-t-app-3/api/routers/index";
import { createContext } from "@my-better-t-app-3/api/context";

const handler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
  plugins: [new BatchHandlerPlugin()],
});

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event);

  const { response } = await handler.handle(request, {
    prefix: "/rpc",
    context: await createContext({ headers: request.headers }),
  });

  if (response) return response;

  setResponseStatus(event, 404, "Not Found");
  return "Not found";
});

